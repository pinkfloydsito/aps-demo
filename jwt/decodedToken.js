const jwt = require('jsonwebtoken');

const {
  JWT_SECRET
} = process.env;

const decodedToken = (req, requireAuth = true) => {
  const header =  req.req.headers.authorization;
    
  if (header){
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }
  if (requireAuth) {
    throw new Error('Login in to access resource');
  } 
  return null
}
module.exports = { decodedToken }
