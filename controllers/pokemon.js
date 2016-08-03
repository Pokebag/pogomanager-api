'use strict'

let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')





let buildMon = require('../helpers/buildMon')





let client = new pogobuf.Client()
let login = new pogobuf.GoogleLogin()
let utils = pogobuf.Utils





/******************************************************************************\
  Evolve
\******************************************************************************/

module.exports.evolve = function * evolve (next) {
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  let response = yield this.state.client.evolvePokemon(id)

  this.body.data = buildMon(response.evolved_pokemon_data)

  yield next
}





/******************************************************************************\
  Power Up
\******************************************************************************/

module.exports.powerUp = function * powerUp (next) {
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  let response = yield this.state.client.upgradePokemon(id)

  this.body.data = buildMon(response.upgraded_pokemon)

  yield next
}





/******************************************************************************\
  Transfer
\******************************************************************************/

module.exports.transfer = function * transfer (next) {
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  let response = yield this.state.client.releasePokemon(id)

  this.body.data = buildMon(response)

  yield next
}
