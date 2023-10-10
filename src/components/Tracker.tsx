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
    // Roll initiative for actors if not set
    const updatedActors = currentActors.map((actor) => {
      if (actor.stats?.initiative === undefined) {
        // Assuming a d20 system, feel free to replace with your system's logic
        const initiativeRoll = Math.floor(Math.random() * 20) + 1;
        return {
          ...actor,
          stats: {
            ...actor.stats,
            initiative: initiativeRoll,
          },
        };
      }
      return actor;
    });

    // Sort actors by initiative in descending order
    updatedActors.sort((a, b) => {
      // Ensure both actors have stats and initiative values before comparing
      if (a.stats?.initiative && b.stats?.initiative) {
        return b.stats.initiative - a.stats.initiative;
      }
      return 0; // Default case, order remains unchanged
    });

    // Update the state with the new actors list and set encounter to active
    setCurrentActors(updatedActors);
    setIsEncounterActive(true);
  };

  const endCombat = () => {
    setIsEncounterActive(false);
  };

  const handleDelete = (id: string) => {
    const newActors = currentActors.filter((actor) => actor.id !== id);
    setCurrentActors(newActors);
  };

  const updateInit = (newInit: number, actorName: string) => {
    const newActors = [...currentActors];
    const actorIndex = newActors.findIndex((actor) => actor.name === actorName);

    if (actorIndex !== -1) {
      // Ensure stats object exists before updating init
      const actor = newActors[actorIndex];
      actor.stats = actor.stats || {};
      actor.stats.initiative = newInit;
      newActors[actorIndex] = actor;
      setCurrentActors(newActors);
    } else {
      console.error(`No actor found with name: ${actorName}`);
    }
  };

  const handleHpChange = (newHp: number, actorName: string) => {
    const newActors = [...currentActors];
    const actorIndex = newActors.findIndex((actor) => actor.name === actorName);

    if (actorIndex !== -1) {
      // Ensure stats object exists before updating currHp
      const actor = newActors[actorIndex];
      actor.stats = actor.stats || {};
      actor.stats.currHp = newHp;
      newActors[actorIndex] = actor;
      setCurrentActors(newActors);
    } else {
      console.error(`No actor found with name: ${actorName}`);
    }
  };

  const getActor = () => {
    if (isHovered)
      return currentActors.find((actor) => actor.name === isHovered);
    if (isSelected)
      return currentActors.find((actor) => actor.name === isSelected);
    return currentActors[activeActor];
  };

  return (
    <div className="flex h-full">
      <div
        className={`${styles.actors} h-full w-fit bg-cyan-300 text-slate-900 `}
      >
        <div className="h-full px-4 pt-8 bg-slate-800 w-96">
          <h1 className={`${kaushan.className} text-4xl text-slate-200`}>
            Initiative Order
          </h1>
          <p className="mb-8 text-slate-200">
            Enter initiative roll without adding your bonus
          </p>
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
                  isEncounterActive={isEncounterActive}
                  isActive={index === activeActor}
                  isHovered={actor.name === isHovered}
                  isSelected={actor.name === isSelected}
                  handleHpChange={(newHp) => handleHpChange(newHp, actor.name)}
                  handleDelete={handleDelete}
                  handleInitChange={updateInit}
                />
              </div>
            ))}
        </div>

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
          <>
            <Button
              className={`border-t border-slate-100`}
              onClick={openAddActorForm}
            >
              Add Actor
            </Button>
            <Button
              className={`border-t border-slate-100`}
              onClick={beginEncounter}
            >
              Start Encounter
            </Button>
          </>
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
          </>
        )}
        {!isAddActorDisplayed && getActor() !== undefined && (
          <ActorDetails actor={getActor()} />
        )}
        {children}
      </section>
    </div>
  );
}
