import React from 'react'
import { useField } from 'formik';

export default function MyCheckbox({ children, ...props }) {
  const [field, meta] = useField({...props, type: "checkbox"});
  return (
    <>
      <label className='checkbox-input'>
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="pl-1 m-1 border border-red-600 rounded text-slate-300 error">{meta.error}</div>
      ) : null}
    </>
  )
}
