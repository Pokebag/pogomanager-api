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
  let data
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.evolvePokemon(id)

  })
  .then(response => {
    this.body.data = buildMon(response.evolved_pokemon_data)

    return next

  })
  .catch(error => {
    throw error
  })
}





/******************************************************************************\
  Power Up
\******************************************************************************/

module.exports.powerUp = function * powerUp (next) {
  let data
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.upgradePokemon(id)

  })
  .then(response => {
    this.body.data = buildMon(response.upgraded_pokemon)

    return next

  })
  .catch(error => {
    throw error
  })
}





/******************************************************************************\
  Transfer
\******************************************************************************/

module.exports.transfer = function * transfer (next) {
  let data
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.releasePokemon(id)

  })
  .then(response => {
    this.body.data = response

    return next

  })
  .catch(error => {
    throw error
  })
}
