import React, { useState } from 'react';

interface Result {
  details: string;
  result: number;
}

const DiceRoller = () => {
  const [command, setCommand] = useState<string>("");
  const [advantage, setAdvantage] = useState<boolean>(false);
  const [disadvantage, setDisadvantage] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);

  const rollDie = (sides: number) => Math.floor(Math.random() * sides) + 1;

  const parseCommand = (command: string) => {
    const parts = command.split('+').map(p => p.trim());
    return parts.map(part => {
      if (part.includes('d')) {
        const [count, sides] = part.split('d').map(n => parseInt(n));
        return { count, sides };
      } else {
        return { count: parseInt(part), sides: null };
      }
    });
  };

  const rollDice = (count: number, sides: number) => {
    const rolls = [];
    for (let i = 0; i < count; i++) {
      if (count === 1 && sides === 20 && (advantage || disadvantage)) {
        const roll1 = rollDie(sides);
        const roll2 = rollDie(sides);
        rolls.push([roll1, roll2]);
      } else {
        rolls.push(rollDie(sides));
      }
    }
    return rolls;
  };

  const executeCommand = () => {
    const parsed = parseCommand(command);
    const detailsList = [];
    let total = 0;
    
    parsed.forEach(instruction => {
      if (instruction.sides) {
        const rolls = rollDice(instruction.count, instruction.sides);
        let sum = 0;
        const rollDetails = rolls.map(roll => {
          if (Array.isArray(roll)) {
            const [roll1, roll2] = roll;
            sum += advantage ? Math.max(roll1, roll2) : Math.min(roll1, roll2);
            return advantage ?
              `(${roll1}, ${roll2}) = (${Math.max(roll1, roll2)})` :
              `(${roll1}, ${roll2}) = (${Math.min(roll1, roll2)})`;
          } else {
            sum += roll;
            return roll;
          }
        });
        detailsList.push(`(${instruction.count}d${instruction.sides}) = (${rollDetails.join(', ')}) = ${sum}`);
        total += sum;
      } else {
        detailsList.push(`${instruction.count}`);
        total += instruction.count;
      }
    });

    const details = `${detailsList.join(' + ')} = ${total}`;
    setResults(prevResults => [...prevResults, { details, result: total }]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} className='text-black' />
        <div>
          <label>
            <input type="radio" value="advantage" checked={advantage} onChange={() => { setAdvantage(true); setDisadvantage(false); }} />
            Advantage
          </label>
          <label>
            <input type="radio" value="disadvantage" checked={disadvantage} onChange={() => { setAdvantage(false); setDisadvantage(true); }} />
          </label>
        </div>
        <button onClick={executeCommand}>Roll</button>
      </div>
      <div>
        {results.map((result, i) => (
          <div key={i}>
            <p>{result.details}</p>
            <p>Result: {result.result}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiceRoller;
