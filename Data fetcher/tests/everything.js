import { testAllPokemon } from './pokemon.js'
import { testAllAbilities } from './ability.js'
import { testAllItems } from './item.js'

export async function testEverything () {
  console.log('Testing all data...')
  const abilities = await testAllAbilities()
  const items = await testAllItems()
  await testAllPokemon(abilities, items)
  console.log('All tests passed !')
}
