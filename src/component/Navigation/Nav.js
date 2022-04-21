import React from 'react';
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './Nav.scss';

const Nav = (props) => {
    const [isShow, setisShow] = useState(true);
    let session = sessionStorage.getItem('account');
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        if (!session) {
            setisShow(false);
            history.push('/login');
        }
    }, []);

    return (
        <>
            {isShow === true &&
                <div className="topnav">
                    <NavLink to="/" exact >Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div >
            }

        </>
    );

}

export default Nav;