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
import { AxiosError } from 'axios';
import InviteUrl from 'util/invite-url';
import MobileWarning from './MobileWarning';


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
        if ((e as AxiosError)?.response?.status !== 403)
          return
        
        setSelectedServer(undefined);
        navigate('/dashboard');
        localStorage.removeItem(LocalStorageKey.SELECTED_SERVER);
        // TODO: standardize URLs
        window.location.href = InviteUrl;
    });
  }, [ server ]);

  async function getMe() {
    const data = await MeApi.getMe();
    setMe(data);
  }

  return (
    <StyledScreen>
      <MobileWarning/>
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