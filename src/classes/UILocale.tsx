export default interface UILocale {
  locale: string
  home: {
    description: string
    searchPlaceholder: string
    filters: {
      filters: string
      description: string
      types: string
      forms: {
        forms: string
        mega: string
        gigantamax: string
        alolan: string
        galarian: string
        hisuian: string
        paldean: string
        other: string
      }
    }
  }
  pokemonScreen: {
    about: {
      about: string,
      noFlavor: string
      data: {
        data: string
        category: string
        height: string
        weight: string
        catch_rate: string
        base_friendship: string
        growth_rate: string
      }
      abilities: {
        abilities: string
        ability: string,
        hidden: string
      }
      breeding: {
        breeding: string
        gender_ratio: string
        egg_group: string
        genderless: string
      }
    }
    stats: {
      stats: string
      baseStats: {
        baseStats: string,
        hp: string
        attack: string
        defense: string
        spa: string
        spd: string
        speed: string
        total: string
      }
      min: string
      max: string
      infos: string
      types: {
        effectiveness: string,
        infos: string
      }
    }
    evo: {
      evo: string
      chain: string
    }
  }
  settings: {
    settings: string
    language: {
      languages: string
      interface: string
      interfaceDescription: string
      data: string
      dataDescription: string
    }
    credits: {
      credits: string
      nintendo: string
      bulbapedia: string
      pokepedia: string
      flavioFarias: string
    }
    links: {
      links: string
      githubDescription: string
      patreonDescription: string
    }
  }
}
