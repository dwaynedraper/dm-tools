import React from 'react';

interface FormSpacer12Props {
  children: React.ReactNode;
}

export default function FormSpacer12({
  children,
}: FormSpacer12Props): React.ReactElement {
  return <div className="space-y-12">{children}</div>;
}
