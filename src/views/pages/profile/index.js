import React, { useState } from 'react';
import useAuth from 'hooks/useAuth';
import avatar from 'assets/images/avatar.jpg';
import './profile.scss';

function Profile() {
    const { user } = useAuth();

    return (
        <div className="container">
            <div className="content-card">
                <div className="title">Profile</div>
                <div className="content-user">
                    <div className="content-user-avatar">
                        <img
                            className="profile-avatar"
                            src={avatar}
                            alt="avatar"
                        ></img>
                        <button className="profile-user-edit-btn">
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className="content-user-infor">
                        <table className="content-user-infor-table">
                            <tr>
                                <th className="row-item">Tên</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th className="row-item">Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th className="row-item">Giới tính</th>
                                <td>Nam</td>
                            </tr>
                            <tr>
                                <th className="row-item">Ngày sinh</th>
                                <td>31/08/2001</td>
                            </tr>
                            <tr>
                                <th className="row-item">Địa chỉ</th>
                                <td>
                                    <span>{user.address}</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Số điện thoại</th>
                                <td>0702399134</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
