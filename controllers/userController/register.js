const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const crypto = require("crypto");
const nodemailer = require("nodemailer");

const register = async (req, res, next) => {
  console.log("🚀 ~ file: register.js:9 ~ req:", req.body);
  try {
    let user = await new User(req.body);
    let tokens;
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      tokens = buffer.toString("hex");
      console.log(tokens);

      user.resetToken = tokens;
      user.active = false;
      await user.generateHashedPassword();
      await user.save();
      let token = jwt.sign(
        { _id: user._id, name: user.name, role: "user", email: user.email },
        "jwtPrivateKey"
      );
      let datatoRetuen = {
        message: "Account Created Successfully",
        token: token,
        id: user._id,
      };
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "beautypalmist@gmail.com", // generated ethereal user
          pass: "yucshktuqvvvuprd", // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "beautypalmist@gmail.com",
        to: user.email, // list of receivers
        subject: `Confirm Your Email`, // Subject line

        html: `
<p>You requested for Create Account</p>
<h5>click in this <a href='http://localhost:3001/verify/${tokens}'>link</a> to active Your Account if you dont sent request to Create account then iqnore this message</h5>
`,
      });
      return res.status(200).send(datatoRetuen);
    });
  } catch (error) {
    return res.send({ error: error });
  }
};

module.exports = { register };
