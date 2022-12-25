import React, {useContext} from "react";
import {
    Menu,
    MenuItem,
    Sidebar,
    useProSidebar,
    menuClasses
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogIn, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {Link} from "react-router-dom";
import {Context} from "./reducer";
import Avatar from '@mui/material/Avatar';



const Header = (props) => {
    const { collapseSidebar, collapsed } = useProSidebar();
    const {state, dispatch} = useContext(Context);

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

                        {state.isLogIn &&
                            <div className={"Avatar"}>
                                <Avatar>П</Avatar>
                                <p>{collapsed ? undefined : "Пользователь"}</p>
                            </div>
                        }

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
                                routerLink={
                                <Link to={"/"} />
                            }
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

                            {state.isLogIn && <MenuItem
                                routerLink={
                                    <Link to={"/shoplist"} />}
                                icon={<AiOutlineShoppingCart color={'whitesmoke'} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                Корзина
                            </MenuItem>
                            }
                        </Menu>
                         <Menu iconShape="square">
                             {!state.isLogIn && <MenuItem
                                 routerLink={
                                     <Link to={"/login"} />}
                                icon={<FiLogIn color={'whitesmoke'} />}
                                rootStyles={{
                                    ['.' + menuClasses.button]: {
                                        '&:hover': {
                                            backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                        },
                                    },
                                }}
                            >
                                Войти
                            </MenuItem>}
                             {state.isLogIn && <MenuItem
                                 onClick={() => dispatch({type: 'LOGOUT' })}
                                 icon={<FiLogOut color={'whitesmoke'} />}
                                 rootStyles={{
                                     ['.' + menuClasses.button]: {
                                         '&:hover': {
                                             backgroundImage: 'linear-gradient(0deg, red 0%, darkred 100%)',
                                         },
                                     },
                                 }}
                             >
                                 Выйти
                             </MenuItem>}
                        </Menu>
                    </div>
                </Sidebar>
            </div>
        </>
    );
}

export default Header;