const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//deprecated version had express-validator/check
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc to test if route is working
// @access Public (no need to get authorisation using tokens)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Login user and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({
        email,
      });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User or Password not valid!' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User or Password not valid!' }] });
      }

      // Return the JWT (json web token)
      // because if mongoose _id is id
      const payload = {
        user: {
          id: user.id,
        },
      };

      //change expiration to 3600
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
