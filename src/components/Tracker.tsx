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

  /**
   * State for the button's active, hovered, and selected states
   * isActive: It is this actor's turn
   * isHovered: The user is hovering over this actor (handle CSS with hover:property)
   * isSelected: The user has selected this actor by clicking
   * The hovered and selected items change the displayed component in <section> for main content
   * isHovered will temporarily change the component
   * isSelected is what component shows when none are hovered
   */
  const [activeActor, setActiveActor] = useState(0);
  const [isHovered, setIsHovered] = useState('');
  const [isSelected, setIsSelected] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/party/actors', {
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
    if (activeActor === currentActors.length - 1) {
      setActiveActor(0);
    } else {
      setActiveActor(activeActor + 1);
    }
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
  };

  const setHovered = (actorName: string) => {
    setIsHovered(actorName);
  };

  const setSelected = (actorName: string) => {
    setIsSelected(actorName);
  };

  const unsetHovered = () => {
    setIsHovered('');
  };

  const beginEncounter = () => {
    setIsEncounterActive(true);
  };

  const endCombat = () => {
    setIsEncounterActive(false);
  };

  return (
    <div className="flex h-full">
      <div
        className={`${styles.actors} h-full w-fit bg-cyan-300 text-slate-900 `}
      >
        <div className="h-full px-4 pt-24 bg-slate-800 w-96">
          {loading && <div>Fetching actors...</div>}

          {!loading &&
            currentActors.length !== 0 &&
            currentActors.map((actor, index) => (
              <div
                className=""
                key={index}
                onMouseEnter={() => setHovered(actor.name)}
                onMouseLeave={() => unsetHovered()}
                onClick={() => setSelected(actor.name)}
              >
                <ActorQuickCard
                  key={index}
                  actor={actor}
                  index={index}
                  isActive={index === activeActor}
                  isHovered={actor.name === isHovered}
                  isSelected={actor.name === isSelected}
                />
              </div>
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
      <section className="w-full h-full p-4 overflow-auto bg-slate-900">
        {isAddActorDisplayed && (
          <>
            <AddActorForm
              onSubmit={handleAddActor}
              onCancel={() => {
                setIsAddActorDisplayed(false);
              }}
            />
            <hr className="invisible mb-16" />
            <ActorDetails actor={currentActors[0]} />
          </>
        )}
        {children}
      </section>
    </div>
  );
}
