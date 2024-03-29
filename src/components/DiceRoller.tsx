import React, { useState } from 'react';
import Button from '@/components/base/Button';
import { useAblyChannel } from '@/hooks/useAblyChannel';

interface Instruction {
  count: number;
  sides: number | null;
}

interface Result {
  details: string;
  result: number;
}

const DiceRoller: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  const [advantage, setAdvantage] = useState<boolean>(false);
  const [disadvantage, setDisadvantage] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);

  const { messages } = useAblyChannel('chat');

  const rollDie = (sides: number) => Math.floor(Math.random() * sides) + 1;

  const rollDice = (count: number, sides: number): (number | number[])[] => {
    const rolls: (number | number[])[] = [];
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

  const parseCommand = (command: string): Instruction[] => {
    const parts = command.split('+').map((p) => p.trim());
    return parts.map((part) => {
      if (part.includes('d')) {
        const [count, sides] = part.split('d').map((n) => parseInt(n));
        return { count, sides };
      } else {
        return { count: parseInt(part, 10), sides: null };
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Check if Enter was pressed without Shift
      event.preventDefault(); // Prevent a new line from being created in the textarea
      executeCommand();
    }
  };

  const executeCommand = (): void => {
    const parsed = parseCommand(command);
    const detailsList: string[] = [];
    let total = 0;

    parsed.forEach((instruction) => {
      if (instruction.sides) {
        const rolls = rollDice(instruction.count, instruction.sides);
        let sum = 0;
        const rollDetails = rolls.map((roll) => {
          if (Array.isArray(roll)) {
            const [roll1, roll2] = roll;
            sum += advantage ? Math.max(roll1, roll2) : Math.min(roll1, roll2);
            return advantage
              ? `(${roll1}, ${roll2}) = (${Math.max(roll1, roll2)})`
              : `(${roll1}, ${roll2}) = (${Math.min(roll1, roll2)})`;
          } else {
            sum += roll;
            return roll;
          }
        });
        detailsList.push(
          `(${instruction.count}d${instruction.sides}) = (${rollDetails.join(
            ', ',
          )}) = ${sum}`,
        );
        total += sum;
      } else {
        detailsList.push(`${instruction.count}`);
        total += instruction.count;
      }
    });

    const details = `${detailsList.join(' + ')} = ${total}`;
    setResults((prevResults) => [...prevResults, { details, result: total }]);
  };

  return (
    <div className="w-full">
      {/* <div>
        {results.map((result, i) => (
          <div key={i} className="bg">
            <p>{result.details}</p>
            <p>Results: {result.result}</p>
          </div>
        ))}
      </div> */}
      <div
        className="flex items-center justify-between bg-slate-700"
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="px-4 py-2 border rounded-lg text-slate-200 bg-slate-600 border-slate-200/10 w-96"
        />
        <div className="flex flex-col">
          <label className="whitespace-nowrap">
            <input
              type="radio"
              value="advantage"
              checked={advantage}
              onChange={() => {
                setAdvantage(true);
                setDisadvantage(false);
              }}
            />
            Adv
          </label>
          <label className="whitespace-nowrap">
            <input
              type="radio"
              value="advantage"
              checked={!advantage && !disadvantage}
              onChange={() => {
                setAdvantage(false);
                setDisadvantage(false);
              }}
            />
            N/A
          </label>
          <label className="whitespace-nowrap">
            <input
              type="radio"
              value="disadvantage"
              checked={disadvantage}
              onChange={() => {
                setAdvantage(false);
                setDisadvantage(true);
              }}
            />
            Dis
          </label>
        </div>
        <Button className="mx-2" onClick={executeCommand}>
          Roll
        </Button>
      </div>
    </div>
  );
};

export default DiceRoller;
