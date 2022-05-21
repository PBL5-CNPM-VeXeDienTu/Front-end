import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import { Link } from 'react-router-dom'
import './payment.scss'

const { Option } = Select
function payment() {
    return (
        <div className="payment-content">
            <div className="title">Nạp thẻ cào</div>
            <Form className="payment-content__sub">
                <div className="payment-content__sub__info">
                    <div className="payment-content__sub__info__item">
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
                    <div className="payment-content__sub__info__item">
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
                                <Option value="1">10000</Option>
                                <Option value="2">20000</Option>
                                <Option value="3">50000</Option>
                                <Option value="3">100000</Option>
                                <Option value="3">200000</Option>
                                <Option value="3">500000</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="payment-content__sub__info__item">
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
                    <div className="payment-content__sub__info__item">
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
                    <div className="payment-content__sub__info__note">
                        <span>
                            Lưu ý: Chọn sai mệnh giá sẽ không được cộng tiền.
                            Hãy kiểm tra kỹ trước khi nạp
                        </span>
                    </div>
                </div>
                <div className="payment-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/wallets">Thoát</Link>
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

export default payment
