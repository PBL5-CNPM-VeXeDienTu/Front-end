import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import packageApi from 'api/packageApi'
import packageTypeApi from 'api/packageTypeApi'
import vehicleTypeApi from 'api/vehicleTypeApi'
import './edit-package.scss'

const { Option } = Select

function EditPackage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [packageTypes, setPackageTypes] = useState([])
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [packageItem, setPackageItem] = useState({
        key: 0,
        name: '',
        type_id: 0,
        vehicle_type_id: 0,
        price: 0,
    })

    useEffect(() => {
        packageApi.getOneById(id).then((response) => {
            let packageTypeById = response.data
            setPackageItem({
                name: packageTypeById.name,
                package_name: packageTypeById.PackageType.type_name,
                vehicle_name: packageTypeById.VehicleType.type_name,
                price: packageTypeById.price,
                type_id: packageTypeById.type_id,
                vehicle_type_id: packageTypeById.vehicle_type_id,
                parking_lot_id: packageTypeById.ParkingLot.id,
            })
        })
    }, [id])
    console.log('packageItem')
    console.log(packageItem)

    useEffect(() => {
        packageTypeApi.getListPackageType().then((response) => {
            setPackageTypes(response.data.rows)
        })
    }, [])

    useEffect(() => {
        vehicleTypeApi.getListVehicleType().then((response) => {
            setVehicleTypes(response.data.rows)
        })
    }, [])

    const handleSubmit = async (values) => {
        try {
            const updatePackage = {
                name: values.name,
                type_id: parseInt(values.type_id),
                vehicle_type_id: parseInt(values.vehicle_type_id),
                price: parseFloat(values.price),
            }
            const response = await packageApi.updateById(id, updatePackage)
            alert(response.data.message)
            navigate('/packages')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="edit-package-content">
            <div className="title">Chỉnh sửa gói ưu đãi</div>
            <Form
                name="editprofile"
                className="edit-package-content__sub"
                onFinish={handleSubmit}
                fields={[
                    {
                        name: ['name'],
                        value: packageItem.name,
                    },
                    {
                        name: ['type_id'],
                        value: packageItem.package_name,
                    },
                    {
                        name: ['vehicle_type_id'],
                        value: packageItem.vehicle_name,
                    },
                    {
                        name: ['price'],
                        value: packageItem.price,
                    },
                ]}
            >
                <div className="edit-package-content__sub__info">
                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Tên gói ưu đãi</span>
                        <Form.Item
                            name="name"
                            initialValue={packageItem.name}
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

                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Loại gói ưu đãi</span>
                        <Form.Item
                            name="type_id"
                            initialValue={packageItem.type_id}
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

                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Phương tiện</span>
                        <Form.Item
                            name="vehicle_type_id"
                            initialValue={packageItem.vehicle_type_id}
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
                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Giá (VND)</span>
                        <Form.Item
                            name="price"
                            initialValue={packageItem.price}
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
                <div className="edit-package-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/packages">Thoát</Link>
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

export default EditPackage
