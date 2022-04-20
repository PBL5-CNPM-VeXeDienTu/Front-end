import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

import useAuth from 'hooks/useAuth'
import './profile.scss'

function Profile() {
    const { user } = useAuth()
    // alert(user.birthday)
    const avatarURL = process.env.REACT_APP_API_URL + user.avatar
    const gender = user.gender ? 'Nam' : 'Nữ'
    const [birthday, setBirthday] = useState('01-01-2001')
    useEffect(() => {
        try {
            if (user) {
                const [month, day, year] = moment(user.birthday)
                    .format('L')
                    .split('/')
                setBirthday([day, month, year].join('/'))
            }
        } catch (error) {}
    }, [user])

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-content__title">
                    <span>Profile</span>
                    <Link
                        to="/profile/edit"
                        className="profile-content__button-edit"
                    >
                        <EditOutlined />
                    </Link>
                </div>

                <div className="profile-content__user">
                    <div className="profile-content__user__avatar">
                        <img src={avatarURL} alt="avatar"></img>
                        {/* <button className="profile-content__user__button-edit">
                            <Link to="/profile/edit">Chỉnh sửa</Link>
                        </button> */}
                    </div>

                    <div className="profile-content__user__infor">
                        <table className="profile-content__user__infor__table">
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
    )
}

export default Profile
