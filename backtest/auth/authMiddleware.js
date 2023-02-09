const userService = require('../service/userService');

/**
 * It checks if the request has an authorization header, if it does, it parses the token from the
 * header, if it can, it decodes the token, if it can, it splits the username and password from the
 * token, if it can, it checks if the user exists, if it does, it sets the user to the request object,
 * and finally, it calls the next function.
 * 
 * If any of the above steps fail, it returns an error.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - a function that you call when you want to pass control to the next middleware function
 * in the stack.
 */
const isLoggedIn = async (req, res, next) => {
  try {

    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        let text = Buffer.from(token, 'base64').toString('ascii');
        const [username, password] = text.split(":");
        const user = await userService.login({ username, password });
        if (user) {
          req.user = user
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
