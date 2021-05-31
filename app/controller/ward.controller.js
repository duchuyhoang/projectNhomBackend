var wardModel = require("../model/ward.model");


exports.getAll = (req, res) => {
    wardModel.getAll().then(value => {
        res.json({ message: "Ok", data: value });
    }).catch(err => {
        res.json({ message: "Error", data: null })
    })
}


exports.getByCityAndDistrict = (req, res) => {
    const id_city = req.params.id_city || null;
    const id_district = req.params.id_district || null;
    if (isNaN(id_city) || isNaN(id_district)) {
        res.json({ message: "Error", data: [] })
    }
    else {
        wardModel.getByCityAndDistrict(id_city, id_district).then(value=>{
            res.json({ message: "Ok",data: value});
        }).catch(err=>{
            res.json({ message: "Error", data:null})
        })

    }
}
