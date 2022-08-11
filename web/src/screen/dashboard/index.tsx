import { getGuild } from 'api/guild';
import ProSideBar from 'component/ProSideBar';
import Row from 'component/Row';
import ScreenTopBar from 'component/ScreenTopBar';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocalStorageKey from 'util/localstorage-key';
import Screen from '../../component/Screen';
import * as MeApi from 'api/me';


const Dashboard = ({ server, setSelectedServer }: {
  server: any;
  setSelectedServer: any;
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [me, setMe] = useState(undefined as any);

  useEffect(() => {
    if (me)
      return;
    getMe();
  }, [me]);

  useEffect(() => {
    if (!params.serverId) {
      navigate('/dashboard');
    }
  }, [server]);

  useEffect(() => {
    if (!server || server.isSelected === true)
      return;
    
    getGuild(server.id)
      .then((s) => {
        s.isSelected = true;
        setSelectedServer(s)
      })
      .catch((e) => {
        if (!e.toString().includes(403))
          return;
        setSelectedServer(undefined);
        navigate('/dashboard');
        localStorage.removeItem(LocalStorageKey.SELECTED_SERVER);
        window.location.href = "https://discord.com/oauth2/authorize?client_id=955851785346613248&scope=bot%20applications.commands&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Froscobot.com";
    });
  }, [ server ]);

  async function getMe() {
    const data = await MeApi.getMe();
    setMe(data);
  }

  return (
    <StyledScreen>
      <ScreenTopBar me={me} />
      <OutletContainer>
        {/* <NavSideBar/> */}
        <ProSideBar
          server={server}
        />
        <StyledOutlet/>
      </OutletContainer>
    </StyledScreen>
  )
}

const StyledScreen = styled(Screen)`
  overflow: hidden;
  height: 90vh;
  width: 100vw;
  padding: 0;
`;

const OutletContainer = styled(Row)`
  // accounts for scroll bar
  min-width: 101vw;
  max-width: 101vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
`;

const StyledOutlet = styled(Outlet)`

`;

export default Dashboard