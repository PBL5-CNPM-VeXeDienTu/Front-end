import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import './add-parking-lot.scss'

function AddParkingLot() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/parking-lot/default-avatar.png'
    return (
        <div className="add-parking-lot-content">
            <div className="title">Thêm bãi đỗ xe</div>
            <Form
                name="addprofile"
                className="add-parking-lot-content__sub"
                // onFinish={handleSubmit}
            >
                <div className="add-parking-lot-content__sub__avatar">
                    <img src={avatarURL} alt="avatar" />
                    <div className="add-parking-lot-content__sub__avatar__button-upload">
                        <CameraOutlined className="add-parking-lot-content__sub__avatar__icon" />
                    </div>
                </div>
                <div className="add-parking-lot-content__sub__info">
                    <div className="add-parking-lot-content__sub__info__item">
                        <span className="span">Tên nhà xe</span>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="add-parking-lot-content__sub__info__item">
                        <span className="span">Thời gian mở</span>
                        <Form.Item
                            name="time_slot"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="add-parking-lot-content__sub__info__item">
                        <span className="span">Tình trạng</span>
                        <Form.Item
                            name="is_open"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="add-parking-lot-content__sub__info__item">
                        <span className="span">Sức chứa</span>
                        <Form.Item
                            name="capacity"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="add-parking-lot-content__sub__info__item">
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
                            <Input.TextArea
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="add-parking-lot-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/parking-lots">Thoát</Link>
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

export default AddParkingLot
