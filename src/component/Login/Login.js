import './Login.scss';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { loginUser } from '../../services/userService';


const Login = (props) => {
    const [accountLogin, setAccountLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultValidInput = {
        isInvalidAccount: true,
        isInvaliPassword: true,
    }
    const [objCheckInput, setobjCheckInput] = useState(defaultValidInput);

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) history.push('/home');
    }, []);
    const handleLogin = async () => {
        setobjCheckInput(defaultValidInput);
        if (!accountLogin) {
            toast.warn("Please enter an account");
            setobjCheckInput({ ...defaultValidInput, isInvalidAccount: false });
            return false;
        }
        if (!password) {
            toast.warn("Please enter an password");
            setobjCheckInput({ ...defaultValidInput, isInvalidPassword: false });
            return false;
        }
        let response = await loginUser(accountLogin, password);
        if (response && +response.EC === 0) {
            //success
            let data = {
                isAuthenticated: true,
                token: 'fake data'
            }
            sessionStorage.setItem('account', JSON.stringify(data));
            history.push("/users");
            window.location.reload();
            //redux
        }
        if (response && +response.EC !== 0) {
            //fail
            toast.warn(response.EM);
        }
        return true;
    }


    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register")
    }
    const handleKeyPressEnter = (event) => {
        if (event.charCode === 13) {
            handleLogin();
        }

    }
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row p-3">
                    <div className="content-left col-12 col-sm-7 text-center text-sm-start ">
                        <div className="brand display-6">DEV</div>
                        <div className="detail d-none d-sm-block">
                            Nguồn cảm hứng thế hệ trẻ
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 gap-3 p-3 d-flex flex-column bg-white">
                        <input type="text" className={objCheckInput.isInvalidAccount ? 'form-control' : 'form-control is-invalid'} required value={accountLogin} onChange={(event) => setAccountLogin(event.target.value)} placeholder="Email address or phone number" />
                        <input type="password"
                            className={objCheckInput.isInvaliPassword ? 'form-control' : 'form-control is-invalid'}
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handleKeyPressEnter(event)}
                            placeholder="password" />
                        <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
                        <span className="text-center text-info "><a href="#" className="forgot-password">Forgot your password</a></span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>Create new account
                            </button>

                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}
export default Login;