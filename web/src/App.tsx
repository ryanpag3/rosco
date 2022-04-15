
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'screen/dashboard';
import LandingScreen from 'screen/landing/LandingScreen';
import * as MeApi from 'api/me';
import Cookies, { getCookie } from 'util/cookies';
import { SelectedServerContext } from 'context/selected-server-context';

const subdomain = window.location.host.split('.')[0];

const App = () => {
  const [selectedServer, setSelectedServer] = useState({
    server: undefined,
    setSelectedServer: (server: string) => setSelectedServer({
      ...selectedServer,
      server: server as any
    })
  });
  const [me, setMe] = useState(undefined as any);

  useEffect(() => {
    getMe();
  }, [me === undefined]);

  useEffect(() => {
    console.log(selectedServer);
  }, [ selectedServer ])

  async function getMe() {
    const data = await MeApi.getMe();
    setMe(data);
  }

  return (
    // @ts-ignore
    <SelectedServerContext.Provider value={selectedServer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          {
            getCookie(Cookies.IS_AUTHENTICATED) === 'true' && me !== undefined ?
              <Route path="/dashboard" element={<Dashboard me={me} />} /> :
              null
          }
        </Routes>
      </BrowserRouter>
    </SelectedServerContext.Provider>

  )
}

export default App;