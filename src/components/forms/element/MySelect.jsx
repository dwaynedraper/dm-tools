import React from 'react';
import { useField } from 'formik';

export default function MySelect({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={`block font-medium leading-6 text-white`}
      >{label}</label>
      <div className='mt-2'>

      <select {...field} {...props} className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
        />
        </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}