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
import Button from '@/components/base/Button';
import ActorDetails from './ActorDetails';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
import { GiDiceTwentyFacesTwenty, GiCrossedSwords } from 'react-icons/gi';
import { AiOutlineUserAdd, AiOutlineCloseSquare } from 'react-icons/ai';
import { FaStop } from 'react-icons/fa';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const spice = Bungee_Spice({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

interface TrackerProps {
  data: any;
  children: React.ReactNode;
}

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
  const [activeActor, setActiveActor] = useState<number | null>(null);
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
    if (activeActor === currentActors.length - 1 || activeActor === null) {
      setActiveActor(0);
    } else {
      setActiveActor(activeActor + 1);
    }
  };

  const reverseActors = () => {
    if (activeActor === null) return;
    if (activeActor === 0) {
      setActiveActor(currentActors.length - 1);
    } else {
      setActiveActor(activeActor - 1);
    }
  };

  const openAddActorForm = () => {
    setIsAddActorDisplayed(true);
  };

  const handleAddActors = async (formDataObjArray: any[]) => {
    // Generate an array of new actors with unique IDs and the provided data
    const newActors = formDataObjArray.map((formDataObj) => ({
      _id: Math.floor(Math.random() * 1000).toString(),
      ...formDataObj,
    }));

    // Merge the new actors with the existing actors and update the state
    setCurrentActors((prevActors) => [...prevActors, ...newActors]);

    // Hide the Add Actor form
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
    setActiveActor(0);
    setIsEncounterActive(true);
    setIsAddActorDisplayed(false);
  };

  const rollEnemyInitiative = () => {
    const updatedActors = currentActors.map((actor) => {
      if (!actor.friendly && actor.stats?.initiative === undefined) {
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

    setCurrentActors(updatedActors as Actor[]);
  };

  const endCombat = () => {
    setIsEncounterActive(false);
    setActiveActor(null);
    // Cycle through all actors and delete their initiative
    const updatedActors = currentActors.map((actor) => {
      if (actor.stats?.initiative) {
        delete actor.stats.initiative;
      }
      return actor;
    });
  };

  const handleDelete = (id: string) => {
    const newActors = currentActors.filter((actor) => actor._id !== id);
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
    if (activeActor !== null) return currentActors[activeActor];
  };

  return (
    <div className="flex h-full">
      <div
        className={`${styles.actors} h-full w-fit bg-cyan-300 text-slate-900 `}
      >
        <div className="flex flex-col h-full px-4 pt-8 overflow-y-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-cyan-700 scrollbar-thumb-rounded bg-slate-800 w-96">
          <h1 className={`${kaushan.className} text-4xl text-slate-200 mb-4`}>
            {isEncounterActive ? 'Initiative Order' : 'Encounter Setup'}
          </h1>
          <p className="p-2 mb-8 text-sm rounded-lg text-slate-400 bg-slate-200/10">
            {!isEncounterActive &&
              'Enter initiative roll without adding your bonus'}
            {isEncounterActive && 'Enter a number to update to that number'}
            <br />
            {!isEncounterActive && 'Starting encounter will roll initiatives'}
            {isEncounterActive &&
              'Enter + or - followed by a number to add or subtract'}
          </p>
          {!isEncounterActive && (
            <Button
              rounded={true}
              className={`w-full self-center mb-8 flex items-center justify-center`}
              onClick={openAddActorForm}
            >
              <AiOutlineUserAdd className="w-8 h-8 mr-4" />
              Add Actor
            </Button>
          )}
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
          {!isEncounterActive && currentActors.length > 5 && (
            <Button
              rounded={true}
              className={`w-full self-center mb-8`}
              onClick={openAddActorForm}
            >
              Add Actor
            </Button>
          )}
        </div>

        {isEncounterActive ? (
          <>
            <div className="flex">
              <Button
                className={`border-t border-r w-1/2 border-slate-100 flex items-center `}
                onClick={reverseActors}
              >
                <HiArrowLongLeft className="w-8 h-8 mr-4" />
                Go Back
              </Button>
              <Button
                className={`border-t w-1/2 border-slate-100 flex items-center justify-end bg-green-700`}
                onClick={cycleActors}
              >
                End Turn
                <HiArrowLongRight className="w-8 h-8 ml-4" />
              </Button>
            </div>
            <Button
              className={`border-t border-slate-100 flex items-center justify-center`}
              intent={'secondary'}
              onClick={endCombat}
            >
              <FaStop className="w-8 h-8 mr-4" />
              End Combat
            </Button>
          </>
        ) : (
          <>
            <Button
              className={`border-t border-slate-100 flex items-center justify-center`}
              onClick={rollEnemyInitiative}
            >
              <GiDiceTwentyFacesTwenty className="w-8 h-8 mr-4" />
              Roll Enemy Initiatives
            </Button>

            <Button
              className={`bg-green-700 border-t border-slate-100 flex items-center justify-center`}
              onClick={beginEncounter}
            >
              <GiCrossedSwords className="w-8 h-8 mr-4" />
              Start Encounter
            </Button>
          </>
        )}
      </div>
      <section className="w-full h-full p-4 overflow-auto bg-slate-900">
        {isAddActorDisplayed && (
          <>
            <AddActorForm
              onSubmit={handleAddActors}
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
