
import mongoose from 'mongoose';

import timestampPlugin from '~/database/models/plugins/timestamp';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  lastLoginAt: {
    type: Date,
    default: null
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  }
});

UserSchema.plugin(timestampPlugin);
const User = mongoose.model('user', UserSchema);
export default User;