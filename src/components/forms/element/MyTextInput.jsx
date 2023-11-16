import React from 'react';
import { useField } from 'formik';

export default function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={`block font-medium leading-6 text-white`}
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
          <input
            className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
            {...field}
            {...props}
          />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="pl-1 m-1 border border-red-600 rounded text-slate-300 error">{meta.error}</div>
      ) : null}
    </>
  )
}
