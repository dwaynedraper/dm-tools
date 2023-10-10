import React from 'react';
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

const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface ActorDetailsProps {
  actor: Actor;
}

export default function ActorDetails({ actor }) {
  console.log('actor', actor);
  return (
    <>
      <div className="p-8 rounded bg-slate-700">
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
              className="w-16 h-16 mx-auto border-2 rounded-full border-slate-200"
              src={'/human_fighter.webp'}
              alt=""
            />
            {actor.name}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <div className="flex items-center mb-2">
              <GiFocusedLightning className="w-6 h-6 mr-8" />
              <div>
                {actor.stats.initiative && actor.stats.initiative} (
                {actor.stats.initiative - actor.stats.initBonus}&nbsp;+&nbsp;
                {actor.stats.initBonus} DEX)
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
                {actor.stats.currHp} / {actor.stats.maxHp}&nbsp; (
                {((actor.stats.currHp / actor.stats.maxHp) * 100).toFixed(1)}%)
              </div>
            </div>
            <div className="flex items-center">
              <GiCheckedShield className="w-6 h-6 mr-8" />
              <div>{actor.stats.ac}</div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div>{actor.description && actor.description}</div>
      </div>
    </>
  );
}
