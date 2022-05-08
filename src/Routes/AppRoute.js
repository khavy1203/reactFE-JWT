import {
    Switch,
    Route,
} from "react-router-dom";
import Login from '../component/Login/Login';
import Register from '../component/Register/Register';
import User from '../component/ManageUser/User';
import PrivateRoutes from "./PrivateRoutes";
import Role from '../component/Role/Role';
import GroupRole from '../component/GroupRole/GroupRole';
const AppRoutes = (props) => {
    return (<>
        <Switch>

            {/* <Route path="/users">
                <User />
            </Route>
            <Route path="/project">
                Project
            </Route> */}
            <PrivateRoutes path="/users" component={User} />
            <PrivateRoutes path="/roles" component={Role} />
            <PrivateRoutes path="/group-role" component={GroupRole} />
            <Route path="/project">
                Project
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

            <Route path="/home">
                home
            </Route>

            <Route path="/contact">
                contact
            </Route>
            <Route path="/about">
                about
            </Route>


            <Route path="/" exact>
                home
            </Route>
            <Route path="*">
                404
            </Route>
        </Switch>
    </>)

}
export default AppRoutes;