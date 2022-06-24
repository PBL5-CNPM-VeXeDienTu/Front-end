import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import { Link, useParams, useNavigate } from 'react-router-dom'
import walletApi from 'api/walletApi'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import './recharge.scss'

const { Option } = Select

function Recharge() {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            const newRecharge = {
                serial: values.serial,
                price: parseInt(values.card),
            }
            const response = await walletApi.rechargeById(id, newRecharge)
            alert(response.data.message)
            navigate(user.role === roles.ADMIN ? `/wallets` : `/user-wallet`)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="recharge-content">
            <div className="title">Nạp thẻ cào</div>
            <Form className="recharge-content__sub" onFinish={handleSubmit}>
                <div className="recharge-content__sub__info">
                    <div className="recharge-content__sub__info__item">
                        <span className="span">Nhà mạng</span>
                        <Form.Item
                            name="home_network"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>
                                <Option value="1">Mobile</Option>
                                <Option value="2">Viettel</Option>
                                <Option value="3">Vinaphone</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="recharge-content__sub__info__item">
                        <span className="span">Mệnh giá</span>
                        <Form.Item
                            name="card"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>
                                <Option value="10000">10000</Option>
                                <Option value="20000">20000</Option>
                                <Option value="50000">50000</Option>
                                <Option value="100000">100000</Option>
                                <Option value="200000">200000</Option>
                                <Option value="500000">500000</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="recharge-content__sub__info__item">
                        <span className="span">Serial</span>
                        <Form.Item
                            name="serial"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="string" />
                        </Form.Item>
                    </div>
                    <div className="recharge-content__sub__info__item">
                        <span className="span">Mã thẻ</span>
                        <Form.Item
                            name="card_code"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="string" />
                        </Form.Item>
                    </div>
                    <div className="recharge-content__sub__info__note">
                        <span>
                            Lưu ý: Chọn sai mệnh giá sẽ không được cộng tiền.
                            Hãy kiểm tra kỹ trước khi nạp
                        </span>
                    </div>
                </div>
                <div className="recharge-content__sub__button">
                    <Button className="button-cancel">
                        <Link
                            to={
                                user.role === roles.ADMIN
                                    ? '/wallets'
                                    : '/user-wallet'
                            }
                        >
                            Thoát
                        </Link>
                    </Button>
                    <Button
                        className="button-save"
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

export default Recharge
