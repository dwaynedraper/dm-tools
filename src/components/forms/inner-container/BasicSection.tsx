import React from 'react';

interface FlexSectionProps {
  children: React.ReactNode;
}

export default function BasicSection({
  children,
}: FlexSectionProps): React.ReactElement {
  return <div className="border-b border-white/30 pb-4">{children}</div>;
}
