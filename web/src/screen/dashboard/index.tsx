import { getGuild } from 'api/guild';
import ScreenTopBar from 'component/ScreenTopBar';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocalStorageKey from 'util/localstorage-key';
import Screen from '../../component/Screen';

const Dashboard = ({ me, server }: {
  me: any;
  server: any;
}) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!params.serverId && server?.id) || (params.serverId !== server?.id && server?.id)) {
      navigate(`/dashboard/${server.id}`);
    } else {
      navigate(`/dashboard`)
    }
  }, [server]);

  useEffect(() => {
    if (!server)
      return;
    
    getGuild(server.id)
      .then((r) => 
      {
        console.log(r)
      })
      .catch((e) => {
        localStorage.removeItem(LocalStorageKey.SELECTED_SERVER);
        window.location.href = "https://discord.com/oauth2/authorize?client_id=955851785346613248&scope=bot%20applications.commands&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Froscobot.com";
    })
  }, [ server ]);

  return (
    <Screen>
      <ScreenTopBar me={me} />
      <Text>{JSON.stringify(server)}</Text>
    </Screen>
  )
}

const Text = styled.span`
  color: white;
`;

export default Dashboard