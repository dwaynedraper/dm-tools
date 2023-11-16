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
import Image from 'next/image';

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
            <Image
              className="w-24 h-24 mx-auto border-2 rounded-full border-slate-200"
              src={'/human_fighter.webp'}
              alt=""
              height={96}
              width={96}
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
              <div className="flex items-center w-12 h-6 mr-8">
                <GiFocusedLightning className="w-6 h-6 text-blue-600" />
                &nbsp;Init
              </div>
              <div>
                <span className="text-2xl">
                  {actor.stats?.initiative && actor.stats.initiative}&nbsp;
                </span>
                (&nbsp;
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
                  <div className="flex items-center w-12 h-6 mr-8">
                    <GiHearts className="justify-start w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl">Friendly</div>
                </>
              ) : (
                <>
                  <GiSkullCrossedBones className="w-12 h-6 mr-8 text-red-600" />
                  <div>Unfriendly</div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex items-center mb-2">
              <div className="flex items-center w-12 h-6 mr-8">
                <GiHealthNormal className="w-6 h-6 text-green-500" />
                &nbsp;HP
              </div>
              <div>
                {actor.stats &&
                actor.stats.currHp !== undefined &&
                actor.stats.maxHp !== undefined ? (
                  <>
                    <span className="text-2xl">{actor.stats.currHp}</span> /{' '}
                    {actor.stats.maxHp}&nbsp; (&nbsp;
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
              <div className="flex items-center w-12 h-6 mr-8">
                <GiCheckedShield className="w-6 h-6 text-blue-600" />
                &nbsp;AC
              </div>
              <div className="text-2xl">{actor.stats && actor.stats.ac}</div>
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
