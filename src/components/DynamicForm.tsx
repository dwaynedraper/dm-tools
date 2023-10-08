import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    subcategories: {
      stats: {
        str: null,
        dex: null,
        con: null,
        int: null,
        wis: null,
        cha: null,
      },
      // You can add more subcategories here
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parts = name.split('.');

    if (parts.length === 3) {
      const [subcategory, field] = parts.slice(1);
      setFormData({
        ...formData,
        subcategories: {
          ...formData.subcategories,
          [subcategory]: {
            ...formData.subcategories[subcategory],
            [field]: Number(value),
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
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
        name="id"
        placeholder="ID"
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2"
      />
      {Object.keys(formData.subcategories).map((subcategory) => (
        <div key={subcategory}>
          <h3>{subcategory.toUpperCase()}</h3>
          {Object.keys(formData.subcategories[subcategory]).map((field) => (
            <input
              key={field}
              type="number"
              name={`subcategories.${subcategory}.${field}`}
              placeholder={`${field.toUpperCase()}`}
              onChange={handleChange}
              className="border p-2"
            />
          ))}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
