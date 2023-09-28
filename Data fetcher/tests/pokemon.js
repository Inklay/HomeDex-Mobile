import { getPokemonData, getPokemonURLList } from '../fetch_pokemon.js'
import fs from 'fs'
import { testAllAbilities } from './ability.js'
import { testAllItems } from './item.js'

export async function testAllPokemon (abilities = undefined, items = undefined) {
  if (abilities === undefined) {
    if (fs.existsSync('cache/abilities.json')) {
      console.log('Using already stored abilities')
      abilities = JSON.parse(fs.readFileSync('cache/abilities.json'))
    } else {
      console.log('Fetching abilities...')
      abilities = await testAllAbilities()
      fs.writeFileSync('cache/abilities.json', JSON.stringify(abilities))
    }
    if (items === undefined) {
      if (fs.existsSync('cache/items.json')) {
        console.log('Using already stored items')
        items = JSON.parse(fs.readFileSync('cache/items.json'))
      } else {
        console.log('Fetching items...')
        items = await testAllItems()
        fs.writeFileSync('cache/items.json', JSON.stringify(items))
      }
    }
  }

  console.log('Trying to gather data for all Pokémon')
  const pokemonURLList = await getPokemonURLList()
  let start = 0
  let end = pokemonURLList.length
  if (process.argv[3] !== undefined) {
    start = parseInt(process.argv[3] - 1)
    if (process.argv[4] !== undefined) {
      end = parseInt(process.argv[4])
    } else {
      end = parseInt(process.argv[3])
    }
  }
  for (let i = start; i < end; i++) {
    const data = await getPokemonData(pokemonURLList[i], abilities)
    console.assert(data !== undefined)
    console.assert(data.length > 0)
    for (let j = 0; j < data.length; j++) {
      // Name
      console.assert(data[j].names !== undefined, `${pokemonURLList[i]}, form ${j}: Names undefined`)
      console.assert(data[j].names.length !== 0, `${pokemonURLList[i]}, form ${j}: Names empty`)
      console.assert(data[j].names.find(name => name.language === 'en') !== undefined, `${pokemonURLList[i]}, form ${j}: No english name`)
      console.assert(data[j].names.find(name => name.language === 'en').name !== '', `${pokemonURLList[i]}, form ${j}: English name empty`)
      console.assert(data[j].names.find(name => name.language === 'fr') !== undefined, `${data[j].names[0].name}, form ${j}: No french name`)
      console.assert(data[j].names.find(name => name.language === 'es') !== undefined, `${data[j].names[0].name}, form ${j}: No spanish name`)
      console.assert(data[j].names.find(name => name.language === 'de') !== undefined, `${data[j].names[0].name}, form ${j}: No german name`)
      console.assert(data[j].names.find(name => name.language === 'ja') !== undefined, `${data[j].names[0].name}, form ${j}: No japanese name`)
      console.assert(data[j].names.find(name => name.language === 'ko') !== undefined, `${data[j].names[0].name}, form ${j}: No korean name`)
      console.assert(data[j].names.find(name => name.language === 'zh-Hant') !== undefined, `${data[j].names[0].name}, form ${j}: No chinese name`)
      // Dex numbers
      console.assert(data[j].dex_numbers !== undefined, `${data[j].names[0].name}: Dex numbers undefined`)
      console.assert(data[j].dex_numbers.nat !== undefined, `${data[j].names[0].name}: Nat dex numbers undefined`)
      console.assert(data[j].dex_numbers.nat >= -1, `${data[j].names[0].name}: Nat dex numbers invalid -> ${data[j].dex_numbers.nat}`)
      // Types
      console.assert(data[j].types !== undefined, `${data[j].names[0].name}: Types undefined`)
      console.assert(data[j].types.length !== 0, `${data[j].names[0].name}: Types empty`)
      console.assert(data[j].types[0] !== undefined, `${data[j].names[0].name}: First type undefined -> ${data[j].types[0]}`)
      // Base friendship
      console.assert(data[j].base_friendship !== undefined, `${data[j].names[0].name}: Base friendship undefined`)
      console.assert(data[j].base_friendship >= -1, `${data[j].names[0].name}: Base friendship invalid -> ${data[j].base_friendship}`)
      // Catch rate
      console.assert(data[j].catch_rate !== undefined, `${data[j].names[0].name}: Catch rate undefined`)
      console.assert(data[j].catch_rate >= -1, `${data[j].names[0].name}: Catch rate invalid -> ${data[j].catch_rate}`)
      // Height
      console.assert(data[j].height !== undefined, `${data[j].names[0].name}: Height undefined`)
      console.assert(data[j].height > 0, `${data[j].names[0].name}: Height invalid -> ${data[j].height}`)
      // Weight
      console.assert(data[j].weight !== undefined, `${data[j].names[0].name}: Weight undefined`)
      console.assert(data[j].weight >= -1, `${data[j].names[0].name}: Weight invalid -> ${data[j].weight}`)
      // Egg groups
      console.assert(data[j].egg_groups !== undefined, `${data[j].names[0].name}: Egg groups undefined`)
      console.assert(data[j].egg_groups.length !== 0, `${data[j].names[0].name}: Egg groups empty`)
      console.assert(data[j].egg_groups[0] !== undefined, `${data[j].names[0].name}: First egg group undefined -> ${data[j].egg_groups[0]}`)
      // Gender ratio
      console.assert(data[j].gender_rate !== undefined, `${data[j].names[0].name}: Gender ratio undefined`)
      console.assert(data[j].gender_rate >= -1, `${data[j].names[0].name}: Gender ratio invalid -> ${data[j].gender_rate}`)
      console.assert(data[j].gender_rate <= 10, `${data[j].names[0].name}: Gender ratio invalid -> ${data[j].gender_rate}`)
      // Growth rate
      console.assert(data[j].growth_rate !== undefined, `${data[j].names[0].name}: Growth rate undefined`)
      console.assert(data[j].growth_rate !== '', `${data[j].names[0].name}: Growth rate empty`)
      // Cateory
      console.assert(data[j].category !== undefined, `${data[j].names[0].name}: Category undefined`)
      console.assert(data[j].category.length !== 0, `${data[j].names[0].name}: Category empty`)
      console.assert(data[j].category[0].name !== undefined, `${data[j].names[0].name}: English category undefined`)
      console.assert(data[j].category[0].name !== '', `${data[j].names[0].name}: English category empty`)
      // Flavor text
      console.assert(data[j].flavor_texts !== undefined, `${data[j].names[0].name}: Flavor text undefined`)
      console.assert(data[j].flavor_texts.length !== 0, `${data[j].names[0].name}: Flavor text empty`)
      // Stats
      console.assert(data[j].stats !== undefined, `${data[j].names[0].name}: Stats undefined`)
      console.assert(data[j].stats.length >= 5, `${data[j].names[0].name}: Stats invalid -> ${data[j].stats}`)
      // Abilities
      console.assert(data[j].abilities !== undefined, `${data[j].names[0].name}: Abilities undefined`)
      console.assert(data[j].abilities.length >= 0, `${data[j].names[0].name}: Abilities empty`)
    }
  }
  console.log('Successfully gathered the data for all Pokémon !')
}
