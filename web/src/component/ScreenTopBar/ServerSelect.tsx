import React, { useEffect, useState } from 'react'
import Select, { components, StylesConfig } from 'react-select'
import AsyncSelect from 'react-select/async';
import styled from 'styled-components'
import * as MeApi from '../../api/me';


const ServerSelect = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        if (isInit === true) 
            return;
        
        getMyServers()
            .then((data) => {
                setIsInit(true);
                setOptions(data)
            });
    }, [ isInit ]);

    const getMyServers = async () => {
        setIsLoading(true);
        let servers = await MeApi.getMyServers();
        servers = servers.map((s: any) => {
            return {
                value: s.name,
                label: s.name
            }
        })
        setIsLoading(false);
        return servers;
    }

    return (
        <Container>
            <Select
                placeholder='Select Server'
                styles={SelectStyle}
                components={{
                    Option: ({ children, ...rest }) => (
                        <components.Option {...rest}>
                            (pic) {children}
                        </components.Option>
                    )
                }}
                options={options}
                isLoading={isLoading}
            />
        </Container>
    )
}

const Container = styled.div`
    margin-left: 1em;
`;

const backgroundColor = '#f0f0f0';
const focusedBackgroundColor = '#ffffff';
const textColor = '#000000';

const SelectStyle: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        fontFamily: 'nunito',
        border: 0,
        boxShadow: 'none',
        minWidth: '18em',
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
        fontWeight: 'bold'
    }),
    container: (provided, state) => ({
        ...provided,
        color: 'black',
        borderColor: 'black',
        fontSize: '.85em'
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'transparent'
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ?
            focusedBackgroundColor : backgroundColor,
        color: textColor,
        fontWeight: state.isFocused ? 'bold' : 'normal'
    })
}

export default ServerSelect