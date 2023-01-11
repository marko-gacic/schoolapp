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

/* User Registration with same user name error */

router.post(
  "/register",
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  body("email").isEmail(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await userService.register(req.body);
      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: "User is not authorized!" });
      }
    } catch (err) {
      console.log("User registration error", err.message);
      next(err);
    }
  },
);


router.get(':id', async function (req, res, next) {
  try {
    res.json(await userService.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting user with id = ${id} `, err.message);
    next(err);
  }
});







module.exports = router;