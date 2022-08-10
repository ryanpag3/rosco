
import React, { useEffect, useState } from 'react'
import { Route, Routes, unstable_HistoryRouter as HistoryBrowser } from 'react-router-dom';
import Dashboard from 'screen/dashboard';
import LandingScreen from 'screen/landing/LandingScreen';
import Cookies, { getCookie } from 'util/cookies';
import { SelectedServerContext } from 'context/selected-server-context';
import LocalStorageKey from 'util/localstorage-key';
import Home from 'screen/home';
import Config from 'screen/config';
import Permissions from 'screen/permissions';
import BannedWords from 'screen/banned-words';
import LinkDetect from 'screen/link-detect';
import CapslockDetect from 'screen/capslock-detect';
import Scores from 'screen/scores';
import history from 'util/history';
import NotFound from 'screen/not-found';
import InternalError from 'screen/internal-error';

const App = () => {
  const [selectedServer, setSelectedServer] = useState({
    server: getCachedSelectedServer(),
    setSelectedServer: (server: string) => setSelectedServer({
      ...selectedServer,
      server: server as any
    })
  });

  function getCachedSelectedServer() {
    const raw = localStorage.getItem(LocalStorageKey.SELECTED_SERVER);
    return raw ? JSON.parse(raw) : undefined;
  }

  function authenticationFound() {
    return getCookie(Cookies.IS_AUTHENTICATED) === 'true';;
  }

  return (
    // @ts-ignore
    <SelectedServerContext.Provider value={selectedServer}>
      <HistoryBrowser history={history}>
        <Routes>
          {/* LANDING PAGE */}
          <Route path="/">
            <Route index element={<LandingScreen />} />
          </Route>

          {/* DASHBOARD */}
          {
            authenticationFound() &&
            <Route path="/dashboard">
              <Route
                index
                element={<Dashboard
                  server={selectedServer.server}
                  setSelectedServer={selectedServer.setSelectedServer} />} />
              <Route
                path=":serverId"
                element={<Dashboard
                  server={selectedServer.server}
                  setSelectedServer={selectedServer.setSelectedServer} />}>
                {
                  selectedServer &&
                  <React.Fragment>
                    <Route path="home" element={<Home />}></Route>
                    <Route path="config" element={<Config />}></Route>
                    <Route path="permissions" element={<Permissions />} />
                    <Route path="auto-mod">
                      <Route path="banned-words" element={<BannedWords />} />
                      <Route path="link-detect" element={<LinkDetect />} />
                      <Route path="capslock-detect" element={<CapslockDetect server={selectedServer.server} />} />
                    </Route>
                    <Route path="scores" element={<Scores server={selectedServer.server} />} />
                  </React.Fragment>
                }
              </Route>
            </Route>
          }

          {/* 404 - NOT FOUND */}
          <Route path="*" element={<NotFound />} />

          {/* 500 - INTERNAL SERVER ERROR */}
          <Route path="/internal-error" element={<InternalError/>}/>
        </Routes>
      </HistoryBrowser>
    </SelectedServerContext.Provider>
  )
}

export default App;