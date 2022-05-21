import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import messages from 'assets/lang/messages'
import { CameraOutlined } from '@ant-design/icons'
import './add-vehicle.scss'

function AddVehicle() {
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'
    const cavetFrontURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const cavetBackURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    return (
        <div className="add-vehicle-content">
            <div className="title">Đăng kí xe</div>
            <Form className="add-vehicle-content__sub">
                <div className="add-vehicle-content__sub__vehicle">
                    <div className="add-vehicle-content__sub__vehicle__image">
                        <img
                            className="img"
                            src={avatarVehicleURL}
                            alt="avatar"
                        />
                        <div className="add-vehicle-content__sub__vehicle__image__button-upload">
                            <CameraOutlined className="add-vehicle-content__sub__vehicle__image__icon" />
                        </div>
                    </div>
                    <div className="add-vehicle-content__sub__vehicle__info">
                        <div className="add-vehicle-content__sub__vehicle__info__item">
                            <span className="span">Biển số </span>
                            <Form.Item
                                name="license_plate"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                            >
                                <Input type="string" className="text" />
                            </Form.Item>
                        </div>
                        <div className="add-vehicle-content__sub__vehicle__info__item">
                            <span className="span">Hãng xe</span>
                            <Form.Item
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                            >
                                <Input type="string" className="text" />
                            </Form.Item>
                        </div>
                        <div className="add-vehicle-content__sub__vehicle__info__item">
                            <span className="span">Màu</span>
                            <Form.Item
                                name="color"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                            >
                                <Input type="string" className="text" />
                            </Form.Item>
                        </div>

                        <div className="add-vehicle-content__sub__vehicle__info__item">
                            <span className="span">Mô tả</span>
                            <Form.Item
                                name="detail"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    type="string"
                                    className="textarea"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="add-vehicle-content__sub__cavet">
                    <div className="add-vehicle-content__sub__cavet__item">
                        <span className="span">Hình ảnh caver trước</span>
                        <div className="add-vehicle-content__sub__cavet__item__image">
                            <img src={cavetFrontURL} alt="avatar" />
                            <div className="add-vehicle-content__sub__cavet__item__image__button-upload-one">
                                <CameraOutlined className="add-vehicle-content__sub__cavet__item__image__icon" />
                            </div>
                        </div>
                    </div>
                    <div className="add-vehicle-content__sub__cavet__item">
                        <span className="span">Hình ảnh caver sau</span>
                        <div className="add-vehicle-content__sub__cavet__item__image">
                            <img src={cavetBackURL} alt="avatar" />
                            <div className="add-vehicle-content__sub__cavet__item__image__button-upload-two">
                                <CameraOutlined className="add-vehicle-content__sub__cavet__item__image__icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-vehicle-content__sub__button">
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

export default AddVehicle
