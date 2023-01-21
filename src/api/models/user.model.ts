import mongoose, { Schema } from "mongoose";
import userBasics from "./common/userBasics.model";
import { Types } from "mongoose";
import { convertMobileToInternational } from "../validations/common.validations";
import handleConvertMobileToInternationalFromMongooseQuery from "../middlewares/convertMobileToInternational";

const UserSchema =   new Schema({
  invitedBy: {
    type: Types.ObjectId,
    ref: "User",
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
    length: 24,
  },
  logins: [
    {
      date: Date,
      ip: String,
    },
  ],
  units: [
    {
      unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
      },
      unitName: String,
      role: {
        enum: ["head", "member"],
        type: String,
      },
    },
  ],
  pastor_level: {
    type: String,
    enum: ["national", "state", "regional", "group_of_districts", "district"],
  },
  country_pastoring: {
    type: String,
    minlength: 2,
    maxlength: 18,
  },
  state_pastoring: {
    type: String,
  },
  regional_pastoring: {
    type: String,
  },
  group_of_districts_pastoring: {
    type: String,
  },
  district_pastoring: {
    type: String,
  },
  leader_level: {
    type: String,
    enum: ["national", "state", "regional", "group_of_districts", "district"],
  },
  country_leading: {
    type: String,
    minlength: 2,
    maxlength: 18,
  },
  state_leading: {
    type: String,
  },
  regional_leading: {
    type: String,
  },
  group_of_districts_leading: {
    type: String,
  },
  district_leading: {
    type: String,
  },
  leader_category: {
    type: String,
  },
  lader_level: {
    type: String,
    enum: ["national", "state", "regional", "group_of_districts", "district"],
  },

  active: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  blockedBy: {
    type: Types.ObjectId,
    ref: "Worker",
    default: null,
  },
  blockedAt: {
    type: Date,
    default: null,
  },
  blockedReason: {
    type: String,
    default: null,
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
  mobile: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    trim: true,
    max: 15,
  },
}).add(userBasics).pre('save', function (next) {
  if (this.mobile) {
    this.mobile = convertMobileToInternational(this.mobile);
  }
  next();
}).pre('findOneAndUpdate', function (next) {
  handleConvertMobileToInternationalFromMongooseQuery(this);
  next();
}).pre('update', function (next) {
  let mobile = this.getQuery().mobile;
  mobile ? this.getQuery().mobile = convertMobileToInternational(mobile) : null;
  next();
}).pre('updateMany', function (next) {
  let mobile = this.getQuery().mobile;
  mobile ? this.getQuery().mobile = convertMobileToInternational(mobile) : null;
  next();
}).pre('updateOne', function (next) {
  let mobile = this.getQuery().mobile;
  mobile ? this.getQuery().mobile = convertMobileToInternational(mobile) : null;
  next();
}).pre('find', function (next) {
  handleConvertMobileToInternationalFromMongooseQuery(this);
  next();
}).pre('findOne', function (next) {
  handleConvertMobileToInternationalFromMongooseQuery(this);
  next();
})


export default mongoose.models.User || mongoose.model("User", UserSchema);
