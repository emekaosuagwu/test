import mongoose,{ Schema } from 'mongoose';

const PortfolioSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

export default mongoose.model('Portfolio', PortfolioSchema);
