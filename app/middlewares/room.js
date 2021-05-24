const fs = require('fs');
const random = require('../ultil/random');
const path = require('path')
const staticConst = require("../common/staticConst");
const extension = require("../ultil/extension");

function handleRenameFile(req, file) {
    // New name and get extension 
    const fileExtension = extension.getExtension(file.originalname);
    const newName = random.randonString(36) + "." + fileExtension;
    const destination = "./../assets/roomImg/";

    const imgLink = req.protocol + '://' + req.get('host') + staticConst.defaultImgFolder + newName;

    const imgId = random.randonString(36)

    fs.rename(path.join(__dirname, destination + file.originalname),
        path.join(__dirname, destination + newName),
        (err) => { }
    )

    return {
        imgId,
        imgLink,
       
    };
}




exports.handleChangeRoomName = (req, res, next) => {
    // console.log("file", req.file);
    // console.log("files", req.files);


    // imageInfo {imgLink,imgId}
    let imageInfo = [];


    // Form data and multer using field in files 
    if (req.files.singleImage) {
        const singleFile = req.files.singleImage[0];

        let info = handleRenameFile(req, singleFile)
        imageInfo.push(info)
        // const newName=random.randonString(36);
        // const fileExtension=getExtension(singleFile.originalname)

        // fs.rename(path.join(__dirname,"./../assets/roomImg/"+singleFile.originalname))

    }

    else if (req.files.multipleRoomImage) {
        // console.log("files", req.files.multipleRoomImage);
        const fileList = req.files.multipleRoomImage;
        fileList.forEach((file, index) => {
            let info = handleRenameFile(req, file)
            imageInfo.push(info)
        })
    }


// Pass img info forr the next middleware
    req.imgInfo = imageInfo.length === 0 ? null : imageInfo

    next();
    // res.status(200).json({ status: 200, message: "Ok" });




}