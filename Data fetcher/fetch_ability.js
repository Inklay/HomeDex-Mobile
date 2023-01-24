import { load } from 'cheerio'

const baseURL = 'https://bulbapedia.bulbagarden.net'

export async function getAllAbilityURLList () {
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

export function getAllAbilityData () {
}

const abilityURLList = await getAllAbilityURLList()
