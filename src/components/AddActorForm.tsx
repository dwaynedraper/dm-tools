// React/Next imports
import React, { useEffect, useRef, useState } from 'react';

// Component imports
import BasicSection from '@/components/forms/inner-container/BasicSection';
import Button from '@/components/base/Button';
import FlexSection from '@/components/forms/inner-container/FlexSection';
import Heading1 from '@/components/forms/element/Heading1';
import MySelect from '@/components/forms/element/MySelect';
import MyTextArea from '@/components/forms/element/MyTextArea';
import MyTextInput from '@/components/forms/element/MyTextInput';

// Other imports
import * as Yup from 'yup';
import { Actor } from '@/types/actor';
import generateAdjective from '@/utils/adjectiveGenerator';
import { Form, Formik } from 'formik';

interface AddActorFormProps {
  onSubmit: (formDataObj: any) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(36).trim().required('Required'),
  armorClass: Yup.number()
    .min(7)
    .max(30)
    .required('Required')
    .positive()
    .integer(),
  hitPoints: Yup.number().required('Required').positive().integer(),
  initBonus: Yup.number().required('Required').integer(),
  friendly: Yup.boolean().required('Required'),
  numActors: Yup.number().positive().integer(),
  description: Yup.string().trim(),
});

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
  const handleSubmit = (values) => {
    const {
      name,
      armorClass,
      hitPoints,
      initBonus,
      friendly,
      numActors,
      description,
    } = values;
    const isFriendly = friendly === 'true' ? true : false;
    const actorsArray: any = [];

    for (let i = 1; i <= numActors; i++) {
      const adj = generateAdjective();
      const actorName = `${adj} ${name}`;
      const actorData = {
        name: actorName,
        friendly: Boolean(isFriendly),
        description,
        stats: {
          ac: armorClass,
          currHp: hitPoints,
          maxHp: hitPoints,
          initBonus,
        },
      };
      actorsArray.push(actorData);
    }

    onSubmit(actorsArray);
  };

  return (
    <div className="max-w-4xl p-8 rounded shadow bg-slate-700 shadow-cyan-500 hover:shadow-lg hover:shadow-cyan-500">
      <Formik
        initialValues={{
          name: '',
          description: '',
          armorClass: '',
          hitPoints: '',
          initBonus: '',
          friendly: '',
          numActors: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="space-y-12">
          {/* --------- Header ---------------------------------------------------------------- */}
          <FlexSection>
            <Heading1 className="text-cyan-500">Add New Actor</Heading1>
          </FlexSection>

          {/* --------- Basic Info ----------------------------------------------------------------- */}
          <BasicSection>
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <MyTextInput
                  label="Actor Name"
                  name="name"
                  placeholder="Beholder Zombie"
                  required={true}
                />
              </div>

              <div className="col-span-full">
                <MyTextArea
                  label="Description"
                  name="description"
                  placeholder="A zombie beholder"
                  required={false}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <MyTextInput
                  label="Armor Class"
                  name="armorClass"
                  placeholder="15"
                  required={true}
                />
              </div>

              <div className="sm:col-span-3">
                <MyTextInput
                  label="Hit Points"
                  name="hitPoints"
                  required={true}
                />
              </div>

              <div className="sm:col-span-3">
                <MyTextInput
                  label="Init Bonus (DEX mod)"
                  name="initBonus"
                  required={true}
                />
              </div>

              <div className="sm:col-span-3">
                <MySelect
                  label="Is target friendly?"
                  name="friendly"
                  required={true}
                >
                  <option>--- Make selection ---</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </MySelect>
              </div>
            </div>
          </BasicSection>
          <div className="flex items-center justify-end mt-6 gap-x-6">
            <div className="flex items-center space-x-2 sm:col-span-3">
              <MyTextInput
                label="# to create"
                name="numActors"
                required={true}
                placeholder="1"
              />
            </div>
            <Button
              intent={'secondary'}
              rounded={true}
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" rounded={true}>
              Create
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
