import { getAllPokemonData } from './fetch_pokemon.js'
import { getAllAbilityData } from './fetch_ability.js'
import fs from 'fs'

const abilitiesRaw = await getAllAbilityData()
const abilities = abilitiesRaw.map(ability => ability.names)
console.log(abilities)

const data = {
  pokemon: await getAllPokemonData(abilitiesRaw),
  abilities
}

fs.writeFileSync('../assets/data/data.json', JSON.stringify(data))
