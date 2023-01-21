import mongoose, { Schema } from 'mongoose';

const Invite = mongoose.model('Invite', new Schema({
  invitationId: {
    type: String,
  },
  unit: {
    type: String,
    length: 15,
  },
  email: {
    type: String,
    length: 50,
  },
  mobile: {
    type: String,
    length: 15,
  },
}));
export default Invite;
