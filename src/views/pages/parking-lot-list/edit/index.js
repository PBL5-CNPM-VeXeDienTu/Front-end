import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import './edit-parking-lot.scss'

function EditParkingLot() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/parking-lot/default-avatar.png'
    return (
        <div className="edit-parking-lot-content">
            <div className="title">Chỉnh sửa thông tin bãi đỗ xe</div>
            <Form
                name="form"
                className="edit-parking-lot-content__sub"
                // onFinish={handleSubmit}
            >
                <div className="edit-parking-lot-content__sub__avatar">
                    <img src={avatarURL} alt="avatar" />
                    <div className="edit-parking-lot-content__sub__avatar__button-upload">
                        <CameraOutlined className="edit-parking-lot-content__sub__avatar__icon" />
                    </div>
                </div>
                <div className="edit-parking-lot-content__sub__info">
                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Tên nhà xe</span>
                        <Form.Item
                            name="name"
                            initialValue="Bãi xe khu A đại học Bách Khoa"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Chủ nhà xe</span>
                        <Form.Item
                            name="owner_name"
                            initialValue="Phạm Văn Thọ"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Thời gian mở</span>
                        <Form.Item
                            name="time_slot"
                            initialValue="7h - 22h"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Tình trạng</span>
                        <Form.Item
                            name="is_open"
                            initialValue="Đang mở"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Sức chứa</span>
                        <Form.Item
                            name="capacity"
                            initialValue="1000"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Địa chỉ</span>
                        <Form.Item
                            name="address"
                            initialValue="Khu A đại học Bách Khoa, Đường Nguyễn Lương Bằng, Phường Hòa Khánh Bắc , Liên Chiều"
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
                <div className="edit-parking-lot-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/parking-lots/detail">Thoát</Link>
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

export default EditParkingLot
