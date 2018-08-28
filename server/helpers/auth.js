const jwt = require("jsonwebtoken");
const User = require('../models/users')


var isLogin = (req, res, next) => {
    console.log('ini req headers dr helper', req.headers);
    
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_TOKEN)
    if(token){
        User.findOne({email: decode.email})
        .then((data) => {
            if(data){
    
                next()
            }else{
                console.log('masuk else')
                res.status(400).json({
                    message: err.message
                })
            }
        }).catch((err) => {
            console.log('masuk catch')
            res.status(400).json({
                message: 'User must be Log In'
            })
        });
        
    }else{
        res.status(400).json({
            msg: 'User must be Log In'
        })
    }
}

module.exports = isLogin


