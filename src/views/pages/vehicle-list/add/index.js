import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import { CameraOutlined } from '@ant-design/icons'
import vehicleApi from 'api/vehicleApi'
import uploadImageApi from 'api/uploadImageApi'
import './add-vehicle.scss'

const { Option } = Select

function AddVehicle() {
    const navigate = useNavigate()
    const [uploadAvatar, setUploadAvatar] = useState()
    const [uploadCavetFront, setUploadCavetFront] = useState()
    const [uploadCavetBack, setUploadCavetBack] = useState()
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'
    const cavetFrontURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const cavetBackURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const VehicleTypes = []
    VehicleTypes.push(<Option key={1}>Xe đạp điện</Option>)
    VehicleTypes.push(<Option key={2}>Xe máy</Option>)
    VehicleTypes.push(<Option key={3}>Xe ô tô</Option>)

    const handleUploadVehicleImage = (e) => {
        const vehicleAvatar = document.getElementById('vehicle-avatar')
        vehicleAvatar.src = URL.createObjectURL(e.target.files[0])
        setUploadAvatar(e.target.files[0])
    }
    const handleUploadCavetFrontImage = (e) => {
        const vehicleCavetFront = document.getElementById('cavet-front')
        vehicleCavetFront.src = URL.createObjectURL(e.target.files[0])
        setUploadCavetFront(e.target.files[0])
    }
    const handleUploadCavetBackImage = (e) => {
        const vehicleCavetBack = document.getElementById('cavet-back')
        vehicleCavetBack.src = URL.createObjectURL(e.target.files[0])
        setUploadCavetBack(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            const newVehicle = {
                license_plate: values.license_plate,
                type_id: parseInt(values.type_id),
                brand: values.brand,
                color: values.color,
                detail: values.detail,
            }
            const response = await vehicleApi.createNew(newVehicle)
            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('vehicle-avatar', uploadAvatar)
                uploadImageApi.uploadVehicleAvatar(
                    response.data.vehicleId,
                    postData,
                )
            }
            if (uploadCavetFront) {
                const postData = new FormData()
                postData.append('cavet-front', uploadCavetFront)
                uploadImageApi.uploadCavetFrontImage(
                    response.data.vehicleId,
                    postData,
                )
            }
            if (uploadCavetBack) {
                const postData = new FormData()
                postData.append('cavet-back', uploadCavetBack)
                uploadImageApi.uploadCavetBackImage(
                    response.data.vehicleId,
                    postData,
                )
            }
            alert(response.data.message)
            navigate('/vehicles')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="add-vehicle-content">
            <div className="title">Đăng kí xe</div>
            <Form className="add-vehicle-content__sub" onFinish={handleSubmit}>
                <div className="add-vehicle-content__sub__vehicle">
                    <div className="add-vehicle-content__sub__vehicle__image">
                        <img
                            id="vehicle-avatar"
                            className="img"
                            src={avatarVehicleURL}
                            alt="avatar"
                        />
                        <div className="add-vehicle-content__sub__vehicle__image__button-upload">
                            <label for="image-input">
                                <CameraOutlined className="add-vehicle-content__sub__vehicle__image__icon" />
                            </label>
                            <input
                                id="image-input"
                                accept="image/png, image/jpeg"
                                type="file"
                                onChange={handleUploadVehicleImage}
                            />
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
                                name="brand"
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
                            <span className="span">Loại xe</span>
                            <Form.Item
                                name="type_id"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                            >
                                <Select>{VehicleTypes}</Select>
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
                        <span className="span">Hình ảnh cavet trước</span>
                        <div className="add-vehicle-content__sub__cavet__item__image">
                            <img
                                src={cavetFrontURL}
                                alt="avatar"
                                className="img"
                                id="cavet-front"
                            />
                            <div className="add-vehicle-content__sub__cavet__item__image__button-upload-one">
                                <label for="cavet-front-input">
                                    <CameraOutlined className="add-vehicle-content__sub__cavet__item__image__icon" />
                                </label>
                                <input
                                    id="cavet-front-input"
                                    accept="image/png, image/jpeg"
                                    type="file"
                                    onChange={handleUploadCavetFrontImage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="add-vehicle-content__sub__cavet__item">
                        <span className="span">Hình ảnh cavet sau</span>
                        <div className="add-vehicle-content__sub__cavet__item__image">
                            <img
                                src={cavetBackURL}
                                alt="avatar"
                                className="img"
                                id="cavet-back"
                            />
                            <div className="add-vehicle-content__sub__cavet__item__image__button-upload-two">
                                <label for="cavet-back-input">
                                    <CameraOutlined className="add-vehicle-content__sub__cavet__item__image__icon" />
                                </label>
                                <input
                                    id="cavet-back-input"
                                    accept="image/png, image/jpeg"
                                    type="file"
                                    onChange={handleUploadCavetBackImage}
                                />
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
