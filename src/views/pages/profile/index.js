import React from 'react';
<<<<<<< Updated upstream
import avatar from 'assets/images/avatar.jpg';
import './profile.scss';

function Profile() {
=======
import useAuth from 'hooks/useAuth';
import './profile.scss';

function Profile() {
    const { user } = useAuth();
    const gender = user.gender ? 'Nam' : 'Nữ';
    const avatar = 'http://localhost:8000/' + user.avatar;
    let birthday = '01/01/2022';
    try {
        const dateFormat = user.birthday.split('T')[0].split('-');
        birthday = [dateFormat[2], dateFormat[1], dateFormat[0]].join('/');
    } catch (error) {}

>>>>>>> Stashed changes
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
                                <td>{gender}</td>
                            </tr>
                            <tr>
                                <th className="row-item">Ngày sinh</th>
                                <td>{birthday}</td>
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
                                <td>{user.phone_number}</td>
                            </tr>
                        </table>
                    </div>

                    {/* <div className="content-user-infor">
                            <div className="user-infor-name">
                                <div className="user-infor-name-lable">Tên</div>
                                <div className='user-infor-name-input'>Phạm Văn Thọ</div>
                            </div>
                            <div className="user-infor-email">
                                <div className="user-infor-email-lable">Email</div>
                                <div className='user-infor-email-input'>Thopham.21082001@gmail.com</div>
                            </div>
                            <div className="user-infor-gender">
                                <div className="user-infor-gender-lable">Giới tính</div>
                                <div className='user-infor-email-input-item'>Nam</div>
                            
                            </div>
                            <div className="user-infor-birthday">
                                <div className="user-infor-birthday-lable">Ngày sinh</div>
                                <div className='user-infor-birthday-input-day'>31/08/2001</div>
                                <div className='user-infor-birthday-input-icon'>
                                      <ScheduleOutlined />
                                </div>
                            </div>
                            <div className="user-infor-address">
                                <div className="user-infor-address-lable">Địa chỉ</div>
                                <div className='user-infor-address-input'>Tổ 3 , thôn Đại la, xã Hòa Sơn, huyện Hòa vang , TP Đà Nẵng</div>
                            </div>
                            <div className="user-infor-phone">
                                <div className="user-infor-phone-lable">Số điện thoại</div>
                                <div className='user-infor-phone-input'>0702399134</div>
                            </div>
                    </div> */}
                </div>
            </div>
            {/* </Layout_basic.Main> */}
            {/* </Layout_basic> */}
        </div>
    );
}

export default Profile;
