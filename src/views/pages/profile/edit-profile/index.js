import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input, Radio, Form, Button, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import moment from 'moment'
import useAuth from 'hooks/useAuth'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import uploadImageApi from 'api/uploadImageApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './edit-profile.scss'

function EditProfile() {
    const { user } = useAuth()
    const avatarURL = process.env.REACT_APP_API_URL + user.UserInfo?.avatar
    const [uploadAvatar, setUploadAvatar] = useState()

    const navigate = useNavigate()

    const handleUploadImage = (e) => {
        const userAvatar = document.getElementById('user-avatar')
        userAvatar.src = URL.createObjectURL(e.target.files[0])
        setUploadAvatar(e.target.files[0])
    }

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.USER_AVATAR
    }

    const handleSubmit = async (values) => {
        try {
            const response = await userApi.updateById(user.id, values)

            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('user-avatar', uploadAvatar)
                uploadImageApi.uploadUserAvatar(user?.id, postData)
            }

            alert(response.data.message)
            window.location.reload()
            navigate('/profile')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="edit-profile-content">
            <div className="title">Profile</div>
            <Form
                name="edit-profile"
                className="edit-profile-content__sub"
                onFinish={handleSubmit}
            >
                <div className="edit-profile-content__sub__avatar">
                    <img
                        id="user-avatar"
                        src={avatarURL}
                        alt="avatar"
                        onError={handleGetImageError}
                    />
                    <div className="edit-profile-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="edit-profile-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="edit-profile-content__sub__info">
                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Tên</span>
                        <Form.Item
                            name="name"
                            initialValue={user.name}
                            rules={[
                                {
                                    required: true,
                                    message: messages['name_required'],
                                },
                            ]}
                        >
                            <Input
                                type="name"
                                placeholder="Username"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Email</span>
                        <Form.Item
                            name="email"
                            initialValue={user.email}
                            rules={[
                                {
                                    type: 'email',
                                    message: messages['invalid_email'],
                                },
                                {
                                    required: true,
                                    message: messages['email_required'],
                                },
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="Email"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Giới tính</span>
                        <Form.Item name="gender">
                            <Radio.Group
                                defaultValue={user.UserInfo?.gender ? 1 : 0}
                            >
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Ngày sinh</span>
                        <Form.Item
                            name="birthday"
                            rules={[
                                {
                                    required: true,
                                    message: messages['birthday_required'],
                                },
                            ]}
                        >
                            <DatePicker
                                size="medium"
                                defaultValue={moment(
                                    user.UserInfo?.birthday,
                                    'YYYY/MM/DD',
                                )}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Địa chỉ</span>
                        <Form.Item
                            name="address"
                            initialValue={user.UserInfo?.address}
                            rules={[
                                {
                                    required: true,
                                    message: messages['address_required'],
                                },
                            ]}
                        >
                            <Input
                                className="textbox"
                                size="medium"
                                maxLength="1000"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Số điện thoại</span>
                        <Form.Item
                            name="phone_number"
                            initialValue={user.UserInfo?.phone_number}
                            rules={[
                                {
                                    required: true,
                                    message: messages['phone_number_required'],
                                },
                                {
                                    pattern: '^([-]?[0-9][0-9]*|0)$',
                                    min: 10,
                                    max: 10,
                                    message: messages['invalid_phone_number'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__button">
                        <Button className="button-cancel">
                            <Link to="/profile">Thoát</Link>
                        </Button>
                        <Button
                            className="button-save"
                            type="primary"
                            htmlType="submit"
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default EditProfile
