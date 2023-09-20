export function getFRGameName (gameName) {
  const games = []
  if (gameName.search('Rouge') !== -1 && gameName.search('Rouge Feu') === -1) {
    games.push('Red')
  }
  if (gameName.search('Bleu') !== -1) {
    games.push('Blue')
  }
  if (gameName.search('Jaune') !== -1) {
    games.push('Yellow')
  }
  if (gameName.search('Or') !== -1 && gameName.search('Or HeartGold') === -1) {
    games.push('Gold')
  }
  if (gameName.search('Argent') !== -1 && gameName.search('Argent SoulSilver') === -1) {
    games.push('Silver')
  }
  if (gameName.search('Cristal') !== -1) {
    games.push('Crystal')
  }
  if (gameName.search('Rubis') !== -1 && gameName.search('Rubis Oméga') === -1) {
    games.push('Ruby')
  }
  if (gameName.search('Saphir') !== -1 && gameName.search('Saphir Alpha') === -1) {
    games.push('Sapphire')
  }
  if (gameName.search('Émeraude') !== -1) {
    games.push('Emerald')
  }
  if (gameName.search('Rouge Feu') !== -1) {
    games.push('Firered')
  }
  if (gameName.search('Vert Feuille') !== -1) {
    games.push('Leafgreen')
  }
  if (gameName.search('Diamant') !== -1 && gameName.search('Diamant Étincelant') === -1) {
    games.push('Diamond')
  }
  if (gameName.search('Perle') !== -1 && gameName.search('Perle Scintillante') === -1) {
    games.push('Pearl')
  }
  if (gameName.search('Platine') !== -1) {
    games.push('Platinum')
  }
  if (gameName.search('Or HeartGold') !== -1) {
    games.push('HeartGold')
  }
  if (gameName.search('Argent SoulSilver') !== -1) {
    games.push('SoulSilver')
  }
  if (gameName.search('Noir') !== -1 && gameName.search('Noir 2') === -1) {
    games.push('Black')
  }
  if (gameName.search('Blanc') !== -1 && gameName.search('Blanc 2') === -1) {
    games.push('White')
  }
  if (gameName.search('Noir 2') !== -1) {
    games.push('Black 2')
  }
  if (gameName.search('Blanc 2') !== -1) {
    games.push('White 2')
  }
  if (gameName.search('X') !== -1) {
    games.push('X')
  }
  if (gameName.search('Y') !== -1) {
    games.push('Y')
  }
  if (gameName.search('Rubis Oméga') !== -1) {
    games.push('Omega Ruby')
  }
  if (gameName.search('Saphir Alpha') !== -1) {
    games.push('Alpha Sapphire')
  }
  if (gameName.search('Soleil') !== -1 && gameName.search('Ultra-Soleil') === -1) {
    games.push('Sun')
  }
  if (gameName.search('Lune') !== -1 && gameName.search('Ultra-Lune') === -1) {
    games.push('Moon')
  }
  if (gameName.search('Ultra-Soleil') !== -1) {
    games.push('Ultra Sun')
  }
  if (gameName.search('Ultra-Lune') !== -1) {
    games.push('Ultra Moon')
  }
  if (gameName.search('Let\'s Go, Pikachu') !== -1) {
    games.push('Let\'s Go Pikachu')
  }
  if (gameName.search('Let\'s Go, Évoli') !== -1) {
    games.push('Let\'s Go Eevee')
  }
  if (gameName.search('Épée') !== -1) {
    games.push('Sword')
  }
  if (gameName.search('Bouclier') !== -1) {
    games.push('Shield')
  }
  if (gameName.search('Diamant Étincelant') !== -1) {
    games.push('Brilliant Diamond')
  }
  if (gameName.search('Perle Scintillante') !== -1) {
    games.push('Shining Pearl')
  }
  if (gameName.search(': Arceus') !== -1) {
    games.push('Legends: Arceus')
  }
  if (gameName.search('Écarlate') !== -1) {
    games.push('Scarlet')
  }
  if (gameName.search('Violet') !== -1) {
    games.push('Violet')
  }
  return games
}
