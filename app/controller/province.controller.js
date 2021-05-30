
const provinceModel = require("../model/province.model");


exports.getAll = (req, res) => {
    provinceModel.getAll().then(value => {
        res.json({
            message: "Ok",
            data: value
        });
    }).catch(err => { res.json({ message: "Error", data: null }) })
}


exports.getById = (req, res) => {
    const id = req.params.id || null;
    if (!isNaN(id)) {
        provinceModel.getById(id).then(value => {
            res.json({
                message: "Ok",
                data: value
            });
        }).catch(err => {
            res.json({ message: "Error", data: null })
        })


    }
    else {
        res.json({ message: "No province", data: null });
    }
}