import React from 'react';
import { Actor } from '@/types/actor';
import classNames from 'classnames';
import { Inter, Kaushan_Script } from 'next/font/google';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface ActorQuickCardProps {
  actor: Actor;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isSelected: boolean;
  handleHpChange: (newHp: number) => void;
}

export default function ActorQuickCard({
  actor,
  index,
  isActive,
  isHovered,
  isSelected,
  handleHpChange,
}: ActorQuickCardProps) {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let newHp;
      const inputVal = (e.target as HTMLInputElement).value.trim();
      if (inputVal.startsWith('+')) {
        const adjustment = parseInt(inputVal.substring(1));
        newHp = actor.stats?.currHp
          ? actor.stats.currHp + adjustment
          : adjustment;
      } else if (inputVal.startsWith('-')) {
        const adjustment = parseInt(inputVal.substring(1));
        newHp = actor.stats?.currHp
          ? actor.stats.currHp - adjustment
          : -adjustment;
      } else {
        newHp = parseInt(inputVal);
      }

      // Ensure newHp doesn't exceed maxHp
      if (actor.stats?.maxHp && newHp > actor.stats.maxHp) {
        newHp = actor.stats.maxHp;
      }

      // Ensure newHp is not negative
      if (newHp < 0) {
        newHp = 0;
      }

      handleHpChange(newHp);
      setInputValue(''); // Clear the input
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update inputValue on user input
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     const newHp = parseInt((e.target as HTMLInputElement).value);
  //     handleHpChange(newHp);
  //     setInputValue(''); // <-- Add this line to clear the input
  //   }
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value); // <-- Add this function to update inputValue on user input
  // };

  return (
    <div>
      <div
        key={actor.name}
        className={classNames(
          `flex justify-between items-center mb-8 px-4 py-2 text-2xl rounded-2xl text-slate-200 hover:bg-slate-500 hover:text-slate-50 whitespace-nowrap hover:cursor-pointer`,
          {
            'py-4 border bg-slate-900 text-cyan-500 text-3xl': isActive,
            'py-1 bg-slate-700 border border-cyan-500': isSelected,
            ' border border-slate-200/10': !isSelected,
          },
        )}
      >
        <div
          className={classNames(
            `${kaushan.className}   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              const newHp = parseInt((e.target as HTMLInputElement).value);
              handleHpChange(newHp);
              setInputValue('');  // <-- Add this line to clear the input
            }
          };
        
          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);  // <-- Add this function to update inputValue on user input
          };`,
            {
              underline: isActive,
            },
          )}
        >
          {actor.name}
        </div>
        <div className="flex">
          <input
            // className={`${inter.className} text-lg text-slate-800 w-12 text-center mr-4 rounded`}
            className={`${inter.className} block w-12 text-center mr-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
            type="text"
            id="changeHp"
            name="changeHp"
            placeholder="HP"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          />
          <div>{actor.stats?.currHp && actor.stats?.currHp}</div>
        </div>
      </div>
    </div>
  );
}
