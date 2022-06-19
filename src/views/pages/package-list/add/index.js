import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import packageApi from 'api/packageApi'
import useAuth from 'hooks/useAuth'
import packageTypeApi from 'api/packageTypeApi'
import vehicleTypeApi from 'api/vehicleTypeApi'
import parkingLotApi from 'api/parkingLotApi'
import './add-package.scss'

const { Option } = Select

function AddPackage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [packageTypes, setPackageTypes] = useState([])
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [parkingLotByOwnerId, setParkingLotByOwnerId] = useState([])

    useEffect(() => {
        packageTypeApi.getAll().then((response) => {
            setPackageTypes(response.data.rows)
        })
    }, [])

    useEffect(() => {
        vehicleTypeApi.getAll().then((response) => {
            setVehicleTypes(response.data.rows)
        })
    }, [])

    useEffect(() => {
        parkingLotApi.getListByUserId(user.id).then((response) => {
            setParkingLotByOwnerId(
                response.data.rows.filter(
                    (parkinglot) =>
                        parkinglot.VerifyState.state === 'Đã được kiểm duyệt',
                ),
            )
        })
    }, [user.id])

    const handleSubmit = async (values) => {
        try {
            const newPackage = {
                parking_lot_id: parseInt(values.parking_lot_id),
                name: values.name,
                type_id: parseInt(values.type_id),
                vehicle_type_id: parseInt(values.vehicle_type_id),
                price: parseInt(values.price),
            }
            const response = await packageApi.createNew(newPackage)
            alert(response.data.message)
            navigate(`/parking-lots/${values.parking_lot_id}/packages`)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="add-package-content">
            <div className="title">Thêm gói ưu đãi</div>
            <Form
                name="addprofile"
                className="add-package-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-package-content__sub__info">
                    <div className="add-package-content__sub__info__item">
                        <span className="span">Tên gói ưu đãi</span>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Nhà xe</span>
                        <Form.Item
                            name="parking_lot_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="textbox">
                                {parkingLotByOwnerId.map((item, id) => {
                                    return (
                                        <Option value={item.id}>
                                            {item.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Loại gói ưu đãi</span>
                        <Form.Item
                            name="type_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="textbox">
                                {packageTypes.map((item, id) => {
                                    return (
                                        <Option value={item.id}>
                                            {item.type_name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Phương tiện</span>
                        <Form.Item
                            name="vehicle_type_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="textbox">
                                {vehicleTypes.map((item, id) => {
                                    return (
                                        <Option value={item.id}>
                                            {item.type_name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="add-package-content__sub__info__item">
                        <span className="span">Giá (VND)</span>
                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                                {
                                    pattern: '^([-]?[0-9][0-9]*|0)$',
                                    message: messages['invalid_number'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>
                </div>
                <div className="add-package-content__sub__button">
                    <Button className="button-gray">
                        <Link to="/packages">Thoát</Link>
                    </Button>
                    <Button
                        className="button-green"
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

export default AddPackage
