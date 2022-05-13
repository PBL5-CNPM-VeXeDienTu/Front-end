import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import './add-package.scss'

const { Option } = Select

function AddPackage() {
    const PackageTypes = []
    for (let i = 0; i < 1; i++) {
        PackageTypes.push(
            <Option key={i.toString(36) + i}>Gói ưu đãi tuần</Option>,
        )
        PackageTypes.push(
            <Option key={i.toString(36) + i + 1}>Gói ưu đãi tháng</Option>,
        )
        PackageTypes.push(
            <Option key={i.toString(36) + i + 2}>Gói ưu đãi quý</Option>,
        )
        PackageTypes.push(
            <Option key={i.toString(36) + i + 2}>Gói ưu đãi năm</Option>,
        )
    }

    const vehicleType = []
    for (let i = 0; i < 1; i++) {
        vehicleType.push(
            <Option key={i.toString(36) + i}>Xe đạp</Option>,
        )
        vehicleType.push(
            <Option key={i.toString(36) + i}>Xe đạp điện / Xe máy điện</Option>,
        )
        vehicleType.push(
            <Option key={i.toString(36) + i + 2}>Xe máy</Option>,
        )
        vehicleType.push(
            <Option key={i.toString(36) + i + 2}>Xe ô tô</Option>,
        )
    }
    return (
        <div className="add-package-content">
            <div className="title">Thêm gói ưu đãi</div>
            <Form
                name="addprofile"
                className="add-package-content__sub"
            // onFinish={handleSubmit}
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
                            <Input
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Loại gói ưu đãi</span>
                        <Form.Item
                            name="package_type"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>{PackageTypes}</Select>
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Phương tiện</span>
                        <Form.Item
                            name="vehicle_type"
                            classname="text"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>{vehicleType}</Select>
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
                        <Link to="/packages">Hủy</Link>
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
