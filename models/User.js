'use strict'

let co = require('co')
let mongoose = require('mongoose')
let Schema = mongoose.Schema





let UserSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  token: {
    required: true,
    type: String
  }
})





module.exports = mongoose.model('User', UserSchema)
