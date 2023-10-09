import React from 'react';
import { Actor } from '@/types/actor';

interface ActorDetailsProps {
  actor: Actor;
}

export default function ActorDetails({ actor }) {
  return (
    <div className="border border-slate-200/10">
      <div>{actor.name}</div>
      <div>{actor.initBonus}</div>
    </div>
  );
}
