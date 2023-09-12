import { load } from 'cheerio'
import { getOtherNames } from './utils.js'
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache'

const baseURL = 'https://bulbapedia.bulbagarden.net'

export async function getAbilityURLList () {
  const weekTimeMS = 7 * 24 * 60 * 60 * 1000
  const fetchCache = fetchBuilder.withCache(new FileSystemCache({ cacheDirectory: './cache', ttl: weekTimeMS }))
  const list = []
  const URL = `${baseURL}/wiki/Ability`
  const pageHTML = await (await fetchCache(URL)).text()
  const $ = load(pageHTML)
  $('#List_of_Abilities')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .children('table')
    .children('tbody')
    .children('tr')
    .each((index, element) => {
      // Skip the first row, which is the table header
      if (index === 0) {
        return
      }
      list.push(
        $('td:nth-child(2)', element)
          .children('a').attr('href')
      )
    })
  return list
}

export async function getAbilityData (abilityURL, id) {
  const URL = `${baseURL}${abilityURL}`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  const otherNames = getOtherNames($, false)

  return {
    names: [
      {
        name: $('table.roundy > tbody > tr > td > big > b').text(),
        language: 'en'
      },
      ...otherNames
    ],
    id
  }
}

export async function getAllAbilityData () {
  console.log(`Getting data for ${abilityURLList.length} abilities`)
  const data = []
  for (let i = 0; i < abilityURLList.length; i++) {
    data.push(await getAbilityData(abilityURLList[i], i))
    if (i !== 0 && i % 100 === 0) {
      console.log(`Got data for ${i}/${abilityURLList.length} abilities`)
    }
  }
  console.log('Got data for all abilities')
  return data
}

const abilityURLList = await getAbilityURLList()
