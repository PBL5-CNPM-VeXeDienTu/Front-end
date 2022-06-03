import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import * as roles from 'shared/constants/role'

import './add-account.scss'
const { Option } = Select

function AddAccount() {
    const navigate = useNavigate()

    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/user/default-avatar.png'

    const roleName = []
    roleName.push(<Option key={roles.BASIC_USER}>Basic User</Option>)
    roleName.push(
        <Option key={roles.PARKING_LOT_USER}>Parking-lot User</Option>,
    )
    roleName.push(<Option key={roles.ADMIN}>Admin</Option>)

    const handleSubmit = async (values) => {}

    return (
        <div className="add-account-content">
            <div className="title">Thêm người dùng</div>
            <Form
                name="addprofile"
                className="add-account-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-account-content__sub__avatar">
                    <img id="user-avatar" src={avatarURL} alt="avatar" />
                    <div className="add-account-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="add-account-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/png, image/jpeg"
                            type="file"
                        />
                    </div>
                </div>
                <div className="add-account-content__sub__info">
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Họ và tên</span>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" className="text" />
                        </Form.Item>
                    </div>
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Email</span>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: messages['invalid_email'],
                                },
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="text" />
                        </Form.Item>
                    </div>
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Role</span>
                        <Form.Item
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="select">{roleName}</Select>
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Giới tính</span>
                        <Form.Item name="gender">
                            <Radio.Group defaultValue={1} className="text">
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
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
                            <DatePicker className="text" format="DD/MM/YYYY" />
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Địa chỉ</span>
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="text" maxLength="1000" />
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Số điện thoại</span>
                        <Form.Item
                            name="phone_number"
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
                            <Input className="text" />
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Mật khẩu</span>
                        <Form.Item
                            name="password"
                            className="form-item"
                            rules={[
                                {
                                    required: true,
                                    message: messages['password_required'],
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                    max: 24,
                                    message:
                                        messages['invalid_password_length'],
                                },
                            ]}
                        >
                            <Input.Password className="text" />
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Nhập lại mật khẩu</span>
                        <Form.Item
                            name="confirm_password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        messages['confirm_password_require'],
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                messages[
                                                    'confirm_password_not_match'
                                                ],
                                            ),
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="add-account-content__sub__button">
                    <Button className="button-gray">
                        <Link to="/accounts">Thoát</Link>
                    </Button>
                    <Button
                        className="button-green"
                        type="primary"
                        htmlType="submit"
                    >
                        Lưu
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddAccount
