const { User } = require("../database/user.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Otp } = require("../database/otp.js");
const bcrypt = require("bcrypt");
const salt = Number(process.env.SALT_ROUNDS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    user: "yourGmail@gmail.com",  // Requires modification
    pass: "your password after two step verification",    // Requires modification
  },
});

//  ============ checking user details and sending otp ================

const checkSignup = async (req, res) => {
  const { email } = req.body;
  const tryingUser = await User.find({ email: email });
  if (tryingUser.length) {
    res.status(400).json({message:"user already exists"});
  } else {
    const newUser = await Otp.find({ email: email });
    if (newUser.length) {
      try {
        const mailOptions = {
          from: "yourGmail@gmail.com",   // Requires modification
          to: email,
          subject: "email verfication",
          text: `OTP : ${newUser[0].otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error:", error);
            res.status(500).send("Error sending email");
          } else {
            console.log("Email sent:", info.response);
            res.send("otp re-sent successfully");
          }
        });
      } catch (error) {
        res.send(error);
      }
    } else {
      const otp = Number(
        (
          Math.ceil(Math.random() * 1000000) +
          Math.ceil(Math.random() * 1000000)
        )
          .toString()
          .slice(0, 5)
      );
      try {
        const mailOptions = {
          from: "yourGmail@gmail.com", // Requires modification
          to: email, 
          subject: "Memes-ots email verfication",
          text: `OTP : ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error:", error);
            res.status(500).send("Error sending email");
          } else {
            console.log("Email sent:", info.response);
            res.send("Email sent successfully");
            const newUserOtp = new Otp({ email: email, otp: otp });
            newUserOtp.save();
          }
        });
      } catch (error) {
        res.send(error);
      }
    }
  }
};

// =======================================================================

// ================ checking otp =========================================

const checkSignupOtp = async (req, res) => {
  var userCreated = false;
  const otp = Number(req.params.otp);
  const { email, password, username } = req.body;

  const checkUser = await Otp.find({ email: email });
  if (checkUser.length) {
    if (checkUser[0].otp === otp) {
      try {
        // ======= hashing ======

        const hash = await bcrypt.hash(password, salt);
        if (hash) {
          const newUser = new User({
            email: email,
            username: username,
            password: hash,
          });
          newUser.save().then((pushedUser) => {
            if (pushedUser) {
              userCreated = true;
            }
          });
          if (userCreated) {
            await Otp.deleteOne({ email: email });
            res.json({
              message: "Account created successfully",
              created: true,
            });
          }
        }
      } catch (error) {
        res.json({ message: error, created: false });
      }
    } else {
      res.json({ message: "invalid otp", created: false });
    }
  } else {
    res.status(400).send({ message: "Invalid email , bad request" });
  }
};

module.exports = { checkSignup, checkSignupOtp };
