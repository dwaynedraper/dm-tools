// React/Next imports
import React from 'react';

// Component imports
import Button from '@/components/base/Button';

// Other imports
import { Actor } from '@/types/actor';
import classNames from 'classnames';
import { FaRegTrashCan } from 'react-icons/fa6';

import { Inter, Kaushan_Script } from 'next/font/google';
import { GiCheckedShield, GiSkullCrossedBones } from 'react-icons/gi';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface ActorQuickCardProps {
  actor: Actor;
  index: number;
  isEncounterActive: boolean;
  isActive: boolean;
  isHovered: boolean;
  isSelected: boolean;
  handleHpChange: (newHp: number) => void;
  handleDelete: (id: string) => void;
  handleInitChange: (newInit: number, actorName: string) => void;
}

export default function ActorQuickCard({
  actor,
  index,
  isEncounterActive,
  isActive,
  isHovered,
  isSelected,
  handleHpChange,
  handleInitChange,
  handleDelete,
}: ActorQuickCardProps) {
  const [hpValue, setHpValue] = React.useState('');
  const [initValue, setInitValue] = React.useState(0);

  const submitInit = () => {
    handleInitChange(
      initValue + (actor.stats?.initBonus ? actor.stats.initBonus : 0),
      actor.name,
    );
    setInitValue(0); // Clear the input
  };

  const rollInit = () => {
    let newInit = Math.floor(Math.random() * 20) + 1;
    // Ensure initBonus is a number before adding to newInit
    const initBonus = actor.stats?.initBonus
      ? parseInt(actor.stats.initBonus.toString())
      : 0;
    newInit += initBonus;
    handleInitChange(newInit, actor.name);
    setInitValue(0); // Clear the input
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isEncounterActive && e.key === 'Enter') {
      let newInit = parseInt((e.target as HTMLInputElement).value.trim());
      newInit += actor.stats?.initBonus ? actor.stats.initBonus : 0;
      handleInitChange(newInit, actor.name);
      setInitValue(0); // Clear the input
    }

    if (isEncounterActive && e.key === 'Enter') {
      let newHp: number;
      // Get the value of the input
      const inputVal = (e.target as HTMLInputElement).value.trim();
      // If the input starts with a + or -, adjust the hp by that amount
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
      setHpValue(''); // Clear the input
    }
  };

  const updateHp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHpValue(e.target.value); // Update hpValue on user input
  };

  const updateInit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitValue(parseInt(e.target.value)); // Update initValue on user input
  };

  const confirmDelete = (id: string) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this actor?',
    );
    if (userConfirmed) {
      handleDelete(id);
    }
  };

  return (
    <div>
      <div
        key={actor.name}
        className={classNames(
          `flex justify-between items-center mb-8 pl-4 pr-1 py-2 text-2xl rounded-2xl text-slate-200 hover:bg-slate-500 hover:text-slate-50 whitespace-nowrap hover:cursor-pointer`,
          {
            'py-4 border bg-slate-900 text-cyan-500 text-3xl': isActive,
            'py-1 bg-slate-700 border border-cyan-500': isSelected,
            ' border border-slate-200/10': !isSelected,
          },
        )}
      >
        <div
          className={classNames(
            `${kaushan.className} text-ellipsis overflow-hidden w-36 white flex items-center`,
            {
              underline: isActive,
            },
          )}
        >
          {actor.friendly ? (
            <GiCheckedShield className="w-4 h-4 mr-1 text-cyan-500" />
          ) : (
            <GiSkullCrossedBones className="w-4 h-4 mr-1 text-red-600" />
          )}
          {actor.name}
        </div>
        <div className="flex items-center">
          {!isEncounterActive && !actor.stats?.initiative && (
            <>
              <label htmlFor="setInit" className="text-base">
                Init:
              </label>
              <div className="flex flex-col items-center">
                <input
                  // className={`${inter.className} text-lg text-slate-800 w-12 text-center mr-4 rounded`}
                  className={`${inter.className} block w-12 text-center mx-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                  type="text"
                  id="setInit"
                  name="setInit"
                  placeholder="Init"
                  value={initValue}
                  onKeyDown={handleKeyDown}
                  onChange={updateInit}
                />
                {initValue !== 0 && (
                  <Button size={'small'} rounded={true} onClick={submitInit}>
                    Accept
                  </Button>
                )}
                {initValue === 0 && (
                  <Button size={'small'} rounded={true} onClick={rollInit}>
                    Roll
                  </Button>
                )}
              </div>
            </>
          )}
          {isEncounterActive && (
            <>
              <input
                // className={`${inter.className} text-lg text-slate-800 w-12 text-center mr-4 rounded`}
                className={`${inter.className} block w-12 text-center mr-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                type="text"
                id="changeHp"
                name="changeHp"
                placeholder="HP"
                value={hpValue}
                onKeyDown={handleKeyDown}
                onChange={updateHp}
              />
              <div className="flex items-center">
                <div>{actor.stats?.currHp && actor.stats?.currHp}</div>
              </div>
            </>
          )}
          <FaRegTrashCan
            className="w-4 h-4 ml-2 text-slate-500"
            onClick={() => {
              confirmDelete(actor._id || '');
            }}
          />
        </div>
      </div>
    </div>
  );
}
