const User = require("../model/user.model");

exports.requestPromotion = (req, res) => {
  const { id } = req.oldTokenInfo;
  const { id_admin } = req.body;

  User.checkCanRequestAPromotion(id)
    .then((value) => {

      User.requestAPromotionRequest(id_admin, id)
        .then((result) => {
          res.json({ message: "Gửi request thành công" });
        })
        .catch((e) => {
          res.status(404).json({ message: e.message });
        });
        
    })
    .catch((err) => {
      res.status(404).json({ message: "Không thể gửi promotion request" });
    });
};
