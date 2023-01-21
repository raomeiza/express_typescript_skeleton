import mongoose, { Schema } from 'mongoose';
import userBasics from './common/userBasics.model';
import { Types } from 'mongoose';

const Worker = mongoose.model('Worker', new Schema({
invitedBy: {
  type: Types.ObjectId,
  ref: 'worker',
},
invitedAt: {
  type: Date,
  default: Date.now,
},
userId: {
  type: mongoose.Schema.Types.ObjectId,
},
invitationId: {
  type: String,
  length: 24
},
admin: {
  type: Boolean,
  default: false,
},
units: [{
  unit: {
    name: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  },
  role: {
    enum: ['admin', 'member'],
    type: String,
  },
}],
active: {
  type: Boolean,
  default: false
},
blocked: {
  type: Boolean,
  default: false
},
blockedBy: {
  type: Types.ObjectId,
  ref: 'Worker',
  default: null
},
blockedAt: {
  type: Date,
  default: null
},
blockedReason: {
  type: String,
  default: null
},
password: {
  type: String,
},
emailVerified: {
  type: Boolean,
  default: false,
},
mobileVerified: {
  type: Boolean,
  default: false,
},
mobileToken: {
  type: String,
  length: 5,
},
emailToken: {
  type: String,
  length: 5,
},
address: {
  type: String,
},
passwordResetToken: {
  type: String,
  length: 5,
},
}).add(userBasics), 'worker');
export default Worker;
