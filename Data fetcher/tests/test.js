import { testAllAbilities } from './ability.js'
import { testAllPokemon } from './pokemon.js'
import { testEverything } from './everything.js'
import { testAllItems } from './item.js'

switch (process.argv[2]) {
  case 'items':
    await testAllItems()
    break
  case 'abilities':
    await testAllAbilities()
    break
  case 'pokemon':
    await testAllPokemon()
    break
  default:
    await testEverything()
}
