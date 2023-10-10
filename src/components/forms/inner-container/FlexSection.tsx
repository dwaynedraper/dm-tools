import React from 'react';

interface FlexSectionProps {
  children: React.ReactNode;
}

export default function FlexSection({
  children,
}: FlexSectionProps): React.ReactElement {
  return (
    <div className="flex justify-between border-b border-white/30 pb-4">
      {children}
    </div>
  );
}
