import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input, Radio, Form, Button, DatePicker } from 'antd'
import moment from 'moment'
import useAuth from 'hooks/useAuth'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import './edit-profile.scss'

function EditProfile() {
    const { user } = useAuth()
    const avatarURL = process.env.REACT_APP_API_URL + user.avatar
    const gender = user.gender ? 1 : 0
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            const response = await userApi.update(user.id, values)
            alert(response.data.message)
            navigate('/profile')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="edit-profile-content">
            <div className="edit-profile-content__title">Profile</div>
            <Form
                name="editprofile"
                className="edit-profile-content__user"
                onFinish={handleSubmit}
            >
                <div className="edit-profile-content__user__avatar">
                    <img src={avatarURL} alt="avatar"></img>
                </div>
                <div className="edit-profile-content__user__infor">
                    <div className="edit-profile-content__user__infor__item">
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

                    <div className="edit-profile-content__user__infor__item">
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

                    <div className="edit-profile-content__user__infor__item">
                        <span className="span">Giới tính</span>
                        <Form.Item name="gender">
                            <Radio.Group defaultValue={gender}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__user__infor__item">
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
                                    user.birthday,
                                    'YYYY/MM/DD',
                                )}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__user__infor__item">
                        <span className="span">Địa chỉ</span>
                        <Form.Item
                            name="address"
                            initialValue={user.address}
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

                    <div className="edit-profile-content__user__infor__item">
                        <span className="span">Số điện thoại</span>
                        <Form.Item
                            name="phone_number"
                            initialValue={user.phone_number}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        messages['phone_number_required'],
                                },
                                {
                                    pattern: '^([-]?[0-9][0-9]*|0)$',
                                    min: 10,
                                    max: 10,
                                    message:
                                        messages['invalid_phone_number'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__user__info__button">
                        <Button className="button-cancel">
                            <Link to="/profile">Hủy</Link>
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
