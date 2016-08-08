'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let bodyBuilder = require('../middleware/bodyBuilder')
let bodyParser = require('koa-bodyparser')
let compress = require('koa-compress')
let errorHandler = require('../middleware/errorHandler')
let logger = require('koa-logger')
let session = require('koa-session')





module.exports = function (app, config) {

  /******************************************************************************\
    Config
  \******************************************************************************/

  app.keys = config.app.keys





  /******************************************************************************\
    Set up middleware
  \******************************************************************************/

  app.use(function * (next) {
    this.state = {
      password: config.password,
      username: config.username
    }

    yield next
  })

  app.use(logger())
  app.use(compress())
  app.use(session(app))
  app.use(errorHandler())
  app.use(bodyParser())
  app.use(bodyBuilder())
}
