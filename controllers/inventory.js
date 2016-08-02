'use strict'

let _ = require('lodash')
let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')
let POGOProtos = require('node-pogo-protos')





let buildMon = require('../helpers/buildMon')





let client = new pogobuf.Client()
let login = new pogobuf.GoogleLogin()
let utils = pogobuf.Utils





/******************************************************************************\
  Full Inventory
\******************************************************************************/

module.exports.inventory = function * inventory (next) {
  let data

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.getInventory()

  })
  .then(inventory => {
    this.body.data = utils.splitInventory(inventory)

    this.body.data.items.forEach((item, index, array) => {
      array[index].name = utils.getEnumKeyByValue(POGOProtos.Inventory.Item.ItemId, item.item_id)
    })

//    delete this.body.data.applied_items
//    delete this.body.data.currency
//    delete this.body.data.camera
//    delete this.body.data.candies
//    delete this.body.data.egg_incubators
//    delete this.body.data.inventory_upgrades
//    delete this.body.data.player
//    delete this.body.data.pokedex
//    delete this.body.data.pokemon
//    delete this.body.data.items

    return next

  })
  .catch(error => {
    throw error
  })
}




/******************************************************************************\
  Candy
\******************************************************************************/

module.exports.candies = function * candies (next) {
  let data

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.getInventory()

  })
  .then(inventory => {
    this.body.data = utils.splitInventory(inventory).candies

    this.body.data.forEach((candy, index, array) => {
      array[index].family = utils.getEnumKeyByValue(POGOProtos.Enums.PokemonFamilyId, candy.family_id)
    })

    return next

  })
  .catch(error => {
    throw error
  })
}




/******************************************************************************\
  Items
\******************************************************************************/

module.exports.items = function * items (next) {
  let data

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.getInventory()

  })
  .then(inventory => {
    this.body.data = utils.splitInventory(inventory).items

    this.body.data.forEach((item, index, array) => {
      array[index].name = utils.getEnumKeyByValue(POGOProtos.Inventory.Item.ItemId, item.item_id)
    })

    return next

  })
  .catch(error => {
    throw error
  })
}





/******************************************************************************\
  Pokemon
\******************************************************************************/

module.exports.pokemon = function * pokemon (next) {
  let data

  return yield login.login(this.state.username, this.state.password)
  .then(token => {
    client.setAuthInfo('google', token)
    return client.init()

  })
  .then(() => {
    return client.downloadItemTemplates()

  })
  .then((templates) => {
    this.state.pokemon_info = utils.splitItemTemplates(templates).pokemon_settings

  })
  .then(() => {
    return client.getInventory()

  })
  .then(inventory => {
    this.body.data = []

    utils.splitInventory(inventory).pokemon.forEach((mon, index, array) => {
      if (!mon.is_egg) {
        let baseInfo = _.find(this.state.pokemon_info, {
          pokemon_id: mon.pokemon_id
        })

        mon = buildMon(mon, baseInfo)

        this.body.data.push(mon)
      }
    })

    return next

  })
  .catch(error => {
    throw error
  })
}
