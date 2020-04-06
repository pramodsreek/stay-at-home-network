const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  staystatus: {
    type: String,
    required: true,
  },
  disruption: [
    {
      activity: {
        type: String,
      },
      activitystatus: {
        type: Boolean,
        default: false,
      },
      disruptiondescription: {
        type: String,
      },
    },
  ],
  support: [
    {
      supporttyperequired: {
        type: String,
      },
      supportstatus: {
        type: String,
      },
      supportdescription: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
