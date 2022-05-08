
import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from "../../context/UserContext";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropDown from 'react-bootstrap/NavDropdown';
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';
import logo from '../../logo.svg';
const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const handleLogout = async () => {
        let data = await logoutUser();
        localStorage.removeItem('jwt');
        logoutContext();//cập nhật lại context để render lại dữ liệu
        if (data && +data.EC === 0) {
            toast.success('logout succeeds');
            history.push('/login');

        } else {
            toast.error(data.EM);
        }
    }
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>


                <div className="nav-header">
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">
                                <span className="brand-name"></span>
                            </Navbar.Brand>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                    <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                    <NavLink to="/group-role" className="nav-link">Group-Roles</NavLink>
                                    <NavLink to="/project" className="nav-link">Project</NavLink>
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true
                                        ?
                                        <>
                                            <Nav.Item className="nav-link">
                                                wellcome {user.account.username} !
                                            </Nav.Item>
                                            <NavDropDown title="Settings" id="basic-nav-dropdown">
                                                <NavDropDown.Item className="drop-item" href="#">Change Password</NavDropDown.Item>
                                                <NavDropDown.Divider />
                                                <NavDropDown.Item className="drop-item">
                                                    <span onClick={() => handleLogout()}>Log Out</span>
                                                </NavDropDown.Item>
                                            </NavDropDown>
                                        </>
                                        :
                                        <>
                                            <Link className="nav-link" to='/login'> Login</Link>
                                        </>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

            </>
        );
    } else {
        return <></>
    }


}

export default NavHeader;