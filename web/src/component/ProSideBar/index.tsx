import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineUnlock, AiOutlineLink, AiOutlineHome } from 'react-icons/ai';
import { HiBan } from 'react-icons/hi';
import { BsCapslock } from 'react-icons/bs';
import { MdScore } from 'react-icons/md';
import { BiCog } from 'react-icons/bi';
import { RiSoundModuleLine } from 'react-icons/ri';

import 'react-pro-sidebar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Column from 'component/Column';
import Colors from 'util/colors';

const ProSideBar = (props: any) => {
    const navigate = useNavigate();

    return (
        <ProSidebar style={{ zIndex: 0 }}>
            <Menu iconShape="square">
                {
                    props.server !== undefined ?
                        <React.Fragment>
                            <MenuItem
                                onClick={() => navigate('home')}
                                icon={<AiOutlineHome />}>Home</MenuItem>
                            <SubMenu
                                title="Configuration"
                                defaultOpen={true}
                                icon={<BiCog />}
                            >
                                <MenuItem
                                    icon={<BiCog />}
                                    onClick={() => navigate('config')}
                                >
                                    Main
                                </MenuItem>
                                <MenuItem
                                    onClick={() => navigate('permissions')}
                                    icon={<AiOutlineUnlock />}
                                >
                                    Permissions
                                </MenuItem>
                            </SubMenu>
                            <SubMenu
                                title="Modules"
                                defaultOpen={true}
                                icon={<RiSoundModuleLine />}
                            >
                                <MenuItem
                                    onClick={() => navigate('auto-mod/banned-words')}
                                    icon={<HiBan />}>Banned Words</MenuItem>
                                <MenuItem
                                    onClick={() => navigate('auto-mod/capslock-detect')}
                                    icon={<BsCapslock />}>Capslock Spam</MenuItem>
                                <MenuItem
                                    onClick={() => navigate('auto-mod/link-detect')}
                                    icon={<AiOutlineLink />}>Link Detection</MenuItem>
                                <MenuItem
                                    onClick={() => navigate('scores')}
                                    icon={<MdScore />}>Scores</MenuItem>
                            </SubMenu>
                        </React.Fragment> 
                        :
                        <SelectServerContainer>
                            <span>Select a server to get started.</span>
                        </SelectServerContainer>
                        
                }
            </Menu>
        </ProSidebar>
    )
}

const SelectServerContainer = styled(Column)`
    justify-content: center;
    align-items: center;
    color: ${Colors.TEXT_LIGHT};
`;

export default ProSideBar;