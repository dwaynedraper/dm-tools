// React/Next imports
import React, { useEffect, useState } from 'react';

// Component imports
import AddActorForm from '@/components/AddActorForm';
import ActorQuickCard from '@/components/ActorQuickCard';

// Other imports
import styles from '@/styles/Tracker.module.scss';
import { Actor } from '@/types/actor';
import classNames from 'classnames';
import { Bungee_Spice, Inter, Kaushan_Script } from 'next/font/google';
import { Button } from '@/components/base/Button';
import ActorDetails from './ActorDetails';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const spice = Bungee_Spice({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface TrackerProps {
  data: any;
  children: React.ReactNode;
}

// This will be replaced with the list of characters and monsters in the encounter
// If the encounter isn't planned, you can add new actors to the list
// The characters should always be here, and the monsters will be there for planned encounters
const actors = [
  { id: '1', name: 'Grendish' },
  { id: '2', name: 'Three Toes' },
  { id: '3', name: 'Hand Of Borgen' },
];

export default function Tracker({ children }) {
  const [currentActors, setCurrentActors] = useState<Actor[]>([]);
  const [data, setData] = React.useState<any[]>([]);
  const [isAddActorDisplayed, setIsAddActorDisplayed] = useState(false);
  const [isEncounterActive, setIsEncounterActive] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [sorted, setSorted] = useState(false);

  !loading && console.log('currentActors', currentActors[0].name);

  /**
   * State for the button's active, hovered, and selected states
   * isActive: It is this actor's turn
   * isHovered: The user is hovering over this actor
   * isSelected: The user has selected this actor by clicking
   * The hovered and selected items change the displayed component in <section> for main content
   * isHovered will temporarily change the component
   * isSelected is what component shows when none are hovered
   */
  const [activeActor, setIsActive] = useState('');
  const [isHovered, setIsHovered] = useState('');
  const [isSelected, setIsSelected] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/party/actors', {
          method: 'GET',
        });
        if (response.ok) {
          const json = await response.json();
          setCurrentActors(json);
          setLoading(false);
        } else {
          console.error('Failed to fetch data', await response.text());
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cycleActors = () => {
    const newActors = currentActors.slice();
    const firstActor = newActors.shift();
    if (firstActor) {
      newActors.push(firstActor);
    }
    setCurrentActors(newActors);
  };

  const openAddActorForm = () => {
    setIsAddActorDisplayed(true);
  };

  const handleAddActor = async (formDataObj: any) => {
    // Add actor to the encounter's state, but do not persist to the database
    // This is because the encounter is not planned, and we don't want to persist

    const newActor = {
      id: Math.floor(Math.random() * 1000),
      ...formDataObj,
    };
    setCurrentActors([...currentActors, newActor]);
    setIsAddActorDisplayed(false);
    console.log('newActor', newActor);
  };

  const beginEncounter = () => {
    setIsEncounterActive(true);
  };

  const endCombat = () => {
    setIsEncounterActive(false);
  };

  return (
    <div className="h-full flex">
      <div
        className={`${styles.actors} h-full w-fit bg-cyan-300 text-slate-900 `}
      >
        <div className="bg-slate-600 pt-24 px-4  h-full">
          {loading && <div>Fetching actors...</div>}

          {!loading &&
            currentActors.length !== 0 &&
            currentActors.map((actor, index) => (
              <ActorQuickCard
                key={index}
                actor={actor}
                index={index}
                isActive={actor.name === activeActor}
                isHovered={actor.name === isHovered}
                isSelected={actor.name === isSelected}
              />
            ))}
        </div>

        {!isEncounterActive && (
          <Button
            className={`border-t border-slate-100`}
            onClick={openAddActorForm}
          >
            Add Actor
          </Button>
        )}

        {isEncounterActive ? (
          <>
            <Button
              className={`border-t border-slate-100`}
              onClick={cycleActors}
            >
              Cycle
            </Button>
            <Button className={`border-t border-slate-100`} onClick={endCombat}>
              End Combat
            </Button>
          </>
        ) : (
          <Button
            className={`border-t border-slate-100`}
            onClick={beginEncounter}
          >
            Start Encounter
          </Button>
        )}
      </div>
      <section className="h-full w-full p-4 bg-slate-900 overflow-auto">
        {isAddActorDisplayed && (
          <ActorDetails actor={currentActors[0]} />
          /* <ActorDetails
            onSubmit={handleAddActor}
            onCancel={() => {
              setIsAddActorDisplayed(false);
            }}
          /> */
        )}
        {children}
      </section>
    </div>
  );
}
