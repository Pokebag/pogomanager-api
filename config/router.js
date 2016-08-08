'use strict'

let auth = require('../controllers/auth')
let inventory = require('../controllers/inventory')
let pokedex = require('../controllers/pokedex')
let pokemon = require('../controllers/pokemon')
let templates = require('../controllers/templates')
let login = require('../middleware/login')
let getItemTemplates = require('../middleware/getItemTemplates')





let secured = function * secured (next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.status = 401
  }
}





module.exports = function (app, router, config) {

  /******************************************************************************\
    GET routes
  \******************************************************************************/

  router.get('/candies', login(), getItemTemplates(), inventory.candies)
  router.get('/inventory', login(), getItemTemplates(), inventory.inventory)
  router.get('/items', login(), getItemTemplates(), inventory.items)
  router.get('/pokedex/:no', pokedex)
  router.get('/pokemon', login(), getItemTemplates(), inventory.pokemon)
  router.get('/templates', login(), getItemTemplates(), templates.templates)





  /******************************************************************************\
    POST routes
  \******************************************************************************/

  router.post('/evolve', login(), pokemon.evolve)
  router.post('/login', auth.login)
  router.post('/logout', auth.logout)
  router.post('/power-up', login(), pokemon.powerUp)
  router.post('/transfer', login(), pokemon.transfer)





  /******************************************************************************\
    Attach the router to the app
  \******************************************************************************/

  app.use(router.routes())
  app.use(router.allowedMethods())
}
