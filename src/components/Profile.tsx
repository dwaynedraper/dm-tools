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

interface ProfileProps {}

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(36).trim().required('Required'),
});

export default function Profile() {
  return (
    <div className="max-w-4xl p-8 rounded shadow bg-slate-700 shadow-cyan-500 hover:shadow-lg hover:shadow-cyan-500">
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          console.log('Submit!');
        }}
      >
        <Form className="space-y-12">
          <FlexSection>
            <Heading1 className="text-cyan-500">Profile</Heading1>
          </FlexSection>
        </Form>
      </Formik>
    </div>
  );
}
