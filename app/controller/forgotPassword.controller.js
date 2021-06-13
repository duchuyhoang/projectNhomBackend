const nodeMailer = require("nodemailer");
const mailHost = "smtp.gmail.com";
const User=require("../model/user.model");
const jwt = require("jsonwebtoken");
const mailPort = 587;

const transporter = nodeMailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: false,
  requireTLS: true,
  auth: {
    user: "huyhoang1003200@gmail.com",
    pass: "h1u2y3123",
  },
});

exports.sendMail = (req, res) => {
  const { email, name, id } = req.body;

  req.session.ResetPassword = {
    isFirst: true,
  };
  const tokenExpireTime =
    Date.now() + parseInt(process.env.REFRESH_PASSWORD_TOKEN_EXPIRE_TIME);
  const token = jwt.sign(
    { email, tokenExpireTime },
    process.env.REFRESH_PASSWORD_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: process.env.REFRESH_PASSWORD_TOKEN_EXPIRE_TIME / 1000,
    }
  );

  var link =
    req.protocol +
    "://" +
    req.get("host") +
    "/forgotPassword/newPassword/" +
    token;

  const options = {
    from: "huyhoanng1003200@gmail.com",
    to: email,
    subject: "Thư reset password", // Tiêu đề của mail
    html: `
    <p>Xin chào ${name}</p>
    <div>Reset mật khẩu của bạn theo đường link này:${link}</div>`, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  };

    transporter.sendMail(options).then(value=>{
        res.json({message:"Mail đã được gửi vào email",status:"ok"})
    }).catch(err=>{
        res.json({status:"error",message:"Có lỗi xảy ra thử lại sau"});
    })
};

exports.newPassword = (req, res) => {
  const token = req.params.token;
  const {isFirst=false} = req.session?.ResetPassword || {isFirst:false};

  req.session.ResetPassword = {
    isFirst: false,
  };
if(token){
    jwt.verify(token,process.env.REFRESH_PASSWORD_TOKEN_SECRET,(err,decode)=>{

        if(err){
            res.send("Unauthorized");
        }
        
        // 
        if(isFirst){
            res.render("forgotPassword",{token:token,
                email:decode.email,
            handleRouter: req.protocol + "://" +req.get("host") +"/forgotPassword/newPasswordHandle"
            });
        }
        else{
            res.send("Unauthorized");
        }   
})}

  else {
    res.send("Unauthorized");
  }
};


exports.handleNewPassword =(req, res)=>{
const {email,password}=req.body;
if(email){
    User.changeUserPassword(email,password).then(value=>{
        res.json({message:"Reset password thành công"})
    }).catch(err=>{
        res.status(409).json({message:"Có lỗi"})
    })
}
else{
    res.status(409).json({message:"Có lỗi"});
}


}