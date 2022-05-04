import { Route } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Login from '../component/Login/Login';
const PrivateRoutes = (props) => {
    //check quyền khi vào router

    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated === true) {

        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    }
    else {
        return (
            <>
                <Redirect from="/users" to="/login" />
            </>
        )
    }

}
export default PrivateRoutes;