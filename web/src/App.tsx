
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'screen/dashboard';
import LandingScreen from 'screen/landing/LandingScreen';
import * as MeApi from 'api/me';
import Cookies, { getCookie } from 'util/cookies';
import { SelectedServerContext } from 'context/selected-server-context';
import LocalStorageKey from 'util/localstorage-key';
import styled from 'styled-components';
import Home from 'screen/home';
import GettingStarted from 'screen/getting-started';
import Config from 'screen/config';

const App = () => {
  const [selectedServer, setSelectedServer] = useState({
    server: getCachedSelectedServer(),
    setSelectedServer: (server: string) => setSelectedServer({
      ...selectedServer,
      server: server as any
    })
  });
  const [me, setMe] = useState(undefined as any);

  useEffect(() => {
    if (me)
      return;
    getMe();
  }, [me]);

  function getCachedSelectedServer() {
    const raw = localStorage.getItem(LocalStorageKey.SELECTED_SERVER);
    return raw ? JSON.parse(raw) : undefined;
  }

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
              <React.Fragment>
                <Route path="/dashboard" element={<Dashboard me={me} 
                    server={selectedServer.server} setSelectedServer={selectedServer.setSelectedServer}/>}/>
                <Route path="/dashboard/:serverId" element={<Dashboard me={me} 
                    server={selectedServer.server} setSelectedServer={selectedServer.setSelectedServer}/>}>
                      {
                        selectedServer.server ?
                        <React.Fragment>
                          <Route path="home" element={<Home/>}></Route>
                          <Route path="config" element={<Config/>}></Route>
                        </React.Fragment>
                        :
                        null
                      }
                </Route>
              </React.Fragment>
              :
              null
          }
        </Routes>
      </BrowserRouter>
    </SelectedServerContext.Provider>

  )
}

export default App;