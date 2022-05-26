import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import packageApi from 'api/packageApi'
import useAuth from 'hooks/useAuth'
import './add-package.scss'

const { Option } = Select

function AddPackage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const PackageTypes = []
    for (let i = 0; i < 1; i++) {
        PackageTypes.push(<Option key={i + 1}>Gói ưu đãi tuần</Option>)
        PackageTypes.push(<Option key={i + 2}>Gói ưu đãi tháng</Option>)
        PackageTypes.push(<Option key={i + 3}>Gói ưu đãi quý</Option>)
        PackageTypes.push(<Option key={i + 4}>Gói ưu đãi năm</Option>)
    }

    const vehicleType = []
    for (let i = 0; i < 1; i++) {
        vehicleType.push(<Option key={i + 1}>Xe đạp điện / Xe máy điện</Option>)
        vehicleType.push(<Option key={i + 2}>Xe đạp</Option>)
        vehicleType.push(<Option key={i + 3}>Xe ô tô</Option>)
    }

    const handleSubmit = async (values) => {
        try {
            const newPackage = {
                parking_lot_id: user.id,
                name: values.name,
                type_id: parseInt(values.type_id),
                vehicle_type_id: parseInt(values.vehicle_type_id),
                price: parseInt(values.price),
            }
            const response = await packageApi.createNew(newPackage)
            alert(response.data.message)
            navigate('/packages')
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
                            <Select classname="text">{PackageTypes}</Select>
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
                            <Select className="text">{vehicleType}</Select>
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

export default AddPackage
