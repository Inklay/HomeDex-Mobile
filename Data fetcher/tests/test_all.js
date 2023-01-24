import { testAllPokemon } from './pokemon'
import { testAllAbilities } from './ability'

console.log('Testing all data...')
const abilities = await testAllAbilities()
testAllPokemon(abilities)
console.log('All tests passed !')
