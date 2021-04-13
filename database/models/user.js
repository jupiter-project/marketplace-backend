
import mongoose from 'mongoose';

import timestampPlugin from '~/database/models/plugins/timestamp';

const UserSchema = new mongoose.Schema({
  accountRS: {
    type: String,
    required: true,
    unique: true
  },
  account: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  webURL: {
    type: String,
    default: null
  },
  twitter: {
    type: String,
    default: null
  },
  telegram: {
    type: String,
    default: null
  },
  lastLoginAt: {
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