import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import {
    UserOutlined,
    UnlockOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import messages from 'assets/lang/messages'
import auth from 'api/auth'

import background from 'assets/images/background.png'
import avatar from 'assets/images/avatar.svg'

import './register.scss'

const { Option } = Select

function Register() {
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            values.role = parseInt(values.role)
            const response = await auth.register(values)
            alert(response.data.message)
            navigate('/login')
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error.response.data.message)
        }
    }
    return (
        <div className="register-container-main">
            <div className="register-card">
                <div className="register-img-background">
                    <img
                        className="img-background"
                        src={background}
                        alt={'backgound'}
                    />
                </div>
                <div className="register-container-sub">
                    <div className="register-content"></div>
                    <div className="register-form-content">
                        <Form
                            name="register"
                            className="register-form"
                            onFinish={handleSubmit}
                        >
                            <img src={avatar} alt={'avatar'} />
                            <h2>Welcome</h2>

                            <div className="input-div name">
                                <i>
                                    <UserOutlined />
                                </i>
                                <Form.Item
                                    className="form-item"
                                    name="name"
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
                                        className="input name"
                                    />
                                </Form.Item>
                            </div>

                            <div className="input-div email">
                                <i>
                                    <MailOutlined />
                                </i>
                                <Form.Item
                                    className="form-item"
                                    name="email"
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
                                        className="input email"
                                    />
                                </Form.Item>
                            </div>

                            <div className="input-div role">
                                <i>
                                    <SettingOutlined />
                                </i>
                                <Form.Item
                                    className="form-item"
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'moi chon role',
                                        },
                                    ]}
                                >
                                    <Select
                                        defaultValue="Role"
                                        className="input role"
                                    >
                                        <Option value="1">Basic user</Option>
                                        <Option value="2">
                                            Pakinglot user
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="input-div password">
                                <i>
                                    <UnlockOutlined />
                                </i>
                                <Form.Item
                                    className="form-item"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                messages['password_required'],
                                        },
                                        {
                                            type: 'string',
                                            min: 6,
                                            max: 24,
                                            message:
                                                messages[
                                                    'invalid_password_length'
                                                ],
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        className="input password"
                                    />
                                </Form.Item>
                            </div>

                            <div className="input-div confirm-password">
                                <i>
                                    <UnlockOutlined />
                                </i>
                                <Form.Item
                                    name="confirm-password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                messages[
                                                    'confirm_password_require'
                                                ],
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        'password',
                                                    ) === value
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
                                    <Input.Password
                                        placeholder="Confirm password"
                                        className="input confirm-password"
                                    />
                                </Form.Item>
                            </div>
                            <Button
                                className="button-submit"
                                type="primary"
                                htmlType="submit"
                            >
                                REGISTER
                            </Button>
                            <p className="have-an-account">
                                Already have an account?{' '}
                                <a className="have-an-account" href="/login">
                                    {' '}
                                    LOG IN
                                </a>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
