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
import { Form, Formik } from 'formik';

const validationSchema = Yup.object({
  firstName: Yup.string().min(2).max(36).trim().required('Required'),
  lastName: Yup.string().min(2).max(36).trim().required('Required'),
  displayName: Yup.string().min(2).max(36).trim().required('Required'),
});

export default function Profile() {
  return (
    <section className="flex flex-col justify-between w-full h-full p-4 overflow-auto bg-slate-900">
      <div className="max-w-4xl p-8 rounded shadow bg-slate-700 shadow-cyan-500 hover:shadow-lg hover:shadow-cyan-500">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            displayName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Submit!', values);
          }}
        >
          <Form className="space-y-12">
            <FlexSection>
              <Heading1 className="text-cyan-500">Profile</Heading1>
            </FlexSection>
            <BasicSection>
              <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <MyTextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="sm:col-span-3">
                  <MyTextInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="sm:col-span-3">
                  <MyTextInput
                    label="Display Name"
                    name="displayName"
                    type="text"
                    placeholder="This is the name others will see you as"
                  />
                </div>
              </div>
              <div className="flex justify-end sm:col-span-6">
                <Button type="submit">Save</Button>
              </div>
            </BasicSection>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
