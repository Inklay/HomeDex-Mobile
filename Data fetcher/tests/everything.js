import { testAllPokemon } from './pokemon.js'
import { testAllAbilities } from './ability.js'

export async function testEverything () {
  console.log('Testing all data...')
  const abilities = await testAllAbilities()
  await testAllPokemon(abilities)
  console.log('All tests passed !')
}
