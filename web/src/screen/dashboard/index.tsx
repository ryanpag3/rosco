import ScreenTopBar from 'component/ScreenTopBar';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'util/axios';
import Screen from '../../component/Screen';

const Dashboard = ({ me, server }: {
  me: any;
  server: any;
}) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!params.serverId && server.id) || (params.serverId !== server.id && server.id)) {
      navigate(`/dashboard/${server.id}`);
    }
  }, [server]);

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