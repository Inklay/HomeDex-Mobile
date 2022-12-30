import { getPokemonData, getPokemonURLList } from '../data_fetcher.js'

async function testAllPokemon () {
  console.log('Trying to gather data for all Pokémon')
  const pokemonURLList = await getPokemonURLList()
  for (let i = 0; i < pokemonURLList.length; i++) {
    const data = await getPokemonData(pokemonURLList[i])
    console.assert(data !== undefined)
    console.assert(data.length > 0)
    for (let j = 0; j < data.length; j++) {
      // Name
      console.assert(data[j].names !== undefined, `${pokemonURLList[i]}, form ${j}: Names undefined`)
      console.assert(data[j].names.length !== 0, `${pokemonURLList[i]}, form ${j}: Names empty`)
      console.assert(data[j].names[0].name !== '', `${pokemonURLList[i]}, form ${j}: Name empty`)
      console.assert(data[j].names[0].name !== undefined, `${pokemonURLList[i]}, form ${j}: No english name`)
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
      console.assert(data[j].gender_rate <= 8, `${data[j].names[0].name}: Gender ratio invalid -> ${data[j].gender_rate}`)
      // Growth rate
      console.assert(data[j].growth_rate !== undefined, `${data[j].names[0].name}: Growth rate undefined`)
      console.assert(data[j].growth_rate !== '', `${data[j].names[0].name}: Growth rate empty`)
      // Cateory
      console.assert(data[j].category !== undefined, `${data[j].names[0].name}: Category undefined`)
      console.assert(data[j].category.length !== 0, `${data[j].names[0].name}: Category empty`)
      console.assert(data[j].category[0].name !== undefined, `${data[j].names[0].name}: English category undefined`)
      console.assert(data[j].category[0].name !== '', `${data[j].names[0].name}: English category empty`)
    }
  }
}

await testAllPokemon()