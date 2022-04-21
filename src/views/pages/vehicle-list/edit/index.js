import React from 'react'
import { Form, Input, Button } from 'antd'
import messages from 'assets/lang/messages'
import './edit-vehicle.scss'

function VehicleEdit() {
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'
    return (
        <div className="content-card">
            <div className="title">Chỉnh sửa thông tin xe</div>
            <Form className="content">
                <div className="content__vehicle">
                    <div className="content__vehicle__avatar">
                        <img
                            className="content__vehicle__avatar__img"
                            src={avatarVehicleURL}
                            alt="avatar"
                        ></img>
                    </div>
                    <div className="content__vehicle__infor">
                        <div className="content__vehicle__infor__table">
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
                                    <Input type="string" value="Suzuki" />
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
                        <div className="content__vehicle__infor__table__btn">
                            <Button className="content__vehicle__infor__table__btn__cancel">
                                Hủy
                            </Button>
                            <Button className="content__vehicle__infor__table__btn__Ok">
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default VehicleEdit
