import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchGroup, createNewUser, updateCurrentUser } from "../../services/userService";
import _ from 'lodash';
const ModalUser = (props) => {

    const { action, dataModalUpdate } = props; //thay vi props.action...

    const defaultUserData = {
        userEmail: '',
        phone: '',
        userName: '',
        userPassword: '',
        address: '',
        sex: '',
        groupId: ''
    }

    const validInputDefault = {
        userEmail: true,
        phone: true,
        userName: true,
        userPassword: true,
        address: true,
        sex: true,
        groupId: true
    }

    const [userGroups, setUserGroup] = useState([]);
    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputDefault);
    useEffect(() => {
        getGroups();

    }, []);

    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModalUpdate, groupId: dataModalUpdate.Group && dataModalUpdate.groupId ? dataModalUpdate.Group.id : "" });
        }
    }, [dataModalUpdate]);

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...defaultUserData, groupId: userGroups[0].id });
            }
        }
    }, [action])
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }
    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && +res.EC === 0) {

            setUserGroup(res.DT);
            let groupId = res.DT;
            if (groupId.length > 0) {
                setUserData({ ...userData, groupId: groupId[0].id })
            }
        }
        else {
            toast.error(res.EM);
        }
    }
    const checkValidateInput = () => {
        // if (action === "UPDATE") return true;//update thi ko validation
        //create user
        setValidInput(validInputDefault);
        let array = ['userEmail', 'phone', 'userName', 'userPassword', 'groupId'];
        let check = true;
        for (let i = 0; i < array.length; i++) {
            if (!userData[array[i]]) {
                if (array[i] === "userPassword" && action === "UPDATE") continue;
                //set lai gia tri input bang false khi gia tri trong
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[array[i]] = false;
                setValidInput(_validInput);

                toast.error(`Empty input ${array[i]}`);

                check = false;
                break;
            }
        }
        return check;
    }
    const handleConfirmUser = async () => {
        let check = checkValidateInput();
        if (check === true) {
            if (!userData['sex']) userData['sex'] = "Male";
            let res = action === "CREATE" ?
                await createNewUser(userData) : await updateCurrentUser(userData);
            if (+res.EC === 0) {
                toast.success(res.EM);

                props.fetchUser();
                setUserData({
                    ...defaultUserData,
                    groupId: userGroups && userGroups.length > 0 ? userGroups[0].id : ''
                });
                props.handleModalUserClose();
                //set lại giá trị group

            } else if (+res.EC !== 0) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[res.DT] = false;
                setValidInput(_validInput);
                toast.error(res.EM);
            }
        }
    }
    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.handleModalUserClose} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span> {props.action === "CREATE" ? "Create new user" : "Edit a user"} </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-groupId">
                            <label>Email Address(<span className="red">*</span>) :</label>

                            <input className={validInput.userEmail ? "form-control" : "form-control is-invalid"} type="userEmail"
                                readOnly={action === "UPDATE" ? true : false}
                                value={userData.userEmail}
                                onChange={(event) => handleOnchangeInput(event.target.value, "userEmail")}
                            />


                        </div>
                        <div className="col-12 col-sm-6 form-groupId">
                            <label>Phone Number(<span className="red">*</span>) :</label>
                            <input className={validInput.phone ? "form-control" : "form-control is-invalid"}
                                readOnly={action === "UPDATE" ? true : false}
                                type="text"
                                value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-groupId">
                            <label>User Name (<span className="red">*</span>) :</label>
                            <input className={validInput.userName ? "form-control" : "form-control is-invalid"}
                                type="text"
                                value={userData.userName}
                                onChange={(event) => handleOnchangeInput(event.target.value, "userName")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-groupId">
                            {
                                action === "CREATE" &&
                                <>
                                    <label>
                                        Password (<span className="red">*</span>) :
                                    </label>
                                    <input
                                        className={validInput.userPassword ? "form-control" : "form-control is-invalid"}
                                        type="password"
                                        value={userData.userPassword}
                                        onChange={(event) => handleOnchangeInput(event.target.value, "userPassword")}
                                    />
                                </>
                            }

                        </div>
                        <div className="col-12 form-groupId">
                            <label>Address (<span className="red">*</span>) :</label>
                            <input className={validInput.address ? "form-control" : "form-control is-invalid"} type="text" value={userData.address} onChange={(event) => handleOnchangeInput(event.target.value, "address")} />
                        </div>
                        <div className="col-12 col-sm-6 form-groupId">
                            <label>Gender (<span className="red">*</span>) :</label>
                            <select className="form-select"
                                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                                value={userData.sex}
                            >
                                <option selected value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-12 col-sm-6 form-groupId">
                            <label>Group (<span className="red">*</span>) :</label>

                            <select className="form-select"
                                onChange={(event) => handleOnchangeInput(event.target.value, "groupId")}
                                value={userData.groupId}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`groupId-${index}`} value={item.id}> {item.name}</option>
                                        )

                                    })
                                }

                            </select>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleModalUserClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()
                    }>{action === "CREATE" ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;