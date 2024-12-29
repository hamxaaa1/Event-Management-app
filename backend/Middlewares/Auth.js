const jwt = require('jsonwebtoken');

const ensureAuthentication = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    return res.status(400).json({
      message: "JWT is required!"
    }); 
  }


  try {
    const decoded = jwt.verify(auth, process.env.SECRET_KEY);
    req.user = decoded;  
    return next();  
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid JWT"
    }); 
  }
};

module.exports = ensureAuthentication;
