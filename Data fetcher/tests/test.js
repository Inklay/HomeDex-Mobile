import { testAllAbilities } from './ability.js'
import { testAllPokemon } from './pokemon.js'
import { testEverything } from './everything.js'

switch (process.argv[2]) {
  case 'abilities':
    await testAllAbilities()
    break
  case 'pokemon':
    await testAllPokemon()
    break
  default:
    await testEverything()
}
