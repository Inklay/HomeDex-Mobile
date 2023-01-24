import { testAllPokemon } from './pokemon.js'
import { testAllAbilities } from './ability.js'

console.log('Testing all data...')
const abilities = await testAllAbilities()
testAllPokemon(abilities)
console.log('All tests passed !')
