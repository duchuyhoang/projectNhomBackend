const databaseConst = require("../common/const");
const User = require("../model/user.model");
const Admin = require("../model/admin.model");
const Room = require("../model/room.model");
const Pagination = require("../ultil/pagination");
var url = require("url");

exports.getPendingPromotion = (req, res) => {
  // id_user
  const { id = null } = req?.oldTokenInfo || {};

  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var q = url.parse(fullUrl, true);
  const params = q.query;

  const { page_index, items_per_page } = params;

  Admin.getPromotionRequest(id)
    .then((value) => {
      res.json({ ...Pagination.pagination(value, page_index, items_per_page) });
      //   res.json({data:value});
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
  // User.checkCanRequestAPromotion

  // User.changeUserPassword
  // databaseConst.userAccountPermissionPending.REJECT;
};

exports.acceptPromotionRequest = (req, res) => {
  const { id_user } = req.body;
  // id admin
  const { id = null } = req?.oldTokenInfo || {};

  if (id_user) {
    Admin.acceptPromotionRequest(id, id_user)
      .then((ok) => {
        User.promotePermission(id_user)
          .then((res) => {
            res.json({ message: "Thăng chức thành công" });
          })
          .then((e) => {
            res.status(409).json({ message: "Thử lại" });
          });
      })
      .catch((err) => {
        res.status(409).json({ message: "Thử lại" });
      });
  }

  // Admin.acceptPromotionRequest()

  // promotePermission
};

exports.acceptRoom = (req, res) => {
  const { id = null } = req.oldTokenInfo || {};
  const { id_room } = req.body;
  if (id && id_room) {
    Admin.acceptARoom(id_room)
      .then((result) => {
        res.json({ message: "Thêm thành công", status: "ok" });
      })
      .catch((err) => {
        res.status(409).json({ message: "Thêm thất bại", status: "error" });
      });
  }
  else{
    res.status(409).json({ message: "Thêm thất bại", status: "error"})
  }
};

exports.rejectRoom=(req,res)=>{
  const { id = null } = req.oldTokenInfo || {};
  const { id_room } = req.body;

  if (id && id_room) {
    Admin.rejectRoom(id_room)
      .then((result) => {
        res.json({ message: "Từ chối thành công", status: "ok" });
      })
      .catch((err) => {
        res.status(409).json({ message: "Từ chối thất bại", status: "error" });
      });
  }
  else{
    res.status(409).json({ message: "Từ chối thất bại", status: "error"})
  }
}

