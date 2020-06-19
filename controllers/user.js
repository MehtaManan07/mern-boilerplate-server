const User = require("../models/User")

exports.read = (req,res) => {
 
    User.findById(req.params.id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        res.json(user)
    })
}