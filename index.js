'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let bodyBuilder = require('./middleware/bodyBuilder')
let bodyParser = require('koa-bodyparser')
let compress = require('koa-compress')
let errorHandler = require('./middleware/errorHandler')
let koa = require('koa')
let logger = require('koa-logger')
let router = require('koa-router')()





/******************************************************************************\
  Route controllers
\******************************************************************************/

let auth = require('./controllers/auth')
let inventory = require('./controllers/inventory')
let pokedex = require('./controllers/pokedex')
let pokemon = require('./controllers/pokemon')
let config = require('./config.json')





/******************************************************************************\
  Initialize the app
\******************************************************************************/
let app = koa()





/******************************************************************************\
  Pre route middleware
\******************************************************************************/

app.use(function * (next) {
  this.state = {
    password: config.password,
    username: config.username
  }

  yield next
})

app.use(bodyBuilder())

app.use(errorHandler())

app.use(bodyParser())

app.use(logger())





/******************************************************************************\
  Routes
\******************************************************************************/

router.post('/evolve', pokemon.evolve)

router.get('/inventory', inventory.inventory)

router.get('/candies', inventory.candies)

router.get('/items', inventory.items)

router.get('/login', auth.login)

router.get('/pokedex/:no', pokedex)

router.get('/pokemon', inventory.pokemon)

router.post('/power-up', pokemon.powerUp)

router.post('/transfer', pokemon.transfer)

app.use(router.routes())
app.use(router.allowedMethods())





/******************************************************************************\
  Post route middleware
\******************************************************************************/

app.use(compress())





/******************************************************************************\
  Start the app
\******************************************************************************/

console.log('Listening on port', process.env.PORT || 3001)
app.listen(process.env.PORT || 3001)
