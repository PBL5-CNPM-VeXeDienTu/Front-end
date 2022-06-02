import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input } from 'antd'
import auth from 'api/auth'
import useAuth from 'hooks/useAuth'
import messages from 'assets/lang/messages'
import './change-password.scss'

function ChangePassword() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const handleSubmit = async (values) => {
        try {
            const response = await auth.changePassword(values)
            alert(response.data.message)
            navigate(`/profile/${user.id}`)
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error.response.data.message)
        }
    }
    return (
        <div className="change-password-content">
            <div className="title">Thay đổi mật khẩu</div>
            <Form
                name="changePassword"
                className="change-password-content__sub"
                onFinish={handleSubmit}
            >
                <div className="change-password-content__sub__info">
                    <div className="change-password-content__sub__info__item">
                        <span className="span">Mật khẩu hiện tại</span>
                        <Form.Item
                            name="currentPassword"
                            className="change-password-content__sub__info__item__item"
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
                            <Input.Password placeholder="Current password" />
                        </Form.Item>
                    </div>

                    <div className="change-password-content__sub__info__item">
                        <span className="span">Mật khẩu mới</span>
                        <Form.Item
                            name="newPassword"
                            className="change-password-content__sub__info__item__item"
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
                            <Input.Password placeholder="New password" />
                        </Form.Item>
                    </div>

                    <div className="change-password-content__sub__info__item">
                        <span className="span">Nhập lại mật khẩu mới</span>
                        <Form.Item
                            name="confirmNewPassword"
                            className="change-password-content__sub__info__item__item"
                            dependencies={['newPassword']}
                            hasFeedback
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
                                            getFieldValue('newPassword') ===
                                                value
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
                </div>
                <div className="change-password-content__sub__button">
                    <button className="button-cancel">
                        <Link to={`/profile/${user.id}`}>Thoát</Link>
                    </button>
                    <button
                        className="button-save"
                        type="primary"
                        htmlType="submit"
                    >
                        Lưu
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default ChangePassword
