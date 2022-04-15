import React from 'react';

const SelectedServer = {
    server: undefined,
    setSelectedServer: (val: any) => {}
};

export const SelectedServerContext = React.createContext(SelectedServer);