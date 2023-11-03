// React/Next imports
import React, { useEffect, useState } from 'react';

// Component imports
import Button from '@/components/base/Button';

// Other imports
import { useAblyChannel } from '@/hooks/useAblyChannel';
import { Actor } from '@/types/actor';
import classNames from 'classnames';
import { FaRegTrashCan } from 'react-icons/fa6';
import { GiCheckedShield, GiSkullCrossedBones } from 'react-icons/gi';
import * as Yup from 'yup';

import { Inter, Kaushan_Script } from 'next/font/google';
import { setIn } from 'formik';
const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface ActorQuickCardProps {
  actor: Actor;
  index: number;
  isEncounterActive: boolean;
  isActive: boolean;
  isSelected: boolean;
  handleHpChange: (newHp: number) => void;
  handleDelete: (id: string) => void;
  handleInitChange: (newInit: number, actorName: string) => void;
}

export default function ActorQuickCard({
  actor,
  isEncounterActive,
  isActive,
  isSelected,
  handleHpChange,
  handleInitChange,
  handleDelete,
}: ActorQuickCardProps) {
  const [hpValue, setHpValue] = useState(0);
  const [hpError, setHpError] = useState('');
  const [initValue, setInitValue] = useState(0);
  const [initError, setInitError] = useState('');

  const { sendMessage } = useAblyChannel('chat');

  const initSchema = Yup.object().shape({
    initValue: Yup.number()
      .required()
      .min(0, 'Must be a number between 1 and 20')
      .max(20, 'Must be a number between 1 and 20'),
  });

  const hpSchema = Yup.object().shape({
    hpValue: Yup.string()
      .required('HP is required')
      .matches(
        /^\+?\-?\d+$/,
        'HP must be a number or a signed number (e.g. 45, +10 or -5)',
      ),
  });

  useEffect(() => {
    if (isEncounterActive) {
      setHpError('');
      setInitError('');
    }
  }, [isEncounterActive]);

  const validateInput = async (
    schema: Yup.Schema,
    value: any,
    setError: (error: string) => void,
    onSuccess: () => void, // New parameter: callback to run on success
  ) => {
    try {
      await schema.validate(value);
      setError('');
      onSuccess(); // Call onSuccess callback if validation succeeds
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setError(error.message);
      } else {
        console.error('An unknown error occurred: ', error);
      }
    }
  };

  const submitInit = () => {
    validateInput(initSchema, { initValue }, setInitError, () => {
      // Define what to do on success
      handleInitChange(
        initValue + (actor.stats?.initBonus ? actor.stats.initBonus : 0),
        actor.name,
      );
      setInitValue(0); // Clear the input
    });
  };

  const rollInit = async () => {
    await validateInput(initSchema, { initValue }, setInitError, () => {
      // Define what to do on success
      let newInit = Math.floor(Math.random() * 20) + 1;
      if (!initError) {
        let newInit = Math.floor(Math.random() * 20) + 1;
        // Ensure initBonus is a number before adding to newInit
        const initBonus = actor.stats?.initBonus
          ? parseInt(actor.stats.initBonus.toString())
          : 0;
        newInit += initBonus;
        handleInitChange(newInit, actor.name);
        setInitValue(0); // Clear the input
        const messageText = `${
          actor.name
        } rolled a ${newInit} for initiative! ${
          newInit - actor.stats!.initBonus!
        } + ${actor.stats!.initBonus} ${
          newInit > 20
            ? 'Critical Success!'
            : newInit === 1
            ? 'Critical Failure!'
            : ''
        }`;
        sendMessage(messageText);
      }
    });
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
      setHpValue(0); // Clear the input
    }
  };

  const updateInit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const intValue = parseInt(value);

    if (isNaN(intValue) || intValue === 0) {
      setInitError('Please enter a number between 1 and 20.');
      setInitValue(0); // Reset initValue to 0 if input is not a number or is 0
    } else if (intValue > 20) {
      setInitError('Value cannot exceed 20.');
    } else {
      setInitError(''); // Clear any previous error
      setInitValue(intValue); // Update initValue only if it's a valid number and <= 20
    }
  };

  const updateHp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isSigned = value.startsWith('+') || value.startsWith('-');
    const cleanedValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters except for + and -
    const intValue = parseInt(cleanedValue);

    if (isNaN(intValue) || (intValue === 0 && !isSigned)) {
      setHpError('Please follow one of these: 45, +10 or -5');
      setHpValue(0); // Reset hpValue to 0 if input is not a valid number
    } else {
      setHpError(''); // Clear any previous error
      setHpValue(
        isSigned ? (value.startsWith('+') ? +intValue : -intValue) : intValue,
      ); // Preserve the sign if present
    }
  };

  const confirmDelete = (id: string) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this actor?',
    );
    if (userConfirmed) {
      handleDelete(id);
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <div>
      <div
        key={actor.name}
        className={classNames(
          `flex flex-col justify-between items-center mb-8 pl-4 pr-1 py-2 text-2xl rounded-xl text-slate-200 hover:bg-slate-500 hover:text-slate-50 whitespace-nowrap hover:cursor-pointer hover:shadow-lg hover:shadow-cyan-500`,
          {
            'py-4 border bg-slate-900 text-cyan-500 text-3xl': isActive,
            'py-1 bg-slate-700 border border-cyan-500': isSelected,
            ' border border-slate-200/10': !isSelected,
          },
        )}
      >
        <div className="flex items-center justify-between w-full">
          {/* Actor Name */}
          <div
            className={classNames(
              `${kaushan.className} overflow-hidden text-ellipsis w-36 white flex items-center h-6`,
              {
                underline: isActive,
                'text-red-600': actor.stats?.currHp === 0,
              },
            )}
          >
            {actor.friendly ? (
              <span className="w-6 h-6 mr-1">
                <GiCheckedShield className=" text-cyan-500" />
              </span>
            ) : (
              <span className="w-6 h-6 mr-1">
                <GiSkullCrossedBones className="w-6 h-6 mr-1 text-red-600" />
              </span>
            )}
            {actor.name}
          </div>

          {/* Inputs */}
          <div className="flex items-center justify-end w-full">
            {!isEncounterActive && !actor.stats?.initiative && (
              <>
                <label htmlFor="setInit" className="text-base">
                  Init:
                </label>
                <div className="flex items-center">
                  <input
                    className={`${inter.className} block w-12 text-center mx-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                    type="text"
                    id="setInit"
                    name="setInit"
                    placeholder="Init"
                    value={initValue}
                    onKeyDown={handleKeyDown}
                    onChange={updateInit}
                    onFocus={handleFocus}
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
        {hpError && (
          <div className="flex-wrap mt-1 text-sm error-message">{hpError}</div>
        )}
        {initError && (
          <div className="flex-wrap mt-1 text-sm error-message">
            {initError}
          </div>
        )}
      </div>
    </div>
  );
}
