function getFormName (formName, baseName) {
  if (formName === baseName) {
    return 'default'
  }
  if (formName.search('Paldean') !== -1) {
    return 'paldea'
  }
  if (formName.search('Hisuian') !== -1) {
    return 'hisui'
  }
  if (formName.search('Galarian') !== -1) {
    return 'galar'
  }
  return formName
}

export function getCategory ($, baseName, translatedCategories) {
  const data = []
  const categoriesSpan = $('td > a[href=\'/wiki/Pok%C3%A9mon_category\'] > span')
  if ($(categoriesSpan).children('span').length === 0) {
    data.push({
      form: 'default',
      categories: [
        {
          name: $(categoriesSpan).text(),
          language: 'en'
        }
      ]
    })
  } else {
    $(categoriesSpan).children('span').each((__, element) => {
      const form = getFormName($(element).attr('title'), baseName)
      data.push({
        form,
        categories: [
          {
            name: `${$(element).text()} Pokémon`,
            language: 'en'
          }
        ]
      })
    })
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < translatedCategories.length; j++) {
      if (data[i].form === translatedCategories[j].form) {
        data[i].categories = [
          ...data[i].categories,
          ...translatedCategories[j].categories
        ]
      }
    }
  }
  console.log(data)
  return data
}
