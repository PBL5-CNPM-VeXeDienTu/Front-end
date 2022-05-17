import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import './edit-vehicle.scss'

function EditVehicle() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'
    return (
        <div className="edit-vehicle-content">
            <div className="title">Chỉnh sửa thông tin xe</div>
            <Form
                name="form"
                className="edit-vehicle-content__sub"
                // onFinish={handleSubmit}
            >
                <div className="edit-vehicle-content__sub__avatar">
                    <img src={avatarURL} alt="avatar" />
                    <div className="edit-vehicle-content__sub__avatar__button-upload">
                        <CameraOutlined className="edit-vehicle-content__sub__avatar__icon" />
                    </div>
                </div>
                <div className="edit-vehicle-content__sub__info">
                    <div className="edit-vehicle-content__sub__info__item">
                        <span className="span">Hãng xe</span>
                        <Form.Item
                            name="type"
                            initialValue="Suzuki"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" />
                        </Form.Item>
                    </div>

                    <div className="edit-vehicle-content__sub__info__item">
                        <span className="span">Màu xe</span>
                        <Form.Item
                            name="color"
                            initialValue="Xanh đen"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" />
                        </Form.Item>
                    </div>

                    <div className="edit-vehicle-content__sub__info__item">
                        <span className="span">Mô tả</span>
                        <Form.Item
                            name="detail"
                            initialValue="Xe có đầy đủ 2 kính, bánh xe có vành màu cam, ống bô độ vip"
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
                                className="textarea"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="edit-vehicle-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/vehicles">Thoát</Link>
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

export default EditVehicle
