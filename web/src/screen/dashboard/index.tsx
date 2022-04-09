import ScreenTopBar from 'component/ScreenTopBar';
import React, { useEffect, useState } from 'react'
import axios from 'util/axios';
import Screen from '../../component/Screen';

const Dashboard = ({ me }: {
  me: any
}) => {


  return (
    <Screen>
      <ScreenTopBar me={me}/>
    </Screen>
  )
}



export default Dashboard