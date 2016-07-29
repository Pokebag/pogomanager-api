'use strict'

let path = require('path')
let pogobuf = require('pogobuf')
let Pokedex = require('pokedex-promise-v2')





let moves = require(path.resolve(__dirname, '..', 'data', 'moves.json'))
let client = new pogobuf.Client()
let login = new pogobuf.GoogleLogin()
let utils = pogobuf.Utils
let P = new Pokedex()





let latitude = 43.060792
let longitude = -89.410350





function buildMon (inventoryData, pokedexData) {
  return {
    moves: [
      moves[inventoryData.move_1],
      moves[inventoryData.move_2]
    ],
    name: pokedexData.name,
    nickname: pokedexData.nickname,
    no: inventoryData.pokemon_id,
    sprites: pokedexData.sprites,
    stats: {
      cp: inventoryData.cp,
      cp_multiplier: inventoryData.cp_multiplier,
      current_hp: inventoryData.stamina,
      height: inventoryData.height_m,
      iv: {
        attack: inventoryData.individual_attack,
        defense: inventoryData.individual_defense,
        stamina: inventoryData.individual_stamina
      },
      max_hp: inventoryData.stamina_max,
      upgrades: inventoryData.num_upgrades,
      weight: inventoryData.weight_kg,
    }
  }
}





module.exports.items = function * items (next) {
  return yield login.login('spam@trezy.com', 'fuckitall')
  .then(token => {
    client.setAuthInfo('google', token)
    client.setPosition(latitude, longitude)
    return client.init()
  })
  .then(() => {
    return client.getInventory()
  })
  .then((inventory) => {
    this.body = utils.splitInventory(inventory).items

    return next
  })
  .catch((error) => {
    throw error
  })
}





module.exports.pokemon = function * pokemon (next) {
  return yield login.login('spam@trezy.com', 'fuckitall')
  .then(token => {
    client.setAuthInfo('google', token)
    client.setPosition(latitude, longitude)
    return client.init()
  })
  .then(() => {
    return client.getInventory()
  })
  .then((inventory) => {
    this.body = utils.splitInventory(inventory).pokemon
  })
  .then(() => {
    let promises = []

    this.body.forEach((mon) => {
      promises.push(P.getPokemonByName(mon.pokemon_id))
    })

    return Promise.all(promises)
  })
  .then((pokedexData) => {
    this.body.forEach((mon, index, array) => {
      array[index] = buildMon(mon, pokedexData[index])
    })

    return next
  })
  .catch((error) => {
    throw error
  })
}
