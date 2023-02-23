const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const { body, validationResult } = require("express-validator");
const nodemailer = require('nodemailer');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
});

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

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  userService.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error finding user' });
    }

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new user({ email, password });
    newUser.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving user' });
      }

      res.status(201).json({ message: 'User created successfully' });
    });
  });
});


router.get(':id', async function (req, res, next) {
  try {
    res.json(await userService.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting user with id = ${id} `, err.message);
    next(err);
  }
});

router.post('/forgotPassword', async function (req, res, next) {
  const email = req.body;
  const user = await userService.forgotPassword(email);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'Email sent successfully' });
});

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'your email',
//     pass: ' your password',
//   },
// });

// const mailOptions = {
//   from: 'your email',
//   to: "email of the user",
//   subject: 'Reset Password',
//   text: 'Click on the link to reset your password'
// }

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

router.post('/resetPassword', async function (req, res, next) {
  const { id, password } = req.body;
  const user = await userService.resetPassword(id, password);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'Password reset successfully' });
});

router.post('/changePassword', async function (req, res, next) {
  const { id, oldPassword, newPassword } = req.body;
  const user = await userService.changePassword(id, oldPassword, newPassword);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'Password changed successfully' });
});

router.get('/', async function (req, res, next) {
  try {
    res.json(await userService.getAll());
  } catch (err) {
    console.error(`Error while getting all users `, err.message);
    next(err);
  }
});

//update user with picture upload
router.put('/:id', upload.single('image'), async function (req, res, next) {
  const image = req.file;
  if (image)
    req.body.image = file.originalname;
  try {
    res.json(await userService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user with id = ${id} `, err.message);
    next(err);
  }
});













module.exports = router;