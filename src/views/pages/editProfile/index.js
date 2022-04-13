import React from 'react';
import avatar from 'assets/images/avatar.jpg';
import './editprofile.scss';
import { Input } from 'antd';
import { Radio } from 'antd';
import { DatePicker, Space } from 'antd';

function Profile() {
    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
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
                    </div>
                    <div className="content-user-infor">
                        <table className="content-user-infor-table">
                            <tr>
                                <th className="row-item">Tên</th>
                                <td>
                                    <Input
                                        size="medium"
                                        className="textbox"
                                        value="Phạm Văn Thọ"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Email</th>
                                <td>
                                    <Input
                                        size="medium"
                                        className="textbox"
                                        value="Thopham.21082001@gmail.com"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Giới tính</th>
                                <td>
                                    <Radio.Group
                                        onChange={onChange}
                                        value={value}
                                    >
                                        <Radio className="radiogroup" value={1}>
                                            {' '}
                                            Nam{' '}
                                        </Radio>
                                        <Radio className="radiogroup" value={2}>
                                            {' '}
                                            Nữ{' '}
                                        </Radio>
                                    </Radio.Group>
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Ngày sinh</th>
                                <td>
                                    <Space direction="vertical">
                                        <DatePicker
                                            className="calendar"
                                            size="medium"
                                            onChange={onChange}
                                        />
                                    </Space>
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Địa chỉ</th>
                                <td>
                                    <Input
                                        className="textbox"
                                        size="medium"
                                        value="Tổ 3 , thôn Đại la, xã Hòa Sơn, huyện Hòa vang , TP Đà Nẵng"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="row-item">Số điện thoại</th>
                                <Input
                                    className="textbox"
                                    size="medium"
                                    value="0702399134"
                                />
                            </tr>
                            <tr>
                                <th className="row-item">
                                    <button className="savebtn">Save</button>
                                </th>
                                <td>
                                    <button className="cancelbtn">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
