// React/Next imports
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// Other imports
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { useUser } from '@clerk/nextjs';

interface AblyComponentProps {
  children: React.ReactNode;
}

export default function AblyComponent({
  children,
}: AblyComponentProps): React.ReactElement | null {
  const user = useUser();
  const router = useRouter();

  const clientId =
    user?.user?.username ??
    user?.user?.primaryEmailAddress?.emailAddress.split('@')[0];

  const client = React.useMemo(() => {
    if (!clientId) return null;

    return new Ably.Realtime.Promise({
      authUrl: `${
        router.basePath
      }/api/createTokenRequest?clientId=${encodeURIComponent(clientId)}`,
    });
  }, [clientId]);

  useEffect(() => {
    return () => {
      if (client) client.connection.close();
    };
  });

  if (!client) return null;

  return <AblyProvider client={client}>{children}</AblyProvider>;
}
