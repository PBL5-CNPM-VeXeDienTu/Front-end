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

            <div className="profile-content__sub">
                <div className="profile-content__sub__avatar">
                    <img src={avatarURL} alt="avatar" />
                </div>

                <div className="profile-content__sub__info">
                <div>
                        <span className="properties">Tên</span>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <span className="properties">Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div>
                        <span className="properties">Giới tính</span>
                        <span>{gender}</span>
                    </div>
                    <div>
                        <span className="properties">Ngày sinh</span>
                        <span>{birthday}</span>
                    </div>
                    <div>
                        <span className="properties">Địa chỉ</span>
                        <span>{user.address}</span>
                    </div>
                    <div>
                        <span className="properties">Số điện thoại</span>
                        <span>{user.phone_number}</span>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Profile
