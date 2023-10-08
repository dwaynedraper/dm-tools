import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ActorFormState = {
  _id?: {
    $oid: string;
  };
  name: string;
  info: {
    race: string;
    class: string;
    bg: string;
    flaws: string[];
    bonds: string[];
    ideals: string[];
    traits: string[];
    align: string;
  };
  stats: {
    hp: number;
    maxHp: number;
    tempHp: number;
    ac: number;
    speed: number;
    init: number;
    prof: number;
    hitDice: number;
    hitDiceMax: number;
    hitDiceUsed: number;
    xp: number;
    level: number;
    insp: boolean;
  };
  deathSaves: {
    successes: number;
    failures: number;
  };
  abilities: {
    [key: string]: {
      score: number;
      modifier: number;
      save: boolean;
    };
  };
  prof: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: string[];
    languages: string[];
  };
  res: {
    damage: string[];
    condition: string[];
  };
  imm: {
    damage: string[];
    condition: string[];
  };
  senses: {
    blindsight: number;
    darkvision: number;
  };
  activeConditions: string[];
};

// Initial state for a new actor form:
const initialState: ActorFormState = {
  name: '',
  info: {
    race: '',
    class: '',
    bg: '',
    flaws: [],
    bonds: [],
    ideals: [],
    traits: [],
    align: '',
  },
  stats: {
    hp: 0,
    maxHp: 0,
    tempHp: 0,
    ac: 0,
    speed: 0,
    init: 0,
    prof: 0,
    hitDice: 0,
    hitDiceMax: 0,
    hitDiceUsed: 0,
    xp: 0,
    level: 1,
    insp: false,
  },
  deathSaves: {
    successes: 0,
    failures: 0,
  },
  abilities: {
    str: {
      score: 10,
      modifier: 0,
      save: false,
    },
    dex: {
      score: 10,
      modifier: 0,
      save: false,
    },
    con: {
      score: 10,
      modifier: 0,
      save: false,
    },
    int: {
      score: 10,
      modifier: 0,
      save: false,
    },
    wis: {
      score: 10,
      modifier: 0,
      save: false,
    },
    cha: {
      score: 10,
      modifier: 0,
      save: false,
    },
  },
  prof: {
    armor: [],
    weapons: [],
    tools: [],
    skills: [],
    languages: [],
  },
  res: {
    damage: [],
    condition: [],
  },
  imm: {
    damage: [],
    condition: [],
  },
  senses: {
    blindsight: 0,
    darkvision: 0,
  },
  activeConditions: [],
};

const DynamicForm = () => {
  const [formData, setFormData] = useState<ActorFormState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parts = name.split('.');

    if (parts.length === 3) {
      const [category, subcategory, field] = parts;

      if (
        formData[category as keyof ActorFormState] &&
        typeof formData[category as keyof ActorFormState] === 'object'
      ) {
        const cat = formData[category as keyof ActorFormState] as Record<
          string,
          any
        >;

        if (cat[subcategory] && typeof cat[subcategory] === 'object') {
          setFormData((prevState) => ({
            ...prevState,
            [category]: {
              ...cat,
              [subcategory]: {
                ...cat[subcategory],
                [field]: Number(value),
              },
            },
          }));
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/submitForm', formData);
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2"
      />
      {Object.keys(formData).map((category) => (
        <div key={category}>
          <h3>{category.toUpperCase()}</h3>
          {typeof formData[category as keyof ActorFormState] === 'object' &&
          formData[category as keyof ActorFormState] !== null &&
          !(formData[category as keyof ActorFormState] instanceof Array)
            ? Object.entries(
                formData[category as keyof ActorFormState] as Record<
                  string,
                  any
                >,
              ).map(([field, value]) => {
                if (typeof value === 'object' && value !== null) {
                  return Object.keys(value).map((subfield) => (
                    <input
                      key={subfield}
                      type="number"
                      name={`${category}.${field}.${subfield}`}
                      placeholder={`${subfield.toUpperCase()}`}
                      onChange={handleChange}
                      className="border p-2"
                    />
                  ));
                } else {
                  return null;
                }
              })
            : null}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
