import { load } from 'cheerio'

const baseURL = 'https://bulbapedia.bulbagarden.net'

export async function getAbilityURLList () {
  const list = []
  const URL = `${baseURL}/wiki/Ability`
  const pageHTML = await (await fetch(URL)).text()
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
  return {
    names: [
      {
        name: $('table.roundy > tbody > tr > td > big > b').length,
        language: 'en'
      }
    ],
    id
  }
}

export async function getAllAbilityData () {
  const data = []
  for (let i = 0; i < abilityURLList.length; i++) {
    data.push(await getAbilityData(abilityURLList[i], i))
  }
  return data
}

const abilityURLList = await getAbilityURLList()
