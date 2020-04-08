const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/self
// @desc Get the current users profile
// @access Private
router.get('/self', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: "You don't have a profile",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile
// @desc Create or Modify user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('country', 'Country is required').not().isEmpty(),
      check('state', 'State is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('staystatus', 'Status is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      country,
      state,
      city,
      staystatus,
      category,
      subcategory,
      description,
      youtube,
      twitter,
      facebook,
      instagram,
    } = req.body;

    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (country) profileFields.country = country;
    if (state) profileFields.state = state;
    if (city) profileFields.city = city;
    if (staystatus) profileFields.staystatus = staystatus;

    //build local expertise object
    profileFields.localexpertise = {};
    if (category) profileFields.localexpertise.category = category;
    if (subcategory) profileFields.localexpertise.subcategory = subcategory;
    if (description) profileFields.localexpertise.description = description;

    //build social object
    //initialise first otherwise it will be undefined
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get users profile
// @access Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'The user does not have a profile.',
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    //Cast to ObjectId failed for value "5e8ac06bd8cb5414ec43d9781" at path "user" for model "profile" - the case where the profile id is not valid but it is a valid data
    if (error.message.includes('Cast to ObjectId failed')) {
      return res.status(400).json({
        msg: 'The user does not have a profile.',
      });
    }

    res.status(500).send('Server Error');
  }
});

// @route DELETE api/profile
// @desc Delete profile, user & blogs
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    //removes blogs

    //removes profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    //remove user
    await User.findOneAndRemove({
      _id: req.user.id,
    });
    res.json({ msg: 'User removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/profile/localexpertise
// @desc Add support requests
// @access Private
router.put(
  '/localexpertise',
  [
    auth,
    [
      check('category', 'Category Required').not().isEmpty(),
      check('subcategory', 'Subcategory required').not().isEmpty(),
      check('description', 'Description of the local expertise required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { category, subcategory, description } = req.body;

    const newLocalExpertise = {
      category,
      subcategory,
      description,
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      });

      profile.localexpertise.unshift(newLocalExpertise);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/profile/localexpertise/:lexpt_id
// @desc Add support requests
// @access Private
router.delete('/localexpertise/:lexpt_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    //Get remove index
    const removeIndex = profile.localexpertise
      .map((item) => item.id)
      .indexOf(req.params.lexpt_id);

    profile.localexpertise.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
