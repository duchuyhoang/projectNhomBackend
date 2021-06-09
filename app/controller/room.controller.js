const fs = require('fs');
const random = require('../ultil/random');
const path = require('path')
const roomModel = require('../model/room.model')
const imgModel = require('../model/image.model')
const ultilityModel = require('../model/ultilities.model');
const createObjectModul = require('../ultil/createObject');
const NodeCache = require("node-cache");
const roomSelectAllCache = new NodeCache();
const price_range = new NodeCache();
const acreage_range = new NodeCache();
const filterList = require("../ultil/filterFuncList")
const MulitipleFilter = require('../ultil/multipleFilter');

var url = require('url');


const getTheNameRouter = (name) => {

    const regexSpecialCharacter = /[\s.\-_*^]/;
    let returnName = "";


    if (name) {
        let namePart = name.split(regexSpecialCharacter);
        namePart.forEach((part, _) => {
            returnName += part + "-"
        })
        returnName += random.randonString(4)
    }

    return returnName;

}




exports.handleAddRoom = (req, res) => {

    // img info before middleware
    const imageInfoList = req.imgInfo
    let requestUltilities = req.body.ultilities || null;

    if (!Array.isArray(requestUltilities) && requestUltilities !== null) {
        requestUltilities = [requestUltilities];
    }

    // const requestData = req.body;
    // Key in database
    const roomKey = ["name", "capacity", "acreage", "overview", "price", "rent_or_sale",
        "city", "district", "ward", "street", "house_number", "water_bill",
        "utility_bill", "belongTo", "alley", "latitude", "longtitude"];

    const ultilitiesKey = ["id"];

    // "name_router"
    var data = createObjectModul.createObjectWithKeys(roomKey, req.body)
    data['name_router'] = getTheNameRouter(data['name']);


    // Form data and multer using field in files 
    // affectedRow after insert a room
    roomModel.createRoom(data).then(affectedRow => {

        const { insertId } = affectedRow;
        var imgPromise = null, ultilitiesPromise = null;
        // Make image list into a dimensional array for bulk insert after 
        const imageList = createObjectModul.forBulkInsert(imageInfoList || [], insertId) || [];

        const ultilities = requestUltilities ? requestUltilities.map(ultility => { return createObjectModul.createObjectWithKeys(ultilitiesKey, JSON.parse(ultility)) }) : [];
        const ultilitiesList = createObjectModul.forBulkInsert(ultilities, insertId) || [];

        imgPromise = imageInfoList ? imgModel.insertRoomImage(insertId, imageList) : null;
        ultilitiesPromise = requestUltilities ? ultilityModel.insertRoomUltilities(insertId, ultilitiesList) : null;

        Promise.all([imgPromise, ultilitiesPromise]).then((value) => {
            res.status(200).json({
                status: 200, message: "Ok", data: {
                    idRoom: insertId,
                    infoRoom: data,
                    imgList: imageInfoList,
                    ultilitiesList: requestUltilities && requestUltilities.map(ultility => JSON.parse(ultility)) || null,
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(409).json(err)
        })

    }).catch(err => {
        console.log("er", err);
        res.status(409).json(err)
    })
}


exports.getAllRoom = (req, res) => {

    const keyList1 = ["imagesLinks", "utilitiesIds"];
    const keyList2 = ["imagesIds", "utilitiesName"];
    const newKeyList = ["images", "utilities"];

    roomModel.getAllRoom().then((values) => {
        res.json({
            message: "Ok", data: values.map((value) => {
                return {
                    ...createObjectModul.normalizeObjectByKeyPair(keyList1, keyList2, newKeyList, value),
                    createTime: new Date(value.createTime)
                }
            })
        });

        // res.json(values)
    }).catch(err => {
        console.log(err);
        res.json({ message: "Error", data: null })
    })
}


exports.getLatestRoom = (req, res) => {

    const count = req.params.count || 16;

    const keyList1 = ["imagesLinks", "utilitiesIds"];
    const keyList2 = ["imagesIds", "utilitiesName"];
    const newKeyList = ["images", "utilities"];

    roomModel.getLatestRoom(count).then((values) => {
        res.json({
            message: "Ok", data: values.map((value) => {
                return {
                    ...createObjectModul.normalizeObjectByKeyPair(keyList1, keyList2, newKeyList, value),
                    createTime: new Date(value.createTime)
                }
            })
        });

        // res.json(values)
    }).catch(err => {
        res.json({ message: "Error", data: null })
    })



}

exports.searchRoom = (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var q = url.parse(fullUrl, true);
    const params = q.query;
    Object.keys(params).forEach(key => {
        if (!params[key]) {
            delete params[key];
        }
    })

    if (roomSelectAllCache.has("selectAll")) {
        const multipleFilter = new MulitipleFilter(filterList.roomListFilter,
            roomSelectAllCache.get("selectAll"), ",");

        res.json({
            message: "Ok", data:
            {
                ...multipleFilter.filterAll(params)
            }

        });
    }
    else {
        const keyList1 = ["imagesLinks", "utilitiesIds"];
        const keyList2 = ["imagesIds", "utilitiesName"];
        const newKeyList = ["images", "utilities"];

        roomModel.getAllRoom().then((values) => {

            const rows = Object.keys(values).map((key) => { return values[key] })

            const selectAll = rows.map(value => {
                return {
                    ...createObjectModul.normalizeObjectByKeyPair(keyList1, keyList2, newKeyList, value),
                    createTime: new Date(value.createTime)
                }
            })


            roomSelectAllCache.set("selectAll", selectAll, 10);

            const multipleFilter = new MulitipleFilter(filterList.roomListFilter, selectAll, ",");


            res.json({
                message: "Ok", data:
                {
                    ...multipleFilter.filterAll(params)
                }

            });

        }).catch(err => {
            console.log(err);
            res.json({ message: "Error", data: null })
        })


    }
}

exports.currentRoom = (req, res) => {
    const name = req.params.name;
    roomModel.getRoomByNameRouter(name).then(values => {

        const keyList1 = ["imagesLinks", "utilitiesIds"];
        const keyList2 = ["imagesIds", "utilitiesName"];
        const newKeyList = ["images", "utilities"];

        res.json({
            message: "Ok", data: values.map((value) => {
                return {
                    ...createObjectModul.normalizeObjectByKeyPair(keyList1, keyList2, newKeyList, value),
                    createTime: new Date(value.createTime)
                }
            })
        });

    }).catch(err => {
        console.log(err);
    })
}

exports.getRoomPriceRange = (req, res) => {

    if (price_range.has("price_range")) {
        res.json({ ...price_range.get("price_range") })

    }
    else {
        roomModel.getRoomPriceRange().then(value => {

            const { max_price, min_price } = value[0];
            const price_range = {
                max_price: max_price ? max_price : 0,
                min_price: min_price ? min_price : 0,
            }

            price_range.set("price_range", price_range, 10)

            res.json(price_range)
        }).catch(err => {
            res.json({
                err: err.message
            })
        })
    }


}

exports.getAcreageRange = (req, res) => {

    if (acreage_range.has("acreage_range")) {
        res.json({ ...acreage_range.get("acreage_range") })
    }
    else {
        roomModel.getAcreageRange().then(value => {
            const { max_acreage, min_acreage } = value[0];
            const acreage_range = {
                max_acreage: max_acreage ? max_acreage : 0,
                min_acreage: min_acreage ? min_acreage : 0
            }
            acreage_range.set("acreage_range", acreage_range, 10)

            res.json(acreage_range)
        }).catch(err => {
            res.json({
                err: err.message
            })
        })

    }



}
// })

// }}