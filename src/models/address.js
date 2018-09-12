import mongoose,{ Schema } from 'mongoose';

const AddressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
});

export default mongoose.model('Address', AddressSchema);
