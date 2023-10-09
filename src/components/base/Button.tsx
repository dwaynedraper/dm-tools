import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('button', {
  variants: {
    intent: {
      primary: [
        'bg-cyan-800',
        'text-white',
        'border-transparent',
        'hover:bg-cyan-500',
        'font-semibold',
      ],
      secondary: [
        'bg-white',
        'text-gray-800',
        'border-gray-400',
        'hover:bg-gray-100',
      ],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
      large: ['text-lg', 'py-3', 'px-6'],
    },
    rounded: {
      true: 'rounded-md',
      false: '',
    },
  },
  compoundVariants: [{ intent: 'primary', class: 'capitalize' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  rounded,
  ...props
}) => (
  <button
    type="submit"
    className={`font-semibold ${button({ intent, size, rounded, className })}`}
    {...props}
  />
);

// TODO: Finish adding the remaining props from the original Button component, as seen below:
{
  /*
  <button
    type="submit"
    className="rounded-md bg-cyan-600 
    border border-cyan-600 
    px-3 py-2 text-sm 
    font-semibold text-white 
    shadow-sm hover:bg-indigo-400 "
  >
    Save
  </button>

  -------------------------------------------------------------------------------------

  <button
    type="button"
    className="text-sm font-semibold text-white border border-red-600 rounded-md px-3 py-2 box-border"
  >
    Cancel
  </button>
*/
}
