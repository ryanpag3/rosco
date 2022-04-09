
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'screen/dashboard';
import LandingScreen from 'screen/landing/LandingScreen';
import * as MeApi from 'api/me';
import Cookies, { getCookie } from 'util/cookies';

const subdomain = window.location.host.split('.')[0];

const App = () => {
  const [me, setMe] = useState(undefined as any);

  useEffect(() => {
    console.log(getCookie(Cookies.IS_AUTHENTICATED));
    getMe();
  }, [me === undefined]);

  async function getMe() {
    const data = await MeApi.getMe();
    console.log(data);
    setMe(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        {
          getCookie(Cookies.IS_AUTHENTICATED) === 'true' && me !== undefined ?
            <Route path="/app" element={<Dashboard me={me} />} /> :
            null
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App;