import mongoose from 'mongoose';

// create a schema for apikey and secret key
const ApiTokenSchema = new mongoose.Schema({
  apikey: {
    type: String,
    required: true,
    unique: true
  },
  secretkey: {
    type: String,
    required: true,
    unique: true
  }
});

// create and export a model for the schema
export default mongoose.model('ApiToken', ApiTokenSchema, 'ApiToken');