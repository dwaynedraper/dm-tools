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
}

export default function ActorQuickCard({
  actor,
  index,
  isActive,
  isHovered,
  isSelected,
}: ActorQuickCardProps) {
  return (
    <div>
      <div
        key={actor.name}
        className={classNames(
          `${kaushan.className}
        flex justify-between items-center mb-8 px-4 py-2 text-2xl font-bold rounded-2xl text-slate-200 hover:bg-slate-500 hover:text-slate-50 whitespace-nowrap hover:cursor-pointer`,
          {
            'py-4 border bg-slate-900 text-cyan-500 text-3xl underline':
              isActive,
            'py-1 bg-slate-700 border border-cyan-500': isSelected,
            ' border border-slate-200/10': !isSelected,
          },
        )}
      >
        <div>{actor.name}</div>
        <div>{actor.stats?.currHp && actor.stats?.currHp}</div>
      </div>
    </div>
  );
}
