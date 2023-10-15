import React, { useState } from 'react';
import { Actor } from '@/types/actor';
import { Inter, Kaushan_Script } from 'next/font/google';
import {
  GiFocusedLightning,
  GiHealthNormal,
  GiHearts,
  GiCheckedShield,
  GiSkullCrossedBones,
} from 'react-icons/gi';
import classNames from 'classnames';
import Button from './base/Button';
import ConditionSelect from '@/components/ConditionSelect';
import ColorSelect from '@/components/ColorSelect';
import ColorBadge from '@/components/ColorBadge';
import { Color } from '@/types/colors';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface ActorDetailsProps {
  actor: Actor;
}

interface ConditionObj {
  condition: string;
  color: string;
}

export default function ActorDetails({
  actor,
}: ActorDetailsProps): React.ReactElement {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeConditions, setActiveConditions] = useState<ConditionObj[]>([]);

  // Handler for the "Add Condition" button
  const handleAddCondition = () => {
    if (selectedCondition && selectedColor) {
      setActiveConditions([
        ...activeConditions,
        { condition: selectedCondition, color: selectedColor },
      ]);
      setSelectedCondition(''); // Reset selected condition and color
      setSelectedColor('');
    }
  };

  console.log('actor', actor);
  return (
    <>
      <div className="max-w-4xl p-8 rounded shadow bg-slate-700 shadow-cyan-500 hover:shadow-lg hover:shadow-cyan-500">
        <div className="flex">
          <div
            className={classNames(
              `${kaushan.className} flex items-center text-5xl`,
              {
                'text-cyan-500': actor.friendly,
                'text-red-500': !actor.friendly,
              },
            )}
          >
            <img
              className="w-24 h-24 mx-auto border-2 rounded-full border-slate-200"
              src={'/human_fighter.webp'}
              alt=""
            />
            {actor.name}
            &nbsp;
            {actor.info?.race && actor.info?.class && '-'}
            &nbsp;
            {actor.info?.race &&
              actor.info?.class &&
              actor.info.race + ' ' + actor.info.class}
          </div>
        </div>
        <hr className="my-4" />
        <div className="px-4">
          <div className={`${kaushan.className} text-3xl mb-4`}>
            Active Conditions
          </div>
          <div className="flex flex-wrap">
            {activeConditions.map((conditionObj, index) => (
              <ColorBadge
                key={index}
                condition={conditionObj.condition}
                cardColor={conditionObj.color}
              />
            ))}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex p-4">
          <div className="flex flex-col w-1/2">
            <div className="flex items-center mb-2">
              <GiFocusedLightning className="w-6 h-6 mr-8" />
              <div>
                {actor.stats?.initiative && actor.stats.initiative} (&nbsp;
                {actor.stats?.initiative &&
                  actor.stats?.initBonus &&
                  actor.stats.initiative - actor.stats?.initBonus}
                &nbsp;+&nbsp;
                {actor.stats?.initBonus} DEX&nbsp;)
              </div>
            </div>
            <div className="flex items-center">
              {actor.friendly ? (
                <>
                  <GiHearts className="w-6 h-6 mr-8 text-green-600" />
                  <div>Friendly</div>
                </>
              ) : (
                <>
                  <GiSkullCrossedBones className="w-6 h-6 mr-8 text-red-600" />
                  <div>Unfriendly</div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex items-center mb-2">
              <GiHealthNormal className="w-6 h-6 mr-8" />
              <div>
                {actor.stats &&
                actor.stats.currHp !== undefined &&
                actor.stats.maxHp !== undefined ? (
                  <>
                    {actor.stats.currHp} / {actor.stats.maxHp}&nbsp; (&nbsp;
                    {((actor.stats.currHp / actor.stats.maxHp) * 100).toFixed(
                      1,
                    )}
                    %&nbsp;)
                  </>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            <div className="flex items-center">
              <GiCheckedShield className="w-6 h-6 mr-8" />
              <div>{actor.stats && actor.stats.ac}</div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="px-4">{actor.description && actor.description}</div>
        <hr className="my-4" />
        <div className="flex items-center p-4">
          <ConditionSelect
            value={selectedCondition}
            onChange={setSelectedCondition}
          />
          <ColorSelect value={selectedColor} onChange={setSelectedColor} />
          <Button
            rounded={true}
            className="whitespace-nowrap"
            onClick={handleAddCondition}
          >
            Add Condition
          </Button>
        </div>
      </div>
    </>
  );
}
