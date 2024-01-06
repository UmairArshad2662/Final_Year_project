const nodemailer = require("nodemailer");
const User = require('../models/User');


const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", 
  port: 465,
  auth: {
    user: "umairarshad167@gmail.com",
    pass: "jtmriejjkcncdetp"
  },
});
 
const getbill = async (req, res) => {
var cnic =  req.params.cnic
var user = await User.findOne({cnic});
var email = user.email;
console.log(email,cnic,user);
  const msg = { from: "umairarshad167@gmail.com", to: email, subject: "Warning", text: "your progress is below the average!!" };
  await transport.sendMail(msg, function (err, info) {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log("done");
      res.send("okkkk");
    }
  });
};

module.exports = { getbill };
