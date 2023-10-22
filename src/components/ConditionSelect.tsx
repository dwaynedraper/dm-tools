import React from 'react';

import { Condition } from '@/types/conditions';

const ConditionSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const enumKeys = Object.keys(Condition).filter(
    (key) => isNaN(Number(key)), // this filters out the reverse mapping for numeric enums
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 font-semibold rounded shadow bg-slate-800 text-slate-200"
    >
      <option value="">Select Condition</option>
      <option value=""> ------------------- </option>
      {enumKeys.map((key) => (
        <option key={key} value={Condition[key as keyof typeof Condition]}>
          {Condition[key as keyof typeof Condition]}
        </option>
      ))}
    </select>
  );
};

export default ConditionSelect;
