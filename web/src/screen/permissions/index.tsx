import Screen from 'component/Screen'
import { SelectedServerContext } from 'context/selected-server-context'
import React from 'react'
import PermissionTable from './PermissionTable'

const Permissions = () => {
  return (
    <Screen>
      <SelectedServerContext.Consumer>
        {
          ({ server }) => (
            <PermissionTable server={server}/>
          )
        }
      </SelectedServerContext.Consumer>
    </Screen>
  )
}

export default Permissions