import { Form, Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import messages from 'assets/lang/messages';

import background from 'assets/images/background.png';
import avatar from 'assets/images/avatar.svg';

import 'pages/login/login.scss';

function Login() {
    return (
        <div className="login-container-main">
            {/* <img className='wave' src={ware} alt={"ware"} /> */}
            <div className="login-card">
                <div className="login-img-background">
                    <img
                        className="img-background"
                        src={background}
                        alt={'backgound'}
                    />
                </div>
                <div className="login-container-sub">
                    <div className="login-img-content"></div>
                    <div className="login-form-content">
                        <Form name="login" className="login-form">
                            <img src={avatar} alt={'avatar'} />
                            <h2>Welcome</h2>
                            <div className="input-div email">
                                <i>
                                    <UserOutlined />
                                </i>
                                <Form.Item
                                    className="form-item"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['email_required'],
                                        },
                                        {
                                            type: 'email',
                                            message: messages['invalid_email'],
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
                                            min: 8,
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
                            <a className="forgot-password" href="./">
                                Forgot Password
                            </a>
                            <Button className="button-submit">LOGIN</Button>
                            <a className="create-account" href="./">
                                Create new account{' '}
                            </a>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
