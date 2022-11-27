const mongoose = require("mongoose");
const {EMAIL_VS} = require('../utils/validationSchemas.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  surname: {
    type: String,
    required: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: value => EMAIL_VS.isValidSync(value)
    }
  },
  birthday: {
    type: Date,
    default: new Date()
  },
  isMale: {
    type: Boolean
  },
  level: {
    type: String,
    enum: ['beginner', 'middle', 'super']
  },
  years: {
    type: Number,
    default: 0
  }
},
  {
    versionKey: false,
    timestamps: true
  }
);

const User = mongoose.connection.model('User', userSchema);

module.exports = User;
