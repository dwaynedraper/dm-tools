import React from 'react';
import { Actor } from '@/types/actor';
import { Inter, Kaushan_Script } from 'next/font/google';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface ActorDetailsProps {
  actor: Actor;
}

export default function ActorDetails({ actor }) {
  console.log('actor', actor);
  return (
    <div className="p-8">
      <div
        className={`${kaushan.className} pb-4 text-5xl border-b border-slate-200/10`}
      >
        {actor.name}
      </div>
      <div className={`${inter.className} flex justify-between`}>
        <div>Initiative</div>
        <div>
          {actor.stats.initiative ? actor.stats.initiative : 14} (
          {actor.stats.initBonus} bonus)
        </div>
      </div>
      <div className={`${inter.className} flex justify-between`}>
        <div>Armor Class</div>
        <div>{actor.stats.ac}</div>
      </div>
      <div className={`${inter.className} flex justify-between`}>
        <div>Hit Points</div>
        <div>
          {actor.stats.currHp} / {actor.stats.maxHp}&nbsp; (
          {((actor.stats.currHp / actor.stats.maxHp) * 100).toFixed(1)}%)
        </div>
      </div>
      <div>Another</div>
    </div>
  );
}
