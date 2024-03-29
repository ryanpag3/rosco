import { SelectedServerContext } from 'context/selected-server-context';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Select, { components, StylesConfig } from 'react-select'
import styled from 'styled-components'
import Colors from 'util/colors';
import LocalStorageKey from 'util/localstorage-key';
import * as MeApi from '../../api/me';


const ServerSelect = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [isInit, setIsInit] = useState(false);
    const [serverId, setServerId] = useState(params.serverId);

    useEffect(() => {
        if (isInit === true)
            return;

        getMyServers()
            .then((data) => {
                setIsInit(true);
                setOptions(data)
                setIsLoading(false);
            });
    }, [isInit]);

    const getMyServers = async () => {
        setIsLoading(true);
        let servers = await MeApi.getMyServers();
        servers = servers.map((s: any) => {
            return {
                value: s.name,
                label: s.name,
                icon: s.icon,
                id: s.id
            }
        }).sort((a: any, b: any) => {
            if (a.value > b.value)
                return 1;
            if (a.value < b.value)
                return -1;
            return 0;
        })
        return servers;
    }

    return (
        <SelectedServerContext.Consumer>
            {({ server, setSelectedServer }) => {
                if (serverId) {
                    const [ s ] = options.filter((s: any) => s.id === serverId);
                    server = s;
                    if (s && (server as any).id !== (s as any).id) {
                        setSelectedServer(s);
                    }
                } else if (server && !params.serverId) {
                    server = undefined;
                    setSelectedServer(undefined);
                }

                return (
                    <Container>
                        <Select
                            placeholder='Select Server'
                            styles={SelectStyle}
                            components={{
                                SingleValue: ({ children, ...rest }) => (
                                    <components.SingleValue {...rest}>
                                        <ServerIcon src={(rest.data as any).icon} /> {children}
                                    </components.SingleValue>
                                ),
                                Option: ({ children, ...rest }) => (
                                    <components.Option {...rest}>
                                        <ServerIcon src={(rest.data as any).icon} /> {children}
                                    </components.Option>
                                )
                            }}
                            value={server}
                            options={options}
                            isLoading={isLoading}
                            onChange={(val) => {
                                navigate('/dashboard/' + (val as any).id + '/home');
                                setServerId(undefined);
                                localStorage.setItem(
                                    LocalStorageKey.SELECTED_SERVER, 
                                    JSON.stringify(val)
                                );
                                setSelectedServer(val)
                            }}
                        />
                    </Container>
                )
            }}

        </SelectedServerContext.Consumer>

    )
}

const Container = styled.div`
    margin-left: 1em;
`;

const backgroundColor = Colors.DROPDOWN_BACKGROUND_LIGHT;
const focusedBackgroundColor = Colors.BACKGROUND_LIGHT;
const textColor = Colors.TEXT_DARK;

const SelectStyle: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        fontFamily: 'nunito',
        border: 0,
        boxShadow: 'none',
        minWidth: '20em',
        backgroundColor
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: textColor
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: textColor
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: textColor,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
    }),
    container: (provided, state) => ({
        ...provided,
        color: Colors.TEXT_DARK,
        borderColor: 'black',
        fontSize: '.85em'
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'transparent'
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor,
        zIndex: 3
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ?
            focusedBackgroundColor : backgroundColor,
        color: textColor,
        fontWeight: state.isFocused ? 'bold' : 'normal',
        display: 'flex',
        alignItems: 'center'
    })
}

const ServerIcon = styled.img`
    min-width: 2em;
    width: 2em;
    border-radius: .35em;
    margin-right: .5em;
`;

export default ServerSelect