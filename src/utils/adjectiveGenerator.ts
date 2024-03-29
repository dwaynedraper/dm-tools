export default function generateAdjective(): string {
  const adjectives = [
    'Angry',
    'Sly',
    'Reckless',
    'Stoic',
    'Fierce',
    'Quiet',
    'Loud',
    'Vicious',
    'Ruthless',
    'Cunning',
    'Savage',
    'Wild',
    'Tame',
    'Merciless',
    'Brutal',
    'Harsh',
    'Relentless',
    'Raging',
    'Furious',
    'Vengeful',
    'Pitiless',
    'Malevolent',
    'Malicious',
    'Bitter',
    'Hostile',
    'Aggressive',
    'Threatening',
    'Mighty',
    'Powerful',
    'Dominant',
    'Fearless',
    'Bold',
    'Daring',
    'Dauntless',
    'Lethal',
    'Deadly',
    'Dire',
    'Dreadful',
    'Terrifying',
    'Menacing',
    'Sinister',
    'Dark',
    'Gloomy',
    'Morose',
    'Sullen',
    'Sour',
    'Gruff',
    'Grim',
    'Forbidding',
    'Intimidating',
    'Overbearing',
    'Ominous',
    'Foreboding',
    'Doomed',
    'Pernicious',
    'Destructive',
    'Hazardous',
    'Perilous',
    'Treacherous',
    'Precarious',
    'Dangerous',
    'Nefarious',
    'Devious',
    'Tricky',
  ];

  const randomIndex = Math.floor(Math.random() * adjectives.length);
  return adjectives[randomIndex];
}

// Usage
const randomAdjective = generateAdjective();
