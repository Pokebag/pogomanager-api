'use strict'

let _ = require('lodash')
let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')
let POGOProtos = require('node-pogo-protos')





let utils = pogobuf.Utils





module.exports = function buildMon (inventoryData) {
  let longID = new Long(inventoryData.id.low, inventoryData.id.high, inventoryData.id.unsigned).toString()

//  if (!this.state.itemTemplates) {
//    yield client.downloadItemTemplates()
//    this.state.itemTemplates = utils.splitItemTemplates(yield client.downloadItemTemplates())
//  }

//  let baseInfo = _.find(this.state.itemTemplates.pokemon_settings, {
//    pokemon_id: mon.pokemon_id
//  })

  let mon = {
    id: inventoryData.id,
    longID: longID,
    moves: [],
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

//  mon.moves.push({
//    name: utils.getEnumKeyByValue(POGOProtos.Enums.PokemonMove, inventoryData.move_1).replace(' Fast', ''),
//
//  })
//  mon.moves.push({
//    name: utils.getEnumKeyByValue(POGOProtos.Enums.PokemonMove, inventoryData.move_2).replace(' Fast', ''),
//
//  })
//  POGOProtos.Enums.PokemonMove

//  if (baseInfo) {
//    mon.stats.base = {
//      attack: baseInfo.stats.base_attack,
//      defense: baseInfo.stats.base_defense,
//      stamina: baseInfo.stats.base_stamina
//    }
//
//    if (baseInfo.candy_to_evolve) {
//      mon.toEvolve = baseInfo.candy_to_evolve
//    }
//
//    mon.types = [baseInfo.type]
//
//    if (baseInfo.type2) {
//      mon.types.push(baseInfo.type2)
//    }
//  }

  return mon
}
