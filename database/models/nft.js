
import mongoose from 'mongoose';

import timestampPlugin from '~/database/models/plugins/timestamp';

const NFTSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  tags: [
    {
      type: String,
      default: null
    }
  ],
  verified: {
    type: Boolean,
    default: false
  }
});

NFTSchema.plugin(timestampPlugin);
const NFT = mongoose.model('nft', NFTSchema);
export default NFT;