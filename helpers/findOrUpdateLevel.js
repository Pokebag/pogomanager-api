'use strict'

let _ = require('lodash')
let path = require('path')





let levelConversions = require('../data/level-conversions.json')





function roundDigit (float) {
  return parseFloat(float.toPrecision(float.toString().length - 2))
}





module.exports = function findOrUpdateLevel (cpMultiplier) {
  let comparator = cpMultiplier
  let level = levelConversions[cpMultiplier]

  while (!level) {
    comparator = parseFloat(comparator.toPrecision(comparator.toString().length - 3))

    if ((level = levelConversions[comparator]) || (comparator.toString().length <= 1)) {
      return
    }
  }

  return level
}
