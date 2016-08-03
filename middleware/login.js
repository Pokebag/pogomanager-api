'use strict'

let pogobuf = require('pogobuf')





function * login (next) {
  let login = new pogobuf.GoogleLogin()

  this.state.client = new pogobuf.Client()

  let token = yield login.login(this.state.username, this.state.password)

  this.state.client.setAuthInfo('google', token)

  yield this.state.client.init()

  yield next
}





module.exports = function () {
  return login
}
