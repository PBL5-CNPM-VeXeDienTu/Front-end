import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import messages from 'assets/lang/messages'
import './edit-vehicle.scss'

function EditVehicle() {
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar-test.png'
    return (
        <div className="edit-vehicle-content__card">
            <div className="edit-vehicle__title">Chỉnh sửa thông tin xe</div>
            <Form className="edit-vehicle-content">
                <div className="edit-vehicle-content__vehicle">
                    <div className="edit-vehicle-content__vehicle__avatar">
                        <img
                            className="edit-vehicle-content__vehicle__avatar__img"
                            src={avatarVehicleURL}
                            alt="avatar"
                        ></img>
                    </div>
                    <div className="edit-vehicle-content__vehicle__infor">
                        <div className="edit-vehicle-content__vehicle__infor__table">
                            <div className="edit-vehicle-content__vehicle__infor__table__item">
                                <span className="edit-vehicle-row-item">
                                    Hãng xe
                                </span>
                                <Form.Item
                                    className="edit-vehicle-content__vehicle__infor__table__item__input"
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
                            <div className="edit-vehicle-content__vehicle__infor__table__item">
                                <span className="edit-vehicle-row-item">
                                    Màu
                                </span>
                                <Form.Item
                                    className="edit-vehicle-content__vehicle__infor__table__item__input"
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
                            <div className="edit-vehicle-content__vehicle__infor__table__item">
                                <span className="edit-vehicle-row-item ">
                                    Chi tiết
                                </span>
                                <Form.Item
                                    className="edit-vehicle-content__vehicle__infor__table__item__input"
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
                                        className="edit-vehicle-content__vehicle__infor__table__item__textarea"
                                        type="string"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="edit-vehicle-content__vehicle__infor__table__btn">
                            <Button className="edit-vehicle-content__vehicle__infor__table__btn__cancel">
                                <Link to="/vehicles">Hủy</Link>
                            </Button>
                            <Button className="edit-vehicle-content__vehicle__infor__table__btn__Ok">
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default EditVehicle
