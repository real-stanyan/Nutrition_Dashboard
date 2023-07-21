const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.jwtSign = promisify(jwt.sign);

exports.jwtVerify = promisify(jwt.verify);

exports.jwtDecode = promisify(jwt.decode);
