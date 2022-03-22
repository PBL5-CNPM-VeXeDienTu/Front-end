import { Form, Input, Button ,Select} from 'antd';
import { UserOutlined ,UnlockOutlined,MailOutlined ,SettingOutlined} from '@ant-design/icons';
import background from '../../assets/images/background.png';
import avatar from '../../assets/images/avatar.svg'
import 'antd/dist/antd.min.css';
import '../register/style.css'
const { Option } = Select;
function register() {
    return (
      <div className='register-container-main'>
        {/* <img className='wave' src={ware} alt={"ware"} /> */}
      <div className='register-card'>
          <div className="register-img-background">
            <img className='img-background' src={background} alt={"backgound"} />
          </div>
          <div className="register-container-sub">
            <div className="register-content">
            </div>
            <div className='register-form-content'>
              <Form name="register" className='register-form'>
                <img  src={avatar} alt={"avatar"} />
                <h2>Welcome</h2>

                <div className='input-div name'>
                  <i ><UserOutlined/></i>
                  <Form.Item  className='form-item' name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Bạn chưa nhập tên',
                        },
                      ]}
                  >
                    <Input type="name" placeholder="Username" size="large"className='input name'/>
                  </Form.Item>
                </div>

                <div className='input-div email'>
                  <i><MailOutlined /></i>
                  <Form.Item  className='form-item' name="email"
                    rules={[
                        {
                          type: 'email',
                          message: 'Email không hợp lệ (VD: example@gmail.com)',
                        },
                        {
                          required: true,
                          message: 'Bạn chưa nhập email',
                        },
                    ]}
                  >
                    <Input type="email" placeholder="Email" size="large"className='input email'/>
                  </Form.Item>
                </div>

                <div className='input-div role'>
                  <i><SettingOutlined /></i>
                  <Form.Item className='form-item' name="categories" rules={[ {  required: false, }, ]} >
                    <Select defaultValue="Basic User" className="input role"  >
                        <Option value="Basic User">Basic user</Option>
                        <Option value="Pakinglot User">Pakinglot user</Option>
                    </Select>
                    </Form.Item>
                  </div>

                <div className='input-div password'>
                  <i><UnlockOutlined/></i>
                    <Form.Item className='form-item' name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Bạn chưa nhập mật khẩu',
                        },
                        {
                          type: 'string', min: 8, max: 24,
                          message: 'Mật khẩu ít nhất 8 kí tự',
                        },
                      ]}
                    >
                      <Input.Password placeholder="Password" className='input password'/>
                    </Form.Item>
                </div>

                <div className='input-div confirm-password'>
                  <i><UnlockOutlined/></i>
                  <Form.Item name="confirm-password" dependencies={['password']}  hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Mời nhập lại mật khẩu',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                        },
                      }),
                    ]}
                  >
                     <Input.Password placeholder="Confirm password" className='input confirm-password'/>
                  </Form.Item>
                </div>
                <Button className='button-submit' >REGISTER</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default register;