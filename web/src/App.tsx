
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, unstable_HistoryRouter as HistoryBrowser } from 'react-router-dom';
import Dashboard from 'screen/dashboard';
import LandingScreen from 'screen/landing/LandingScreen';
import * as MeApi from 'api/me';
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
import Turfwar from 'screen/turfwar';

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
      <HistoryBrowser history={history}>
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
                          <Route path="permissions" element={<Permissions/>}/>
                          <Route path="auto-mod/banned-words" element={<BannedWords/>}/>
                          <Route path="auto-mod/link-detect" element={<LinkDetect/>}/>
                          <Route path="auto-mod/capslock-detect" element={<CapslockDetect server={selectedServer.server} />} />
                          <Route path="scores" element={<Scores server={selectedServer.server}/>} />
                          <Route path="turfwar" element={<Turfwar server={selectedServer.server}/>}/>
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
      </HistoryBrowser>
    </SelectedServerContext.Provider>
  )
}

export default App;