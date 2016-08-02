'use strict'

let Pokedex = require('pokedex-promise-v2')





let P = new Pokedex()





/******************************************************************************\
  Get Pokedex flavor text
\******************************************************************************/

module.exports = function * pokedex (next) {
  let data

  return yield P.getPokemonSpeciesByName(this.params.no)
  .then(entry => {
    entry.flavor_text_entries.forEach(entry => {
      if (entry.language.name === 'en') {
        this.body.data = entry.flavor_text
      } else {
        throw Error(`Couldn't find flavor text for ${this.params.no}`)
      }
    })

    return next
  })
  .catch(error => {
    throw error
  })
}
