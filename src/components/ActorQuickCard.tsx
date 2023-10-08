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
    <div
      key={actor.name}
      className={classNames(
        `${kaushan.className} flex justify-between mb-8 px-4 py-2 text-2xl font-bold rounded-2xl whitespace-nowrap hover:cursor-pointer shadow hover:shadow-lg `,
        {
          'py-4': isActive,
          'py-1 bg-slate-500': isHovered,
          'py-1': isSelected,
          'py-4 text-green-700 bg-blue-50': index === 0 && actor.friendly,
          'py-1 text-white bg-slate-900 shadow-cyan-500 hover:shadow-cyan-600':
            index !== 0,
          'py-4 text-green-500 text-4xl bg-slate-700 hover:bg-slate-600 shadow-[00px_0px_20px_10px_rgba(0,0,0,0.3)] hover:shadow-[10px_0px_30px_10px_rgba(0,0,0,0.3)] shadow-cyan-300 hover:shadow-cyan-500':
            index === 0,
          'py-1 text-grey-50': index !== 0,
        },
      )}
    >
      {actor.name}
    </div>
  );
}
