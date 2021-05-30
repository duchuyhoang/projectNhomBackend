const fs = require('fs');
const random = require('../ultil/random');
const path = require('path')
const roomModel = require('../model/room.model')
const imgModel = require('../model/image.model')
const ultilityModel = require('../model/ultilities.model');
const createObjectModul = require('../ultil/createObject');

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
    const requestUltilities = req.body.ultilities || null;

    // const requestData = req.body;
    // Key in database
    const roomKey = ["name", "capacity", "acreage", "overview", "price", "rent_or_sale",
        "longitude", "latitude", "city", "district", "ward", "street", "house_number", "water_bill",
        "utility_bill", "belongTo","alley"];

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

        const ultilities =requestUltilities ? requestUltilities.map(ultility => { return createObjectModul.createObjectWithKeys(ultilitiesKey, JSON.parse(ultility)) }) : [];
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