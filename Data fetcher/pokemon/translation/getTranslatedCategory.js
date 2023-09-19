import { load } from 'cheerio'
import { getFetch } from '../../cached_fetch.js'

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
    const pageHTML = await (await getFetch(URL)).text()
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
    const pageHTML = await (await getFetch(URL)).text()
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
    const pageHTML = await (await getFetch(URL)).text()
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
  const categoryElement = $('a[title=\'Kategorie (Pokémoneigenschaft)\']').parent().next('td')
  if ($(categoryElement).children('br').length === 0) {
    data.push({
      form: 'default',
      categories: [{
        name: $(categoryElement).text(),
        language: 'de'
      }]
    })
  } else {
    let form
    let name
    $(categoryElement).contents().each((index, value) => {
      const text = $(value).text().replace('\n', '')
      if (index % 2 === 0) {
        name = text
      } else {
        if (text === '') {
          form = 'default'
        } else if (text === '(Hisui)') {
          form = 'hisui'
        } else if (text === '(Paldea)') {
          form = 'paldea'
        } else if (text === '(Galar)') {
          form = 'galar'
        }
        data.push({
          form,
          categories: [{
            name,
            language: 'de'
          }]
        })
      }
    })
  }
  return data
}

async function getESCategory ($, name) {
  const data = []
  const defaultCategory = $('a[title=\'Categoría\']').parent().next('td').text()
  data.push({
    form: 'default',
    categories: [{
      name: defaultCategory,
      language: 'es'
    }]
  })
  if ($(`a[title='${name.name.replace('\'', '%27')} de Paldea']`).length !== 0) {
    const URL = `https://www.wikidex.net/wiki/${name.name}_de_Paldea`
    const pageHTML = await (await getFetch(URL)).text()
    const $paldea = load(pageHTML)
    const category = $paldea('a[title=\'Categoría\']').parent().next('td').text()
    if (category !== defaultCategory) {
      data.push({
        form: 'paldea',
        categories: [{
          name: category,
          language: 'es'
        }]
      })
    }
  }
  if ($(`a[title='${name.name.replace('\'', '%27')} de Hisui']`).length !== 0) {
    const URL = `https://www.pokepedia.fr/${name.name}_de_Hisui`
    const pageHTML = await (await getFetch(URL)).text()
    const $hisui = load(pageHTML)
    const category = $hisui('a[title=\'Categoría\']').parent().next('td').text()
    if (category !== defaultCategory) {
      data.push({
        form: 'hisui',
        categories: [{
          name: category,
          language: 'es'
        }]
      })
    }
  }
  if ($(`a[title='${name.name.replace('\'', '%27')} de Galar']`).length !== 0) {
    const URL = `https://www.pokepedia.fr/${name.name}_de_Galar`
    const pageHTML = await (await getFetch(URL)).text()
    const $galar = load(pageHTML)
    const category = $galar('a[title=\'Categoría\']').parent().next('td').text()
    if (category !== defaultCategory) {
      data.push({
        form: 'galar',
        categories: [{
          name: category,
          language: 'es'
        }]
      })
    }
  }
  return data
}

function getITCategory ($) {
  const data = []
  const categories = $('a[title=\'Categoria\']').first().parent().text().split(')')
  if (categories.length === 1) {
    data.push({
      form: 'default',
      categories: [{
        name: categories[0],
        language: 'it'
      }]
    })
  } else {
    let form = 'default'
    for (let i = 0; i < categories.length; i++) {
      if (categories[i] === '') {
        break
      }
      const category = categories[i].split('(')
      if (category[1] === 'Forma di Hisui') {
        form = 'hisui'
      } else if (category[1] === 'Forma di Galar') {
        form = 'galar'
      } else if (category[1] === 'Forma di Paldea') {
        form = 'paldea'
      }
      data.push({
        form,
        categories: [{
          name: category[0],
          language: 'it'
        }]
      })
    }
  }
  return data
}

function getJACategory ($) {
  const data = []
  let defaultCategory
  $('table[class=\'blueinfobox\'] > tbody tr > th:contains("分類")').each((index, value) => {
    let form
    const name = $(value).next().text().replaceAll('\n', '')
    if (index === 0) {
      form = 'default'
      defaultCategory = name
    } else {
      const headerContent = $(value).parent().prev().text().replaceAll('\n', '')
      if (headerContent === 'ヒスイのすがた') {
        form = 'hisui'
      } else if (headerContent === 'ガラルのすがた') {
        form = 'galar'
      } else if (headerContent === 'パルデアのすがた') {
        form = 'paldea'
      }
    }
    if (form === 'default' || name !== defaultCategory) {
      data.push({
        form,
        categories: [{
          name,
          language: 'ja'
        }]
      })
    }
  })
  return data
}

function getZHHANTCategory ($) {
  const data = []
  let defaultCategory
  const formContainer = $('tr[class=\'md-hide\']')
  const formName = []
  $(formContainer).each((index, value) => {
    if (index === 0) {
      formName.push('default')
      return
    }
    const form = $(value).text().trim().replace('\n', '')
    if (form.search('洗翠') !== -1) {
      formName.push('hisui')
    } else if (form.search('帕底亚') !== -1) {
      formName.push('paldea')
    } else if (form.search('伽勒尔') !== -1) {
      formName.push('galar')
    }
  })
  $('a[title=\'分类\']').each((index, value) => {
    if (index >= formContainer.length) {
      return
    }
    const name = $(value).parent().next().text().trim().replace('\n', '')
    if (index === 0) {
      defaultCategory = name
    }
    if (name !== defaultCategory || index === 0) {
      data.push({
        form: formName[index],
        categories: [{
          name,
          language: 'zh-Hant'
        }]
      })
    }
  })
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
      return await getESCategory($, name)
    case 'ja':
      return getJACategory($)
    case 'zh-Hant':
      return getZHHANTCategory($)
  }
  return []
}
