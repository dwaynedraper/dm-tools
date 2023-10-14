import classNames from 'classnames';

export default function ColorBadge({ condition, cardColor }) {
  const borderColorClass = classNames({
    'border-red-400': cardColor === 'red',
    'border-green-400': cardColor === 'green',
    'border-blue-400': cardColor === 'blue',
    'border-yellow-400': cardColor === 'yellow',
    'border-cyan-400': cardColor === 'cyan',
    'border-purple-400': cardColor === 'purple',
    'border-pink-400': cardColor === 'pink',
    'border-emerald-400': cardColor === 'emerald',
    'border-white-400': cardColor === 'white',
    'border-orange-400': cardColor === 'orange',
    // ... add other color conditions as needed
  });

  const textColorClass = classNames({
    'text-red-200': cardColor === 'red',
    'text-green-200': cardColor === 'green',
    'text-blue-200': cardColor === 'blue',
    'text-yellow-200': cardColor === 'yellow',
    'text-cyan-200': cardColor === 'cyan',
    'text-purple-200': cardColor === 'purple',
    'text-pink-200': cardColor === 'pink',
    'text-emerald-200': cardColor === 'emerald',
    'text-white-200': cardColor === 'white',
    'text-orange-200': cardColor === 'orange',
    // ... add other color conditions as needed
  });

  const bgColorClass = classNames({
    'bg-red-800/40': cardColor === 'red',
    'bg-green-800/40': cardColor === 'green',
    'bg-blue-800/40': cardColor === 'blue',
    'bg-yellow-800/40': cardColor === 'yellow',
    'bg-cyan-800/40': cardColor === 'cyan',
    'bg-purple-800/40': cardColor === 'purple',
    'bg-pink-800/40': cardColor === 'pink',
    'bg-emerald-800/40': cardColor === 'emerald',
    'bg-white-800/40': cardColor === 'white',
    'bg-orange-800/40': cardColor === 'orange',
    // ... add other color conditions as needed
  });

  return (
    <div
      className={`border ${borderColorClass} ${textColorClass} ${bgColorClass} text-lg rounded mr-4 mb-2 py-2 px-6`}
    >
      {condition}
    </div>
  );
}
