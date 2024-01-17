const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')
    console.log(token)
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
      }
  
      req.user = user;
      next();
    });
  };


  module.exports = {authenticate}