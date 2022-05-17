import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import './edit-package.scss'

const { Option } = Select

function EditPackage() {
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
        vehicleType.push(<Option key={i.toString(36) + i}>Xe đạp</Option>)
        vehicleType.push(
            <Option key={i.toString(36) + i}>Xe đạp điện / Xe máy điện</Option>,
        )
        vehicleType.push(<Option key={i.toString(36) + i + 2}>Xe máy</Option>)
        vehicleType.push(<Option key={i.toString(36) + i + 2}>Xe ô tô</Option>)
    }
    return (
        <div className="edit-package-content">
            <div className="title">Chỉnh sửa gói ưu đãi</div>
            <Form
                name="editprofile"
                className="edit-package-content__sub"
                // onFinish={handleSubmit}
            >
                <div className="edit-package-content__sub__info">
                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Tên gói ưu đãi</span>
                        <Form.Item
                            name="name"
                            initialValue={'Ưu đãi nghìn năm có một'}
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
                            name="package_type"
                            initialValue={'Gói ưu đãi tháng'}
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="textbox">{PackageTypes}</Select>
                        </Form.Item>
                    </div>

                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Phương tiện</span>
                        <Form.Item
                            name="vehicle_type"
                            initialValue={'Xe máy'}
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="textbox">{vehicleType}</Select>
                        </Form.Item>
                    </div>
                    <div className="edit-package-content__sub__info__item">
                        <span className="span">Giá (VND)</span>
                        <Form.Item
                            name="price"
                            initialValue={'120000'}
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
