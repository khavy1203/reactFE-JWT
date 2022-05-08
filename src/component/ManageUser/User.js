
import './User.scss';
import { fetchAllUser } from '../../services/userService';
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { deleteUser } from '../../services/userService';
import ModalDeleteUser from './ModalDelete';
import ModalUser from './ModalUser';
require('dotenv').config();
console.log("check env >>>", process.env.REACT_APP_EMAIL_ADMIN)

const User = (props) => {

    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(7);
    const [totalPage, setTotalPage] = useState(0);

    //create user
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [isShowModalUser, setIsShowModalUser] = useState(false);

    //update user
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUpdate, setDataModalUpdate] = useState({});

    useEffect(() => {
        fetchUser();

    }, [currentPage]);//khi currenPage thay đổi thì useE tự động render lại dữ liệu
    const fetchUser = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);

        if (response && +response.EC === 0) {

            setTotalPage(response.DT.totalPages);
            setListUser(response.DT.users);

        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);// lỗi bất đồng bộ, cách fix thêm chỉ số vào fetchUser
        await fetchUser();
    }
    //delete modal
    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    }
    const handleClose = () => {
        setDataModal({});
        setIsShowModalDelete(false);
    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);//ban đầu là xóa user nhưng thuận tiện truyền dữ liệu thì sài cách này đồng thời dataModal cũng là 1 user luôn
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            await fetchUser();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }

    }
    //update modal
    const handleModalUserClose = () => {
        setIsShowModalUser(false);

    }
    const handUpdateUser = (item) => {
        setActionModalUser("UPDATE");
        setDataModalUpdate(item);
        setIsShowModalUser(true);
    }

    const handleShowCreateModalUser = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true);
    }
    return (
        <>
            <div className="container">
                <div className="manage-user-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table user</h3>
                        </div>
                        <div className="action">

                            <button className="btn btn-success" onClick={() => handleShowCreateModalUser()}><i class="fa fa-plus"></i>Add new user</button>
                        </div>
                    </div>


                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUser && listUser.length > 0 ?
                                        <>
                                            {listUser.map((item, index) => {
                                                let admin = process.env.REACT_APP_EMAIL_ADMIN;
                                                if (admin === item.userEmail) return;
                                                return (
                                                    <tr key={`row-${index}`}>
                                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                        <td>{item.userEmail}</td>
                                                        <td>{item.userName}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.groupId ? item.Group.name : ""}</td>
                                                        <td>
                                                            <button className="btn btn-warning m-2" onClick={() => handUpdateUser(item)}><i class="fa fa-pencil-square-o" ></i></button>
                                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(item)}><i class="fa fa-trash" ></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td>Không có user nào</td>
                                            </tr>
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="user-footer">
                        {totalPage > 0 &&
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        }
                    </div>

                </div>
            </div>
            <ModalDeleteUser
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                show={isShowModalUser}
                action={actionModalUser}
                handleModalUserClose={handleModalUserClose}
                fetchUser={fetchUser}
                dataModalUpdate={dataModalUpdate}
            />
        </>

    )
}
export default User;