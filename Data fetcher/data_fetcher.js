import { getAllPokemonData } from './fetch_pokemon.js'
import { getAllAbilityData } from './fetch_ability.js'
import { getAllItemData } from './item/items.js'
import fs from 'fs'

const abilitiesRaw = await getAllAbilityData()
const abilities = abilitiesRaw.map(ability => ability.names)

const itemsRaw = await getAllItemData()
const items = itemsRaw.map(item => item.names)

const data = {
  pokemon: await getAllPokemonData(abilitiesRaw),
  abilities,
  items
}

fs.writeFileSync('../assets/data/data.json', JSON.stringify(data))
