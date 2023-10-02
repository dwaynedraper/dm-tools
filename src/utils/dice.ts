type Roll = [number, number]

function rollDie(numSides: number): number {
  return Math.floor(Math.random() * numSides) + 1
}

function diceRoller(
  numDice: number,
  numSides: number,
): { numbersRolled: number[]; total: number } {
  let total = 0
  let numbersRolled: number[] = []
  for (let i = 0; i < numDice; i++) {
    let roll = rollDie(numSides)
    numbersRolled.push(roll)
    total += roll
  }
  return { numbersRolled, total }
}

function stringParser(stringInput: string): { rolls: Roll[]; bonus: number } {
  // RegEx check
  if (!/^[1-9d+\s]+$/.test(stringInput)) {
    throw new Error('Invalid characters in input string.')
  }

  // Remove all whitespace
  stringInput = stringInput.replace(/\s/g, '')

  // Split string into parts
  let parts = stringInput.split('+')

  let rolls: Roll[] = []
  let bonus = 0

  for (let part of parts) {
    if (part.includes('d')) {
      // It's a roll
      let [numDice, numSides] = part.split('d').map(Number)
      rolls.push([numDice, numSides])
    } else {
      // It's a bonus
      bonus += Number(part)
    }
  }

  return { rolls, bonus }
}

function complexRoller({ rolls, bonus }: { rolls: Roll[]; bonus: number }): {
  rollResults: { numbersRolled: number[]; total: number }[]
  bonus: number
} {
  let rollResults = rolls.map(([numDice, numSides]) =>
    diceRoller(numDice, numSides),
  )
  return { rollResults, bonus }
}
