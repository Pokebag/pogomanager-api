'use strict'

let pogobuf = require('pogobuf')





function * login (next) {
  let GoogleAuth = new pogobuf.GoogleLogin()

  this.state.client = new pogobuf.Client()

  let token = yield GoogleAuth.getToken(this.session.email, this.session.token)
  .then(authData => {
    return authData.Auth
  })

  console.log(token)

  this.state.client.setAuthInfo('google', token)

  yield this.state.client.init()

  yield next
}





module.exports = function () {
  return login
}
