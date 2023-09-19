import { load } from 'cheerio'

async function getFRCategory ($, name) {
  const data = []
  const defaultCategory = $('a[title=\'Catégorie\']').parent().next('td').text()
  data.push({
    form: 'default',
    categories: [{
      name: defaultCategory,
      language: 'fr'
    }]
  })
  if ($(`a[title='${name.name} de Paldea']`).length !== 0) {
    const URL = `https://www.pokepedia.fr/${name.name}_de_Paldea`
    const pageHTML = await (await fetch(URL)).text()
    const $paldea = load(pageHTML)
    const category = $paldea('a[title=\'Catégorie\']').parent().next('td').text()
    if (category !== defaultCategory) {
      data.push({
        form: 'paldea',
        categories: [{
          name: category,
          language: 'fr'
        }]
      })
    }
  }
  if ($(`a[title='${name.name} de Hisui']`).length !== 0) {
    const URL = `https://www.pokepedia.fr/${name.name}_de_Hisui`
    const pageHTML = await (await fetch(URL)).text()
    const $hisui = load(pageHTML)
    const category = $hisui('a[title=\'Catégorie\']').parent().next('td').text()
    if (category !== defaultCategory) {
      data.push({
        form: 'hisui',
        categories: [{
          name: category,
          language: 'fr'
        }]
      })
    }
  }
  if ($(`a[title='${name.name} de Galar']`).length !== 0) {
    const URL = `https://www.pokepedia.fr/${name.name}_de_Galar`
    const pageHTML = await (await fetch(URL)).text()
    const $galar = load(pageHTML)
    const category = $galar('a[title=\'Catégorie\']').parent().next('td').text()
    if (category !== defaultCategory) {
      data.push({
        form: 'galar',
        categories: [{
          name: category,
          language: 'fr'
        }]
      })
    }
  }
  return data
}

function getDECategory ($) {
  const data = []
  return data
}

function getESCategory ($) {
  const data = []
  return data
}

function getITCategory ($) {
  const data = []
  return data
}

function getJACategory ($) {
  const data = []
  return data
}

function getZHHANTCategory ($) {
  const data = []
  return data
}

export async function getTranslatedCategory ($, name) {
  switch (name.language) {
    case 'fr':
      return await getFRCategory($, name)
    case 'de':
      return getDECategory($)
    case 'it':
      return getITCategory($)
    case 'es':
      return getESCategory($)
    case 'ja':
      return getJACategory($)
    case 'zh-Hant':
      return getZHHANTCategory($)
  }
  return []
}
