import React from 'react';
import avatar from 'assets/images/avatar.jpg';
import './profile.scss';

function Profile() {
    return (
        // <Layout_basic>
        //   <Layout_basic.Main>
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
                                <td>Phạm Văn Thọ</td>
                            </tr>
                            <tr>
                                <th className="row-item">Email</th>
                                <td>Thopham.21082001@gmail.com</td>
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
                                    <span>
                                        Tổ 3 , thôn Đại la, xã Hòa Sơn, huyện
                                        Hòa vang , TP Đà Nẵng
                                    </span>
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
