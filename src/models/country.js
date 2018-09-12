import mongoose, { Schema } from 'mongoose';

const CountrySchema = new Schema({
  country_name: {
    type: String,
    required: true,
    unique: true
  },
  country_code: {
    type: String,
    required: true,
    unique: true
  },
});

export default mongoose.model('Country', CountrySchema);