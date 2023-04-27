import { getAbilityURLList, getAbilityData } from '../fetch_ability.js'

export async function testAllAbilities () {
  console.log('Trying to gather data for all abilities')
  const abilityURLList = await getAbilityURLList()
  const abilities = []
  for (let i = 0; i < abilityURLList.length; i++) {
    const data = await getAbilityData(abilityURLList[i], i)
    abilities[i] = data
    console.assert(data !== undefined)
    // Name
    console.assert(data.names !== undefined, `${abilityURLList[i]}: Names undefined`)
    console.assert(data.names.length !== 0, `${abilityURLList[i]}: Names empty`)
    console.assert(data.names[0].name !== '', `${abilityURLList[i]}: Name empty`)
    console.assert(data.names[0].name !== undefined, `${abilityURLList[i]}: No english name`)
    // Id
    console.assert(data.id !== undefined, `${abilityURLList[i]}: Id undefined`)
    console.assert(data.id >= 0, `${abilityURLList[i]}: Id invalid -> ${data.id}`)
  }
  console.log('Successfully gathered the data for all abilities !')
  return abilities
}
