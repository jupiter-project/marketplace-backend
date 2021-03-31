
import mongoose from 'mongoose';

import timestampPlugin from '~/database/models/plugins/timestamp';

const ReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  nft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nft',
    required: true
  },
  message: {
    type: String,
    default: null
  },
  accept: {
    type: Boolean,
    default: false
  }
});

ReportSchema.plugin(timestampPlugin);
const Report = mongoose.model('report', ReportSchema);
export default Report;