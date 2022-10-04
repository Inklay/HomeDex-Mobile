import Pokedex from 'pokedex-promise-v2'
import fs from 'fs'

const p = new Pokedex()
const data = {
  pokemon: [],
  types: [],
  egg_groups: [],
  stats: [],
  abilities: []
}

console.log('Fetching egg groups data...')
for (let i = 0; i < 15; i++) {
  const g = await p.getEggGroupByName(i + 1)
  let egg_group = []
  for (let j = 0; j < g.names.length; j++)
    egg_group.push({
      name: g.names[j].name,
      language: g.names[j].language.name
    })
  data.egg_groups.push(egg_group)
}
console.log('Egg groups data fetched !')

console.log('Fetching types data...')
for (let i = 0; i < 18; i++) {
  const t = await p.getTypeByName(i + 1)
  let type = []
  for (let j = 0; j < t.names.length; j++)
    type.push({
      name: t.names[j].name,
      language: t.names[j].language.name
    })
  data.types.push(type)
}
console.log('Types data fetched !')

console.log('Fetching abilities data...')
const abilities = await p.getAbilitiesList()
for (let i = 0; i < abilities.count; i++) {
  if ((i + 1) % 100 == 0 && i != 0)
    console.log(`${i + 1} abilities fetched out of ${abilities.count}`)
  const a = await p.getAbilityByName(abilities.results[i].url.substring(34).slice(0, -1))
  let ability = []
  for (let j = 0; j < a.names.length; j++)
    ability.push({
      name: a.names[j].name,
      language: a.names[j].language.name
    })
  data.abilities.push(ability)
}
console.log('Abilities data fetched !')

console.log('Fetching pokémon data...')
const species = await p.getPokemonSpeciesList()
for (let i = 0; i < species.count; i++) {
  if ((i + 1) % 100 == 0 && i != 0)
    console.log(`${i + 1} pokémon fetched out of ${species.count}`)
  const s = await p.getPokemonSpeciesByName(i + 1)
  const categories = []
  const names = []
  const pokedex_numbers = []
  const egg_groups = []
  const flavor_texts= []
  for (let j = 0; j < s.egg_groups.length; j++)
    egg_groups.push(parseInt(s.egg_groups[j].url.substring(36).slice(0, -1)))
  for (let j = 0; j < s.genera.length; j++)
    categories.push({
      name: s.genera[j].genus,
      language: s.genera[j].language.name
    })
  for (let j = 0; j < s.names.length; j++)
    names.push({
      name: s.names[j].name,
      language: s.names[j].language.name
    })
  for (let j = 0; j < s.pokedex_numbers.length; j++)
    pokedex_numbers.push({
      name: s.pokedex_numbers[j].pokedex.name,
      number: s.pokedex_numbers[j].entry_number
    })
  for (let j = s.flavor_text_entries.length - 1; j > 0; j--) {
    const idx = flavor_texts.findIndex(t => t.game === s.flavor_text_entries[j].version.name)
    if (idx === -1)
      flavor_texts.push({
        game: s.flavor_text_entries[j].version.name,
        texts: [{
          language: s.flavor_text_entries[j].language.name,
          name: s.flavor_text_entries[j].flavor_text
        }]
      })
    else
      flavor_texts[idx].texts.push({
        language: s.flavor_text_entries[j].language.name,
        name: s.flavor_text_entries[j].flavor_text
      })
  }
  const tempData = {
    base_friendship: s.base_happiness,
    capture_rate: s.capture_rate,
    egg_groups: egg_groups,
    gender_rate: s.gender_rate,
    categories: categories,
    growth_rate: s.growth_rate.name,
    has_gender_difference: s.has_gender_differences,
    id: s.id,
    names: names,
    pokedex_numbers: pokedex_numbers,
    flavor_texts: flavor_texts
  }
  for (let j = 0; j < s.varieties.length; j++) {
    const pokemonData = {...tempData}
    const v = await p.getPokemonByName(s.varieties[j].pokemon.name)
    const types = []
    const stats = []
    const abilities = []
    for (let k = 0; k < v.types.length; k++)
      types.push(parseInt(v.types[k].type.url.substring(31).slice(0, -1)))
    for (let k = 0; k < 6; k++)
      stats.push({
        base: v.stats[k].base_stat,
        effort: v.stats[k].effort,
        stat: k + 1
      })
    for (let k = 0; k < v.abilities.length; k++)
      abilities.push({
        is_hidden: v.abilities[k].is_hidden,
        ability: parseInt(v.abilities[k].ability.url.substring(34).slice(0, -1))
      })
    pokemonData.is_default = s.varieties[j].is_default
    pokemonData.height = (v.height / 10)
    pokemonData.weight = (v.weight / 10)
    pokemonData.types = types
    pokemonData.abilities = abilities
    pokemonData.sprite = v.sprites.other['official-artwork'].front_default
    if (v.sprites.other['official-artwork'].front_default === null)
      pokemonData.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`
    if (v.forms.length > 0 && !pokemonData.is_default) {
      const f = await p.getPokemonFormByName(v.forms[0].url.substring(39).slice(0, -1))
      const names = []
      if (f.names.length > 0) {
        for (let k = 0; k < f.names.length; k++)
        names.push({
          name: f.names[k].name,
          language: f.names[k].language.name
        })
        pokemonData.names = names
      }
      pokemonData.form_name = f.form_name
    } else
      pokemonData.form_name = ''
    
    data.pokemon.push(pokemonData)
  }
}
console.log('Pokémon data fetched !')

console.log('Writing to file...')
fs.writeFileSync('../assets/data/data.json', JSON.stringify(data))
console.log('Wrote data to data.json !')
