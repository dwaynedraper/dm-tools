import React, { useEffect, useRef, useState } from 'react';
import {
  Aladin,
  Almendra,
  Amarante,
  Architects_Daughter,
  Bungee_Spice,
  Cinzel_Decorative,
  Inter,
  Kaushan_Script,
  Quintessential,
  Racing_Sans_One,
} from 'next/font/google';

import styles from '@/styles/AddActorForm.module.scss';
import { Button } from '@/components/base/Button';
import FormSpacer12 from '@/components/folder/outer-wrapper/FormSpacer12';

const aladin = Aladin({ weight: '400', subsets: ['latin'] });
const almendra = Almendra({ weight: '700', subsets: ['latin'] });
const amarante = Amarante({ weight: '400', subsets: ['latin'] });
const architect = Architects_Daughter({ weight: '400', subsets: ['latin'] });
const bungee = Bungee_Spice({ weight: '400', subsets: ['latin'] });
const cinzel = Cinzel_Decorative({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });
const quint = Quintessential({ weight: '400', subsets: ['latin'] });
const racing = Racing_Sans_One({ weight: '400', subsets: ['latin'] });

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import FlexSection from './folder/inner-container/FlexSection';
import BasicSection from './folder/inner-container/BasicSection';
import Heading1 from './folder/element/Heading1';

interface AddActorFormProps {
  onSubmit: (formDataObj: any) => void;
  onCancel: () => void;
}

/**
 * AddActorForm allows the user to add a new actor to the encounter.
 * @param onSubmit - Function to handle form submission
 * @param onCancel - Function to handle form cancellation
 * @returns A form to add a new actor to the encounter
 */
export default function AddActorForm({
  onSubmit,
  onCancel,
}: AddActorFormProps) {
  const formRef = useRef(null);

  // Handle form submission -------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the default form submission

    if (!formRef.current) return; // Guard clause

    const formData = new FormData(formRef.current); // Extract form data using FormData API
    const formDataObj = {}; // Object to store form data as key-value pairs

    // Convert FormData to an object
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log('formDataObj', formDataObj);

    onSubmit(formDataObj);
  };

  return (
    <form
      className={`${styles.addActor}`}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <FormSpacer12>
        {/* --------- Header ---------------------------------------------------------------- */}
        <FlexSection>
          <Heading1 className="text-cyan-500">Add New Actor</Heading1>
        </FlexSection>

        {/* --------- Basic Info ----------------------------------------------------------------- */}
        <BasicSection>
          {/* <h2
            className={`text-2xl text-yellow-400 font-semibold text-white`}
          >
            Basic Info
          </h2>
          <p className="mb-8 leading-6 text-gray-400">
            The actor&apos;s basic information.
          </p> */}

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className={`block font-medium leading-6 text-white`}
              >
                Actor Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Beholder Zombie"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className={`block font-medium leading-6 text-white`}
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
          {/* </BasicSection> */}
          {/* --------- Stats ----------------------------------------------------------------- */}
          {/* <BasicSection> */}
          {/* <h2 className={`text-lg font-semibold text-white`}>
            Stats
          </h2>
          <p className="mt-1 leading-6 text-gray-100">
            Use a permanent address where you can receive mail.
          </p> */}

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="armorClass"
                className={`block font-medium leading-6 text-white`}
              >
                Armor Class
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="armorClass"
                  id="armorClass"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="hitPoints"
                className={`block font-medium leading-6 text-white`}
              >
                Hit Points
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="hitPoints"
                  id="hitPoints"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="initBonus"
                className={`block font-medium leading-6 text-white`}
              >
                Initiative Bonus
              </label>
              <div className="mt-2">
                <input
                  id="initBonus"
                  name="initBonus"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className={`block font-medium leading-6 text-white`}
              >
                Is target friendly?
              </label>
              <div className="mt-2">
                <select
                  id="friendly"
                  name="friendly"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  <option value={'true'}>Yes</option>
                  <option value={'false'}>No</option>
                </select>
              </div>
            </div>
          </div>
        </BasicSection>
      </FormSpacer12>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <div className="flex align-middle sm:col-span-1">
          <label
            htmlFor="country"
            className={`block font-medium leading-6 text-white`}
          >
            Is target friendly?
          </label>
          <div className="mt-2">
            <select
              id="friendly"
              name="friendly"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option value={'true'}>Yes</option>
              <option value={'false'}>No</option>
            </select>
          </div>
        </div>
        <Button
          rounded={true}
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          rounded={true}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Create
        </Button>
      </div>
    </form>
  );
}
