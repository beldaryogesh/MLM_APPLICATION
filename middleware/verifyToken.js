const jwt = require('jsonwebtoken');

const  authenticateUser =  function (req, res, next) {
  const token = req.headers['x-api-key']; // Assuming the token is in the header
  if (!token) {
    return res.status(200).json({error_code : 400, message : 'please provide token..!' });
  }
  try {
    const decoded = jwt.verify(token, 'MLM-APPLICATION');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  authenticateUser
}