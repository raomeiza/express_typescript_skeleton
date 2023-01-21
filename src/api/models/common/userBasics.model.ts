import { string } from "joi";
import mongoose from "mongoose";
import validator from "validator";
import ageGroup from "../../../utils/age.group";

const userBasics:object = new mongoose.Schema({
  firstname: {
    type: String,
    max: 50,
  },
  lastname: {
    type: String,
    max: 50,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
    index: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    trim: true,
    max: 15,
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  ageGroup: {
    type: String,
    enum: ageGroup
  },
});
export default userBasics;
