'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let fs = require('fs')
let mongoose = require('mongoose')
let path = require('path')

let config = require('./config.json')





/******************************************************************************\
  Initialize the database
\******************************************************************************/

// Connect
mongoose.connect('mongodb://' + config.mongo.hostname + ':' + config.mongo.port + '/' + config.mongo.database)

// Set up logging
mongoose.connection.on('error', function (error) {
  console.error(error);
})





/******************************************************************************\
  Load our mongoose models
\******************************************************************************/

let modelPath = path.resolve('.', 'models')

fs.readdirSync(modelPath).forEach(function (file) {
  require(path.resolve(modelPath, file))
})





/******************************************************************************\
  Initialize the app
\******************************************************************************/

// Import
let koa = require('koa')

// Start Koa
let app = koa()

// Configure middleware, et al
require('./config/koa')(app, config)





/******************************************************************************\
  Initialize the router
\******************************************************************************/

// Import
let router = require('koa-router')()

// Configure
require('./config/router')(app, router, config)





/******************************************************************************\
  Start the server
\******************************************************************************/

console.log('Listening on port', process.env.PORT || 3001)
app.listen(process.env.PORT || 3001)
