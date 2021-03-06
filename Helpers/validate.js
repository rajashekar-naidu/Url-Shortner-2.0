const crypto =require('crypto');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//Secret
var secretKey=process.env.SECRET_KET;


// Validate the given email is valid or not
function isValidEmail(str){
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let res = str.match(pattern);
        if(res)
            return true;
}


// Validate the password format min 6 chars, one Uppercase 
function validatePassword(str){
    let pattern= /^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$/;

    let res = str.match(pattern);
        if(res)
            return true;
}

//passing middleware to pass attribues within modules with user.
async function verifyAccessTokenForUserId(req, res, next){
    var authorization = req.headers.authorization.split(' ')[1],
        decoded;
    try {
        decoded = jwt.verify(authorization, secretKey);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
        req.user = jwt.decode(authorization, {complete: true});
        console.log("req.user -- > ",req.user);
        next();
}

//passing middleware to pass attribues within modules with url.
async function verifyAccessTokenForUrlId(req, res, next){
    var authorization = req.headers.authorization.split(' ')[1].
        decoded;
        console.log("authorization --- > ",authorization);    
    try {
        decoded = jwt.verify(authorization, secretKey);
        console.log("Decode -- > ",decoded);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
        req.url = jwt.decode(authorization, {complete: true});
        console.log("req.url -- > ",req.url);
        next();
}

//Get ip Address
function getIpAddress (req, uniqueTrack){
    var ipAddress;
    var forwardedIpsStr = req.headers['x-forwarded-for']; 

    if (forwardedIpsStr) {
      var forwardedIps = forwardedIpsStr.split(',');
      ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
      // If request was not forwarded
      ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
 }

module.exports ={
    isValidEmail : isValidEmail,
    validatePassword : validatePassword,
    verifyAccessTokenForUserId : verifyAccessTokenForUserId,
    verifyAccessTokenForUrlId : verifyAccessTokenForUrlId,
    getIpAddress : getIpAddress
}


