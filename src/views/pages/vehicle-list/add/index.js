import React from 'react'
import { Form, Input, Button } from 'antd'
import messages from 'assets/lang/messages'
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons'
import './add-vehicle.scss'

function VehicleAdd() {
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar-test.png'
    const cavetFrontURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const cavetBackURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    return (
        <div className="container">
            <div className="content-card">
                <div className="title">Đăng kí xe</div>
                <Form className="content">
                    <div className="content__vehicle">
                        <div className="content__vehicle__avatar">
                            <img
                                className="content__vehicle__avatar__img"
                                src={avatarVehicleURL}
                                alt="avatar"
                            />
                            <UploadOutlined className="content__vehicle__avatar__icon" />
                        </div>
                        <div className="content__vehicle__infor">
                            <div className="content__vehicle__infor__table">
                                <div className="content__vehicle__infor__table__item">
                                    <span className="row-item">Biển số :</span>
                                    <Form.Item
                                        className="content__vehicle__infor__table__item__input"
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
                                <div className="content__vehicle__infor__table__item">
                                    <span className="row-item">Màu :</span>
                                    <Form.Item
                                        className="content__vehicle__infor__table__item__input"
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
                                <div className="content__vehicle__infor__table__item">
                                    <span className="row-item">Hãng xe :</span>
                                    <Form.Item
                                        className="content__vehicle__infor__table__item__input"
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
                                <div className="content__vehicle__infor__table__item">
                                    <span className="row-item ">
                                        Chi tiết :
                                    </span>
                                    <Form.Item
                                        className="content__vehicle__infor__table__item__input"
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
                                            className="content__vehicle__infor__table__item__textarea"
                                            type="string"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content__cavet">
                        <div>
                            <div className="content__cavet__font">
                                <label className="content__cavet__font__lable">
                                    Hình ảnh caver trước
                                </label>
                                <div className="content__cavet__font__upload">
                                    <img
                                        className="content__cavet__font__upload__img"
                                        src={cavetFrontURL}
                                        alt="cavet_font"
                                    />
                                    <UploadOutlined className="content__cavet__font__upload__icon" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="content__cavet__back">
                                <label className="content__cavet__font__lable">
                                    Hình ảnh caver trước sau
                                </label>
                                <div>
                                    <img
                                        className="content__cavet__back__img"
                                        src={cavetBackURL}
                                        alt="cavet_back"
                                    />
                                    <UploadOutlined className="content__cavet__back__icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content__btn">
                        <div>
                            <Button className="content__btn__cancel">
                                Hủy
                            </Button>
                        </div>
                        <div>
                            <Button className="content__btn__Ok">Lưu</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default VehicleAdd
