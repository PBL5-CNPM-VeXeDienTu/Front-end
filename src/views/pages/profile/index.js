import React from 'react';
import useAuth from 'hooks/useAuth';
import './profile.scss';

function Profile() {
    const { user } = useAuth();
    const avatarURL = process.env.REACT_APP_API_URL + user.avatar;
    const gender = user.gender ? 'Nam' : 'Nữ';
    let birthday = '01/01/2022';
    try {
        const dateFormat = user.birthday.split('T')[0].split('-');
        birthday = [dateFormat[2], dateFormat[1], dateFormat[0]].join('/');
    } catch (error) {}

    return (
        <div className="container">
            <div className="content-card">
                <div className="title">Profile</div>
                <div className="content-user">
                    <div className="content-user-avatar">
                        <img
                            className="profile-avatar"
                            src={avatarURL}
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
                                <td>{gender}</td>
                            </tr>
                            <tr>
                                <th className="row-item">Ngày sinh</th>
                                <td>{birthday}</td>
                            </tr>
                            <tr>
                                <th className="row-item">Địa chỉ</th>
                                <td>
                                    <span>{user.address}</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Số điện thoại</th>
                                <td>{user.phone_number}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
