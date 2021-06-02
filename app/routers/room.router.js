const express = require('express');
const roomRouter = express.Router();
var loginMiddleware = require('../middlewares/checkJWT')
const roomController = require('../controller/room.controller')
const roomMiddleware = require('../middlewares/room');
const permissionCheck =require("../middlewares/permissionCheck");
var multer = require('multer')



// Use form data not using input field with name so use none() the file is in body\

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"./app/assets/roomImg");
    },
    filename: function (req, file, cb) {
          cb(null, file.originalname)
        // cb(null,"hello.png")
    }
})

var upload = multer({storage:storage})

roomRouter.post("/uploadARoom",
    loginMiddleware.checkJWT,
    // permissionCheck.checkEnoughPermission("MEMBER"),
    upload.fields([
        {
            name: "singleImage", maxCount: 1
        },
        {
            name: "multipleRoomImage", maxCount: 100
        }]),
        roomMiddleware.handleChangeRoomImgName,
    roomController.handleAddRoom
)

// room.get("/getRooms",

// )

roomRouter.get("/getAll",roomController.getAllRoom);

roomRouter.get("/getLatest/:count",roomController.getLatestRoom);


module.exports = roomRouter