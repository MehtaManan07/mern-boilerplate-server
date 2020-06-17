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
      { expiresIn: "60m" }
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

exports.accountActivation = (req,res) => {
    const { token } = req.body
    if( token ) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if(err) {
                console.log('jwt verify in account verification error', err)
                return res.status(401).json({ msg: 'Expired link. Signup again' })
            }
            const { name, email, password } = jwt.decode(token)

            const user = new User({ name, email, password })

            user.save((err, user) => {
                if(err) {
                    console.log('save user to database activation error')
                    res.status(401).json({ msg: 'Error saving user in database. Try again please' })
                }
                return res.json({ message: 'Success signup', user })
            })
        })
    } else {
        return res.json({ message: 'Something went wrong. Try again' })
    }
}
