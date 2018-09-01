import  mongoose,{ Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  image: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: Schema.Types.ObjectId, required: true, ref: 'Country' },
  languages: [{ type: Schema.Types.ObjectId, ref: 'Language' }],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reset_token: { type: String },
  reset_token_expiry: { type: String },
  oauth_id: { type: String },
  account_type: { type: String, required: true },
  access: {
    title: { type: String, required: true },
    level: { type: String, required: true },
  },
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next()
  })
});

UserSchema.methods.comparePassword = function(incomingPassword, cb) {
  bcrypt.compare(incomingPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
