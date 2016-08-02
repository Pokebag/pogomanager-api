'use strict'

let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')





/******************************************************************************\
  Login
\******************************************************************************/

module.exports.login = function * login () {
  let client = new pogobuf.Client()
  let login = new pogobuf.GoogleLogin()

  console.log(this.request.body)

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()
  })
  .catch(error => {
    throw error
  })
}





/******************************************************************************\
  Logout
\******************************************************************************/

module.exports.logout = function * logout () {}
