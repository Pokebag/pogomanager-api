'use strict'

let pogobuf = require('pogobuf')





/******************************************************************************\
  Login
\******************************************************************************/

module.exports.login = function * login (next) {
  let GoogleAuth = new pogobuf.GoogleLogin()
  let User = require('mongoose').model('User')

  // Memoize the user's credentials
  let email = this.request.body.email
  let password = this.request.body.password

  // Try to find the user
  let user = yield User.findOne({
    email: email
  })

  // If a user isn't found, let's create one
  if (!user) {
    // Get a master token
    let masterToken = yield GoogleAuth.getMasterToken(email, password)
    .then(response => {
      return response.masterToken
    })

    user = new User({
      email: email,
      token: masterToken
    })

    user = yield user.save()
  }

  this.body.data = user

  this.session.email = user.email
  this.session.id = user._id
  this.session.token = user.token

  yield next
}





/******************************************************************************\
  Logout
\******************************************************************************/

module.exports.logout = function * logout (next) {
  let User = require('mongoose').model('User')

  // Delete the user from MongoDB
  yield User.remove({
    _id: this.session.id
  })

  this.session = null

  yield next
}
