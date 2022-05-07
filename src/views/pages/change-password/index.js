import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import auth from 'api/auth'
import messages from 'assets/lang/messages'
import './change-password.scss'

function ChangePassword() {
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            const response = await auth.changePassword(values)
            alert(response.data.message)
            navigate('/profile')
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error.response.data.message)
        }
    }
    return (
        <div className="change-password-container">
            <Form
                name="register"
                className="change-password-content"
                onFinish={handleSubmit}
            >
                <div className="change-password-content__form">
                    <h3>Mật khẩu hiện tại</h3>
                    <Form.Item
                        name="currentPassword"
                        className="change-password-content__form__item"
                        rules={[
                            {
                                required: true,
                                message: messages['password_required'],
                            },
                            {
                                type: 'string',
                                min: 6,
                                max: 24,
                                message: messages['invalid_password_length'],
                            },
                        ]}
                    >
                        <Input.Password placeholder="Current password" />
                    </Form.Item>
                </div>

                <div className="change-password-content__form">
                    <h3>Mật khẩu mới</h3>
                    <Form.Item
                        name="newPassword"
                        className="change-password-content__form__item"
                        rules={[
                            {
                                required: true,
                                message: messages['password_required'],
                            },
                            {
                                type: 'string',
                                min: 6,
                                max: 24,
                                message: messages['invalid_password_length'],
                            },
                        ]}
                    >
                        <Input.Password placeholder="New password" />
                    </Form.Item>
                </div>

                <div className="change-password-content__form">
                    <h3>Nhập lại mật khẩu mới</h3>
                    <Form.Item
                        name="confirmNewPassword"
                        className="change-password-content__form__item"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: messages['confirm_password_require'],
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('newPassword') === value
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
                        <Input.Password placeholder="Confirm new password" />
                    </Form.Item>
                </div>

                <div className="change-password-content__button">
                    <span>
                        <button className="change-password-content__button__cancel">
                            Hủy
                        </button>
                    </span>
                    <span>
                        <button
                            className="change-password-content__button__save"
                            type="primary"
                            htmlType="submit"
                        >
                            Lưu
                        </button>
                    </span>
                </div>
            </Form>
        </div>
    )
}

export default ChangePassword
