import { getAllPokemonData } from './fetch_pokemon.js'
import { getAllAbilityData } from './fetch_ability.js'
import fs from 'fs'

const abilities = await getAllAbilityData()

const data = {
  pokemon: await getAllPokemonData(abilities),
  abilities
}

fs.writeFileSync('data.json', JSON.stringify(data))
