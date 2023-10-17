// AblyContext.js
import React, { createContext, useEffect, useState } from "react";
import Ably from 'ably/promises';

const AblyContext = createContext(null);

let key;
if (process.env.NODE_ENV === 'development') {
  key = process.env.NEXT_PUBLIC_ABLY_SERVER_API_KEY;
} else {
  key = process.env.ABLY_SERVER_API_KEY;
}

let url;
if (process.env.NODE_ENV === 'development') {
  url = process.env.NEXT_PUBLIC_HOSTNAME;
} else {
  url = process.env.NEXT_PUBLIC_VERCEL_URL;
}

export const AblyProvider = ({ children }) => {
  const [ably, setAbly] = useState(null);

  useEffect(() => {
    const ably = new Ably.Realtime.Promise({
      key,
      authUrl: `${url}/api/createTokenRequest`
    });
    setAbly(ably);
  }, []);

  return (
    <AblyContext.Provider value={ably}>
      {children}
    </AblyContext.Provider>
  );
};

export default AblyContext;
