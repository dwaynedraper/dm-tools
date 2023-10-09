import React, { useEffect, useRef, useState } from 'react';
import {
  Aladin,
  Almendra,
  Amarante,
  Bungee_Spice,
  Cinzel_Decorative,
  Kaushan_Script,
  Quintessential,
  Racing_Sans_One,
} from 'next/font/google';

import styles from '@/styles/AddActorForm.module.scss';
import { Button } from '@/components/base/Button';
import FormSpacer12 from '@/components/folder/outer-wrapper/FormSpacer12';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import FlexSection from './folder/inner-container/FlexSection';
import BasicSection from './folder/inner-container/BasicSection';
import Heading1 from './folder/element/Heading1';

const aladin = Aladin({ weight: '400', subsets: ['latin'] });
const almendra = Almendra({ weight: '700', subsets: ['latin'] });
const amarante = Amarante({ weight: '400', subsets: ['latin'] });
const bungee = Bungee_Spice({ weight: '400', subsets: ['latin'] });
const cinzel = Cinzel_Decorative({ weight: '400', subsets: ['latin'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });
const quint = Quintessential({ weight: '400', subsets: ['latin'] });
const racing = Racing_Sans_One({ weight: '400', subsets: ['latin'] });

var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });
}

export default function AddActorForm() {
  const formRef = useRef(null);

  const handleClick = async (e) => {
    e.preventDefault(); // Stop the default form submission

    if (!formRef.current) return; // Guard clause

    const formData = new FormData(formRef.current); // Extract form data using FormData API
    const formDataObj = {}; // Object to store form data as key-value pairs

    // Convert FormData to an object
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    try {
      const response = await fetch(`${fullUrl}/api/party/actors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj), // Use the form data object as the body
      });
      if (response.ok) {
        const json = await response.json();
      } else {
        console.error('Failed to fetch data', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form className={`${styles.addActor}`} onSubmit={handleClick} ref={formRef}>
      <FormSpacer12>
        {/* --------- Header ---------------------------------------------------------------- */}
        <FlexSection>
          <Heading1>Add New Actor</Heading1>
          <Button rounded={true}>Save Me</Button>
        </FlexSection>

        {/* --------- Basic Info ----------------------------------------------------------------- */}
        <BasicSection>
          <h2
            className={`text-2xl text-yellow-400 font-semibold text-white ${quint.className}`}
          >
            Basic Info
          </h2>
          <p className="mb-8 leading-6 text-gray-400">
            The actor&apos;s basic information.
          </p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className={`block font-medium leading-6 text-white ${quint.className}`}
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
                className={`block font-medium leading-6 text-white ${quint.className}`}
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
        </BasicSection>
        {/* --------- Stats ----------------------------------------------------------------- */}
        <BasicSection>
          <h2 className={`text-lg font-semibold text-white ${quint.className}`}>
            Stats
          </h2>
          <p className="mt-1 leading-6 text-gray-100">
            Use a permanent address where you can receive mail.
          </p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="armor-class"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                Armor Class
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="armor-class"
                  id="armor-class"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="hit-points"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                Hit Points
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="hit-points"
                  id="hit-points"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="init-bonus"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                Initiative Bonus
              </label>
              <div className="mt-2">
                <input
                  id="init-bonus"
                  name="init-bonus"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className={`block font-medium leading-6 text-white ${quint.className}`}
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

            <div className="flex flex-col items-center sm:col-span-1">
              <label
                htmlFor="str"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                STR
              </label>
              <div className="mt-2">
                <input
                  id="str"
                  name="str"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:col-span-1">
              <label
                htmlFor="str"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                DEX
              </label>
              <div className="mt-2">
                <input
                  id="str"
                  name="str"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:col-span-1">
              <label
                htmlFor="str"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                CON
              </label>
              <div className="mt-2">
                <input
                  id="str"
                  name="str"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:col-span-1">
              <label
                htmlFor="str"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                INT
              </label>
              <div className="mt-2">
                <input
                  id="str"
                  name="str"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:col-span-1">
              <label
                htmlFor="str"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                WIS
              </label>
              <div className="mt-2">
                <input
                  id="str"
                  name="str"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:col-span-1">
              <label
                htmlFor="str"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                CHA
              </label>
              <div className="mt-2">
                <input
                  id="str"
                  name="str"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 text-sm">Proficient?</p>
              <input type="checkbox" />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className={`block font-medium leading-6 text-white ${quint.className}`}
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </BasicSection>

        {/* --------- Notifications ----------------------------------------------------------------- */}
        <BasicSection>
          <h2 className="text-base font-semibold leading-7 text-white">
            Notifications
          </h2>
          <p className="mt-1 leading-6 text-gray-100">
            We&apos;ll always let you know about important changes, but you pick
            what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex items-center h-6">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-white/30 bg-white/5 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-white"
                    >
                      Comments
                    </label>
                    <p className="text-gray-400">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex items-center h-6">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-white/30 bg-white/5 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-white"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-400">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex items-center h-6">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-white/30 bg-white/5 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-white">
                      Offers
                    </label>
                    <p className="text-gray-400">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">
                Push Notifications
              </legend>
              <p className="mt-1 leading-6 text-gray-100">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="w-4 h-4 text-indigo-600 border-white/30 bg-white/5 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor="push-everything"
                    className={`block font-medium leading-6 text-white ${quint.className}`}
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="w-4 h-4 text-indigo-600 border-white/30 bg-white/5 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor="push-email"
                    className={`block font-medium leading-6 text-white ${quint.className}`}
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="w-4 h-4 text-indigo-600 border-white/30 bg-white/5 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor="push-nothing"
                    className={`block font-medium leading-6 text-white ${quint.className}`}
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </BasicSection>
      </FormSpacer12>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <button
          type="button"
          className="box-border px-3 py-2 text-sm font-semibold text-white border border-red-600 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white border rounded-md shadow-sm bg-cyan-600 border-cyan-600 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
