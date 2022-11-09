const userService = require('../service/userService');

const isLoggedIn = async (req, res, next) => {
  try {
    
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        let text =  Buffer.from(token, 'base64').toString('ascii');      
        const [username, password] = text.split(":");        
        const user = await userService.login({username, password});
        if (user) {
            req.user= user
            next();
        } else {
            res.status(401).json({ error: "User is not authorized!" });    
        }
      } else {
        res.status(400).json({ error: "No authorization header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// export custom middleware
module.exports = {
    isLoggedIn,
};
