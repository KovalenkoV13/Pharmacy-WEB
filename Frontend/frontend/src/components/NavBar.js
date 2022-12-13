import React from "react";
import {
    Menu,
    MenuItem,
    Sidebar,
    useProSidebar,
    menuClasses
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogIn } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import {Link} from "react-router-dom";


const Header = () => {
    const { collapseSidebar, collapsed } = useProSidebar();

    const Collapse = (collapsed) => {
        collapsed ? collapseSidebar(false) : collapseSidebar(true);
    };


    return (
        <>
            <div id="header">
                <Sidebar
                    defaultCollapsed={true}
                    onMouseEnter={() => Collapse(true)}
                    onMouseLeave={() => Collapse(false)}
                >
                    <div className={'Menu'}>
                        <div className="logotext">
                            <p>{collapsed ? "Аптека" : "Аптека"}</p>
                        </div>

                        <Menu iconShape="square"
                              menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                // only apply styles on first level elements of the tree
                                if (level === 0)
                                    return {
                                        color: disabled ? "#222222" : "#222222",
                                        backgroundImage: active ? 'linear-gradient(0deg, red 0%, darkred 100%)' : undefined,
                                    };
                            },

                        }}
                        >
                            <MenuItem
                                routerLink={<Link to={"/"} />}
                                icon={<FiHome color={'whitesmoke'} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                Главная
                            </MenuItem>
                            <MenuItem
                                icon={<FaList color = {'whitesmoke'} />}
                                routerLink={<Link to={"/catalog"} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                Каталог
                            </MenuItem>
                            <MenuItem
                                icon={<FaRegHeart color={'whitesmoke'} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                Избранные
                            </MenuItem>
                            <MenuItem
                                icon={<BiCog color={'whitesmoke'} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                Настройки
                            </MenuItem>
                        </Menu>
                        <Menu iconShape="square">
                            <MenuItem
                                icon={<FiLogIn color={'whitesmoke'} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                LogIn
                            </MenuItem>
                        </Menu>
                    </div>
                </Sidebar>
            </div>
        </>
    );
}

export default Header;