import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import { Link } from 'react-router-dom'
import './payment.scss'

const { Option } = Select
function payment() {
    return (
        <div className="payment-content__card">
            <div className="title">Nạp thẻ cào</div>
            <Form className="payment-content__infor">
                <div className="payment-content__infor__item">
                    <span>Nhà mạng</span>
                    <Form.Item
                        className="payment-content__infor__item__input"
                        name="home_network"
                        rules={[
                            {
                                required: true,
                                message: messages['text_required'],
                            },
                        ]}
                    >
                        <Select
                            className="input role"
                            placeholder="Chọn nhà mạng"
                        >
                            <Option value="1">Mobile</Option>
                            <Option value="2">Viettel</Option>
                            <Option value="3">Vinaphone</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="payment-content__infor__item">
                    <span>Mệnh giá</span>
                    <Form.Item
                        className="payment-content__infor__item__input"
                        name="card"
                        rules={[
                            {
                                required: true,
                                message: messages['text_required'],
                            },
                        ]}
                    >
                        <Select
                            className="input role"
                            placeholder="Chọn mệnh giá"
                        >
                            <Option value="1">10000</Option>
                            <Option value="2">20000</Option>
                            <Option value="3">50000</Option>
                            <Option value="3">100000</Option>
                            <Option value="3">200000</Option>
                            <Option value="3">500000</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="payment-content__infor__item">
                    <span>Serial</span>
                    <Form.Item
                        className="payment-content__infor__item__input"
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
                <div className="payment-content__infor__item">
                    <span>Mã thẻ</span>
                    <Form.Item
                        className="payment-content__infor__item__input"
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
                <div className="payment-content__infor__note">
                    <span>
                        Lưu ý: Chọn sai mệnh giá sẽ không được cộng tiền. Hãy
                        kiểm tra kỹ trước khi nạp
                    </span>
                </div>
                <div className="payment-content__infor__btn">
                    <Button className="payment-content__infor__btn__cancel">
                        <Link to="/wallets">Hủy</Link>
                    </Button>
                    <Button className="payment-content__infor__btn__Ok">
                        <Link to="/wallets">Nạp thẻ</Link>
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default payment
