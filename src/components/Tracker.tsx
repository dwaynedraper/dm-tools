// React/Next imports
import React, { useEffect, useState } from 'react'

// Other imports
import styles from '@/styles/Tracker.module.scss'
import { Actor } from '@/types/actor'
import classNames from 'classnames'

interface TrackerProps {
  actors?: Actor[]
}

// This will be replaced with the list of characters and monsters in the encounter
// If the encounter isn't planned, you can add new actors to the list
// The characters should always be here, and the monsters will be there for planned encounters
const actors = [
  { id: 1, name: 'Grendish' },
  { id: 2, name: 'Three Toes' },
  { id: 3, name: 'Hand Of Borgen' },
]

export default function Tracker(): JSX.Element {
  const [currentActors, setCurrentActors] = useState(actors)
  const [sorted, setSorted] = useState(false)

  useEffect(() => {
    // Map the actors to the currentActors state
    // Make a call to API route /api/party/:id/actors
  }, [])

  const sortActors = () => {
    // Check if all actors have an initBonus value. If not, roll for them.
    // Sort the actors by initiative
    //   const newActors = currentActors.slice()
    //   newActors.sort((a, b) => a.id - b.id)
    //   setCurrentActors(newActors)
    //   <React.Fragment key={actor.id}>
    //   {index === 0 && (
    //     <>
    //       <p className="text-xs text-green-500 font-bold">
    //         Begin Round
    //       </p>
    //       <hr className="border-1 border-green-500 mb-2" />
    //     </>
    //   )}
    //   <div
    //     className={classNames(
    //       'px-4 py-1 border border-l-0 border-slate-900 bg-slate-700 text-lg text-white font-bold rounded-r-xl whitespace-nowrap hover:border-slate-200 hover:bg-slate-300 hover:text-slate-800 hover:cursor-pointer',
    //       {
    //         'mb-8': index !== currentActors.length - 1, // corrected line
    //       },
    //     )}
    //   >
    //     {actor.name}
    //   </div>
    //   {index === currentActors.length - 1 && ( // corrected line
    //     <>
    //       <hr className="border-1 border-red-500 mt-2" />
    //       <p className="text-xs text-red-500 font-bold">End Round</p>
    //     </>
    //   )}
    // </React.Fragment>
  }

  const cycleActors = () => {
    const newActors = currentActors.slice()
    const firstActor = newActors.shift()
    if (firstActor) {
      newActors.push(firstActor)
    }
    setCurrentActors(newActors)
  }

  return (
    <div className="h-full flex">
      <div
        className={`${styles.actors} h-full w-fit bg-slate-300 text-slate-900 overflow-scroll hide-scrollbar`}
      >
        <div className="bg-slate-100 pt-24 pr-4 pl-[2px] h-full">
          {!sorted &&
            currentActors.map((actor, index) => (
              <div
                key={actor.id}
                className={classNames(
                  'px-4 border border-l-0 border-slate-900 bg-slate-700 text-lg font-bold rounded-r-xl whitespace-nowrap  hover:cursor-pointer shadow hover:shadow-3xl shadow-teal-500 hover:shadow-teal-600',
                  {
                    'py-4 text-teal-200': index === 0,
                    'py-1 text-white': index !== 0,
                    'mb-8': index !== currentActors.length - 1, // corrected line
                  },
                )}
              >
                {actor.name}
              </div>
            ))}
        </div>
        <button onClick={cycleActors}>Cycle</button>
        <div className={`${styles.barContainer} rounded-full`}>
          <div className={`${styles.bar} rounded-full`}></div>
        </div>
      </div>
      <div className="h-full w-3/4 bg-slate-200 p-4 text-slate-950">
        <div className="bg-white rounded shadow shadow-lg shadow-slate-600 h-full "></div>
      </div>
    </div>
  )
}
