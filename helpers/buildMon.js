'use strict'

let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')
let POGOProtos = require('node-pogo-protos')





let utils = pogobuf.Utils





module.exports = function buildMon (inventoryData) {
  let longID = new Long(inventoryData.id.low, inventoryData.id.high, inventoryData.id.unsigned).toString()

  return {
    id: inventoryData.id,
    longID: longID,
    moves: [
      utils.getEnumKeyByValue(POGOProtos.Enums.PokemonMove, inventoryData.move_1),
      utils.getEnumKeyByValue(POGOProtos.Enums.PokemonMove, inventoryData.move_2)
    ],
    name: utils.getEnumKeyByValue(POGOProtos.Enums.PokemonId, inventoryData.pokemon_id),
    nickname: inventoryData.nickname,
    no: inventoryData.pokemon_id,
    stats: {
      additionalCpMultiplier: inventoryData.additional_cp_multiplier,
      cp: inventoryData.cp,
      cpMultiplier: inventoryData.cp_multiplier,
      currentHP: inventoryData.stamina,
      height: inventoryData.height_m,
      iv: {
        attack: inventoryData.individual_attack,
        defense: inventoryData.individual_defense,
        stamina: inventoryData.individual_stamina
      },
      maxHP: inventoryData.stamina_max,
      upgrades: inventoryData.num_upgrades,
      weight: inventoryData.weight_kg,
    }
  }
}
