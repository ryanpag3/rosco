import React, { useEffect, useState } from 'react'
import axios from 'util/axios';
import Screen from '../../component/Screen';

const Dashboard = () => {
  const [me, setMe] = useState(undefined as any);
  
  useEffect(() => {
    getMe();
  })

  async function getMe() {
    const { data } = await axios.get('/me');
    setMe(JSON.stringify(data));    
  }

  return (
    <Screen>

    </Screen>
  )
}



export default Dashboard