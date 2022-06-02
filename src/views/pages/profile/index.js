import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'

import userApi from 'api/userApi'
import './profile.scss'

function Profile() {
    const { id } = useParams()
    const [user, setUser] = useState({})

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.USER_AVATAR
    }

    useEffect(() => {
        try {
            if (!!id) {
                userApi.getOneById(id).then((response) => {
                    setUser(response.data)
                })
            }
        } catch (error) {}
    }, [id])

    return (
        <div className="profile-content">
            <div className="title">
                <span>Profile</span>
                <Link
                    to={`/profile/${user?.id}/edit`}
                    className="profile-content__button-edit"
                >
                    <EditOutlined />
                </Link>
            </div>

            <div className="profile-content__sub">
                <div className="profile-content__sub__avatar">
                    <img
                        src={process.env.REACT_APP_API_URL + user.UserInfo?.avatar}
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
                        <span>{user.UserInfo?.gender ? 'Nam' : 'Nữ'}</span>
                    </div>
                    <div>
                        <span className="properties">Ngày sinh</span>
                        <span>
                            {new Date(
                                user.UserInfo?.birthday,
                            ).toLocaleDateString('en-GB')}
                        </span>
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
