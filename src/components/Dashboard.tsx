import React from 'react';
import { Kaushan_Script } from 'next/font/google';
import { IoAddCircle, IoAddCircleOutline } from 'react-icons/io5';

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

const party = [
  {
    name: 'Haldal Lightfoot',
    role: 'Halfling Rogue',
    imageUrl: '/halfling_rogue.jpg',
  },

  {
    name: 'Magric Stonefist',
    role: 'Dwarven Cleric',
    imageUrl: '/dwarven_cleric.jpg',
  },

  {
    name: 'Alaethiel Esteres',
    role: 'Human Fighter',
    imageUrl: 'human_fighter.webp',
  },
];

const Party = () => {
  return (
    <div className="flex flex-col items-center py-8 mx-auto max-w-7xl lg:px-8 bg-slate-900/10">
      <div className="max-w-2xl mx-auto lg:mx-0">
        <h2
          className={`${kaushan.className} text-5xl font-bold tracking-tight text-slate-200 sm:text-4xl`}
        >
          Your Party
        </h2>
      </div>
      <ul
        role="list"
        className="flex items-center max-w-2xl mx-auto mt-12 text-center gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none "
      >
        {party.map((person) => (
          <li
            key={person.name}
            className="p-4 cursor-pointer rounded-xl bg-slate-900/20 hover:shadow-lg hover:shadow-teal-500"
          >
            <img
              className="mx-auto rounded-full shadow-lgw-36 h-36 shadow-cyan-300"
              src={person.imageUrl}
              alt=""
            />
            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-slate-200">
              {person.name}
            </h3>
            <p className="text-sm leading-6 text-slate-400">{person.role}</p>
          </li>
        ))}
        <li className="p-4 cursor-pointer rounded-xl bg-slate-900/20 hover:shadow-lg hover:shadow-teal-500">
          <IoAddCircleOutline className="rounded-full cursor-pointer h-36 w-36 hover:shadow-lg hover:shadow-teal-500" />
        </li>
      </ul>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="h-full pt-8 space-y-8 overflow-y-auto bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800">
      <div
        className={`${kaushan.className} text-6xl mx-auto text-center text-cyan-400`}
      >
        Dashboard
      </div>
      <Party />
      <Party />
      <Party />
      <Party />
    </div>
  );
}
