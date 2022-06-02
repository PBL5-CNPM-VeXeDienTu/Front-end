import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import useAuth from 'hooks/useAuth'
import './profile.scss'

function Profile() {
    const { user } = useAuth()
    const avatarURL = process.env.REACT_APP_API_URL + user.UserInfo?.avatar
    const gender = user.gender ? 'Nam' : 'Nữ'
    const [birthday, setBirthday] = useState('01-01-2001')

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.USER_AVATAR
    }

    useEffect(() => {
        try {
            if (user) {
                const [month, day, year] = moment(user.UserInfo?.birthday)
                    .format('L')
                    .split('/')
                setBirthday([day, month, year].join('/'))
            }
        } catch (error) {}
    }, [user])

    return (
        <div className="profile-content">
            <div className="title">
                <span>Profile</span>
                <Link
                    to={`/profile/${user.id}/edit`}
                    className="profile-content__button-edit"
                >
                    <EditOutlined />
                </Link>
            </div>

            <div className="profile-content__sub">
                <div className="profile-content__sub__avatar">
                    <img
                        src={avatarURL}
                        alt="avatar"
                        onError={handleGetImageError}
                    />
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
                        <span>{user.UserInfo?.address}</span>
                    </div>
                    <div>
                        <span className="properties">Số điện thoại</span>
                        <span>{user.UserInfo?.phone_number}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
