import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import messages from 'assets/lang/messages'
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons'
import './add-vehicle.scss'

function AddVehicle() {
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar-test.png'
    const cavetFrontURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const cavetBackURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    return (
        <div className="add-vehicle-content__card">
            <div className="add-vehicle__title">Đăng kí xe</div>
            <Form className="add-vehicle-content">
                <div className="add-vehicle-content__vehicle">
                    <div className="add-vehicle-content__vehicle__avatar">
                        <img
                            className="add-vehicle-content__vehicle__avatar__img"
                            src={avatarVehicleURL}
                            alt="avatar"
                        />
                        <UploadOutlined className="add-vehicle-content__vehicle__avatar__icon" />
                    </div>
                    <div className="add-vehicle-content__vehicle__infor">
                        <div className="add-vehicle-content__vehicle__infor__table">
                            <div className="add-vehicle-content__vehicle__infor__table__item">
                                <span className="add-vehicle-row-item">
                                    Biển số{' '}
                                </span>
                                <Form.Item
                                    className="add-vehicle-content__vehicle__infor__table__item__input"
                                    name="license_plate"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                messages[
                                                    'license_plate_required'
                                                ],
                                        },
                                    ]}
                                >
                                    <Input type="license_plate" />
                                </Form.Item>
                            </div>
                            <div className="add-vehicle-content__vehicle__infor__table__item">
                                <span className="add-vehicle-row-item">
                                    Màu
                                </span>
                                <Form.Item
                                    className="add-vehicle-content__vehicle__infor__table__item__input"
                                    name="color"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                messages[
                                                    'vehicle_color_required'
                                                ],
                                        },
                                    ]}
                                >
                                    <Input type="string" />
                                </Form.Item>
                            </div>
                            <div className="add-vehicle-content__vehicle__infor__table__item">
                                <span className="add-vehicle-row-item">
                                    Hãng xe
                                </span>
                                <Form.Item
                                    className="add-vehicle-content__vehicle__infor__table__item__input"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                messages[
                                                    'vehicle_type_required'
                                                ],
                                        },
                                    ]}
                                >
                                    <Input type="string" />
                                </Form.Item>
                            </div>
                            <div className="add-vehicle-content__vehicle__infor__table__item">
                                <span className="add-vehicle-row-item">
                                    Chi tiết
                                </span>
                                <Form.Item
                                    className="add-vehicle-content__vehicle__infor__table__item__input"
                                    name="detail"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                messages[
                                                    'vehicle_detail_required'
                                                ],
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        className="add-vehicle-content__vehicle__infor__table__item__textarea"
                                        type="string"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-vehicle-content__cavet">
                    <div>
                        <div className="add-vehicle-content__cavet__font">
                            <label className="add-vehicle-content__cavet__font__lable">
                                Hình ảnh caver trước
                            </label>
                            <div className="add-vehicle-content__cavet__font__upload">
                                <img
                                    className="add-vehicle-content__cavet__font__upload__img"
                                    src={cavetFrontURL}
                                    alt="cavet_font"
                                />
                                <UploadOutlined className="add-vehicle-content__cavet__font__upload__icon" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="add-vehicle-content__cavet__back">
                            <label className="add-vehicle-content__cavet__font__lable">
                                Hình ảnh caver trước sau
                            </label>
                            <div>
                                <img
                                    className="add-vehicle-content__cavet__back__img"
                                    src={cavetBackURL}
                                    alt="cavet_back"
                                />
                                <UploadOutlined className="add-vehicle-content__cavet__back__icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-vehicle-content__btn">
                    <div>
                        <Button className="add-vehicle-content__btn__cancel">
                            <Link to="/vehicles">Hủy</Link>
                        </Button>
                    </div>
                    <div>
                        <Button className="add-vehicle-content__btn__Ok">
                            Lưu
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default AddVehicle
