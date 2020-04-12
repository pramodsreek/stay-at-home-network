const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const config = require('config');
require('dotenv').config();
//deprecated version had express-validator/check
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access Public (no need to get autherisation using tokens)
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check(
      'password',
      'Please enter a password with at least 8 characters'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({
        email,
      });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User Exists' }] });
      }

      // Get users gravatar based on the email
      // pg rated images only
      //const avatar = gravatar.url(email, {
      // s: '200',
      // r: 'pg',
      // d: 'mm',
      // });

      //gravatar not returning a proper url
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password using decrypt

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return the JWT (json web token)
      // because if mongoose _id is id
      const payload = {
        user: {
          id: user.id,
        },
      };

      //change expiration to 3600
      //config.get('jwtSecret') if using config
      jwt.sign(
        payload,
        process.env['jwtSecret'],
        {
          expiresIn: 3600,
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
