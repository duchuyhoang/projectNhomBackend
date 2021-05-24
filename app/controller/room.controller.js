const fs = require('fs');
const random = require('../ultil/random');
const path = require('path')
const roomModel = require('../model/room.model')
const imgModel = require('../model/image.model')


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

    // console.log("body", req.body);


    // console.log(req.imgInfo);

    const imageInfoList = req.imgInfo


    // const requestData = req.body;
    // Key in database
    const objectKey = ["name", "capacity", "acreage", "overview", "price",
        "rent_or_sale", "longitude", "latitude", "city", "district", "house_number",
        "region", "room_type"]
    // "name_router"
    var data = {}, imageList = [];

    objectKey.forEach((key, _) => {
        data[key] = req.body[key] || null
    })

    data['name_router'] = getTheNameRouter(data['name']);

    // Form data and multer using field in files 

    roomModel.createRoom(data).then(affectedRow => {

        // 
        const { insertId } = affectedRow;

        // Make image list into a dimensional array for bulk insert after 
        if (imageInfoList) {
            imageInfoList.forEach((img, _) => {
                // imgData is id and link
                let imgData = [insertId];
                for (let key in img) {
                    imgData.push(img[key])
                }
                imageList.push(imgData)
                // imageList will be [[1,2,3],[1,4,5],[1,6,7]]
            })
        }

        if (imageInfoList) {

            imgModel.insertRoomImage(insertId, imageList).then(value => {
                res.status(200).json({
                    status: 200, message: "Ok", data: {
                        infoRoom: data,
                        imgList:imageInfoList
                    }
                });
            }).catch(err => {
                console.log("errrr",err);
                res.status(200).json("error")
            })
        }

        else
            res.status(200).json({
                status: 200, message: "Ok", data: {
                    infoRoom: data,
                    imgList:null
                }
            });
        // 
    })
        .catch(err => {
            res.status(200).json(err)
        })









}