const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.json(400).json({
        error: "Email is taken",
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "20m" }
    );
    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Account activation link`,
        html: `
        <p> Please use the following link to activate your account </p>
        <p> ${process.env.CLIENT_URL}/auth/activate/${token} </p>
        <hr />
        <p> Ohh bhai, aavo aavo, welcome </p>
        `
    }
    sgMail.send(emailData).then(sent => res.json({ message: `Sent successfully to ${email}. Follow the instructions to activate your account` })).catch((err) => {
        console.log(err)
        res.json({ err })
    })
  });
};
