const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const { body, validationResult } = require("express-validator");

/* User Login */
router.post(
  "/",
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await userService.login(req.body);
      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: "User is not authorized!" });
      }
    } catch (err) {
      console.log("User login error", err.message);
      next(err);
    }
  },
);

/* User Registration */
router.post('/register', async function (req, res, next) {
  let user = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    user = await userService.register(user);
    res.json(user);
  } catch (err) {
    console.log("User registration error", err.message);
    next(err);
  }
});





module.exports = router;