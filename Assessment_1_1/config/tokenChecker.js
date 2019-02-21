const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    //decode token
    if(token) {
        //verifies secrets and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) {
                return res.status(401).json({"error" : true, "message": "Unautorized access!!"})
            }
            req.decoded = decoded;
            next();
        });
    } else {
        //there is no token
        //return an error
        return res.status(403).send({
            "error": true,
            "message": "no token provided"
        })
    }
}