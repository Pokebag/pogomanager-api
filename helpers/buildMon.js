'use strict'

let _ = require('lodash')
let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')
let POGOProtos = require('node-pogo-protos')





let junkTexts = {
  family: 'Family ',
  move: ' Fast',
  type: 'Pokemon Type '
}





function getEnum (enums, key, junkText) {
  // Retrieve enum
  let string = pogobuf.Utils.getEnumKeyByValue(enums, key)

  if (junkText) {
    // Eliminate junk text
    string = string.replace(junkText, '')
  }

  return string
}





function getFamily (key) {
  return getEnum(POGOProtos.Enums.PokemonFamilyId, key, junkTexts.family)
}





function getMove (key) {
  let moveData = _.find(this.state.templates.move_settings, {
    movement_id: key
  })

  return {
    damage: moveData.power,
    name: getEnum(POGOProtos.Enums.PokemonMove, key, junkTexts.move),
    type: getType(moveData.pokemon_type)
  }
}





function getName (key) {
  return getEnum(POGOProtos.Enums.PokemonId, key, junkTexts.type)
}





function getType (key) {
  return getEnum(POGOProtos.Enums.PokemonType, key, junkTexts.type)
}





module.exports = function buildMon (inventoryData) {
  let longID = new Long(inventoryData.id.low, inventoryData.id.high, inventoryData.id.unsigned).toString()

  let mon = {
    id: inventoryData.id,
    longID: longID,
    moves: [],
    name: getName(inventoryData.pokemon_id),
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

  let baseInfo = _.find(this.state.templates.pokemon_settings, {
    pokemon_id: mon.no
  })

  mon.moves.push(getMove.call(this, inventoryData.move_1))
  mon.moves.push(getMove.call(this, inventoryData.move_2))

  mon.family_id = baseInfo.family_id
  mon.family = getFamily(baseInfo.family_id)

  mon.stats.base = {
    attack: baseInfo.stats.base_attack,
    defense: baseInfo.stats.base_defense,
    stamina: baseInfo.stats.base_stamina
  }

  if (baseInfo.candy_to_evolve) {
    mon.toEvolve = baseInfo.candy_to_evolve
  }

  mon.types = [getType(baseInfo.type)]

  if (baseInfo.type2) {
    mon.types.push(getType(baseInfo.type2))
  }

  return mon
}
