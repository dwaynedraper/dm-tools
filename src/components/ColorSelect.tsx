import React from 'react';

import { Color } from '@/types/colors';

interface ColorSelectProps {
  className?: string;
}

const ColorSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const enumKeys = Object.keys(Color).filter(
    (key) => isNaN(Number(key)), // this filters out the reverse mapping for numeric enums
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mx-2 w-full p-2 font-semibold rounded shadow bg-slate-800 text-slate-200`}
    >
      <option value="">Select Badge Color</option>
      <option value=""> ------------------- </option>
      {enumKeys.map((key) => (
        <option key={key} value={Color[key as keyof typeof Color]}>
          {Color[key as keyof typeof Color]}
        </option>
      ))}
    </select>
  );
};

export default ColorSelect;
