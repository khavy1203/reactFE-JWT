import {
    Switch,
    Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
const PrivateRoutes = (props) => {
    //check quyền khi vào router
    let history = useHistory();
    let session = sessionStorage.getItem('account');
    useEffect(() => {
        if (!session) history.push('/login');
    }, []);
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    )
}
export default PrivateRoutes;