import './Register.scss';
import { useHistory } from "react-router-dom";
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginRegisterUser } from '../../services/userService';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("")
    const defaultValidInput = {
        isInvalidEmail: true,
        isInvalidPhone: true,
        isInvalidUsername: true,
        isInvalidPassword: true,
        isInvalidConfirmpassword: true
    }
    const [objCheckInput, setobjCheckInput] = useState(defaultValidInput);
    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/test-api").then(data => {
        //     console.log("Check data axios >>>>", data);
        // })
        // axios.post('http://localhost:8080/api/v1/register', {
        //     email, phone, username, password
        // });
    }, []);
    let history = useHistory();
    const handleHaveAccount = () => {
        history.push("/login");
    }

    const checkValidation = () => {
        setobjCheckInput(defaultValidInput);
        if (!email) {
            toast.warn("Please enter an email address");
            setobjCheckInput({ ...defaultValidInput, isInvalidEmail: false });
            return false;
        }
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            toast.warn("pls enter ****@gmail.com");
            setobjCheckInput({ ...defaultValidInput, isInvalidEmail: false });
            return false;
        }

        if (!phone) {
            toast.warn("Please enter a phone number");
            setobjCheckInput({ ...defaultValidInput, isInvalidPhone: false });
            return false;
        }
        if (!username) {
            toast.warn("Please enter a username");
            setobjCheckInput({ ...defaultValidInput, isInvalidUsername: false });
            return false;
        }
        if (!password) {

            toast.warn("Please enter a password");
            setobjCheckInput({ ...defaultValidInput, isInvalidPassword: false });
            return false;
        }
        if (!confirmpassword) {
            toast.warn("Please enter a confirmpassword");
            setobjCheckInput({ ...objCheckInput, isInvalidConfirmpassword: false });
            return false;
        }
        if (password !== confirmpassword) {
            toast.warn("Please enter a confirmpassword match the password");
            setobjCheckInput({ ...objCheckInput, isInvalidConfirmpassword: false });
            return false;
        }

        return true;
    }
    const handleRegister = async () => {
        if (checkValidation()) {
            let createUser = await loginRegisterUser(email, phone, username, password);
            console.log("check register >>>", createUser);
            if (+createUser.EC === 0) {
                toast.success(createUser.EM);
                history.push("/login");
            }
            else {
                toast.warn(createUser.EM);
            }
        }
    }
    return (
        <div className="register-container mt-3">
            <div className="container">
                <div className="row p-3">
                    <div className="content-left col-12 col-sm-7 text-center text-sm-start ">
                        <div className="brand display-6">DEV</div>
                        <div className="detail d-none d-sm-block">
                            Nguồn cảm hứng thế hệ trẻ
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 gap-3 p-3 d-flex flex-column bg-white">
                        <div className="form-group">
                            <label htmlFor="Email" className="col-form-label">Email:</label>
                            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={objCheckInput.isInvalidEmail == true ? 'form-control' : 'form-control is-invalid'} placeholder="Email address or phone number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Phone" className="col-form-label">Phone Number:</label>
                            <input type="phone" required className={objCheckInput.isInvalidPhone ? "form-control" : "form-control is-invalid"} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone Number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="User Name" className="col-form-label">User Name:</label>
                            <input type="text" required className={objCheckInput.isInvalidUsername ? "form-control" : "form-control is-invalid"} value={username} onChange={(event) => setName(event.target.value)} placeholder="User Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password" className="col-form-label">Password:</label>
                            <input type="password" required className={objCheckInput.isInvalidPassword ? "form-control" : "form-control is-invalid"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Re-enter Password" className="col-form-label">Re-enter Password:</label>
                            <input type="password" required className={objCheckInput.isInvalidConfirmpassword ? "form-control" : "form-control is-invalid"} value={confirmpassword} onChange={(event) => setConfirmpassword(event.target.value)} placeholder="Re-enter Password" />
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={() => handleRegister()}>Register</button>

                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleHaveAccount()}>Already've  an account. Login
                            </button>

                        </div>

                    </div>
                </div>

            </div >
        </div >
    )
}
export default Register;