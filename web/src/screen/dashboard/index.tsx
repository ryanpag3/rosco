import { getGuild } from 'api/guild';
import NavSideBar from 'component/NavSideBar';
import Row from 'component/Row';
import ScreenTopBar from 'component/ScreenTopBar';
import React, { useEffect } from 'react'
import { Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocalStorageKey from 'util/localstorage-key';
import Screen from '../../component/Screen';

const Dashboard = ({ me, server, setSelectedServer }: {
  me: any;
  server: any;
  setSelectedServer: any;
}) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.serverId) {
      navigate('/dashboard');
    }
  }, [server]);

  useEffect(() => {
    if (!server)
      return;
    
    getGuild(server.id)
      .then((r) => console.log(r))
      .catch((e) => {
        setSelectedServer(undefined);
        navigate('/dashboard');
        localStorage.removeItem(LocalStorageKey.SELECTED_SERVER);
        window.location.href = "https://discord.com/oauth2/authorize?client_id=955851785346613248&scope=bot%20applications.commands&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Froscobot.com";
    })
  }, [ server ]);

  return (
    <Screen>
      <ScreenTopBar me={me} />
      <OutletContainer>
        <NavSideBar/>
        <Outlet/>
      </OutletContainer>
    </Screen>
  )
}

const OutletContainer = styled(Row)`
  flex-grow: 1;
`;

export default Dashboard