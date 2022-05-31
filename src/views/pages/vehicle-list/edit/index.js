import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import * as roles from 'shared/constants/role'
import uploadImageApi from 'api/uploadImageApi'
import useAuth from 'hooks/useAuth'
import vehicleApi from 'api/vehicleApi'
import './edit-vehicle.scss'

function EditVehicle() {
    const { id } = useParams()
    const [uploadAvatar, setUploadAvatar] = useState()
    const { user } = useAuth()
    const [vehicle, setVehicle] = useState({})
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const avatarURL = process.env.REACT_APP_API_URL + vehicle.avatar

    useEffect(() => {
        if (!!id) {
            vehicleApi
                .getOneById(id)
                .then((response) => response)
                .then((response) => {
                    form.setFieldsValue({
                        brand: response.data.brand,
                        color: response.data.color,
                        detail: response.data.detail,
                    })

                    setVehicle(response.data)
                })
        }
    }, [id, form])

    const handleSubmit = async (values) => {
        try {
            const response = await vehicleApi.updateById(id, values)
            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('vehicle-avatar', uploadAvatar)
                uploadImageApi.uploadVehicleAvatar(id, postData)
            }
            alert(response.data.message)
            navigate(`/vehicles/detail/${id}`)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleUploadVehicleImage = (e) => {
        const vehicleAvatar = document.getElementById('vehicle-avatar')
        vehicleAvatar.src = URL.createObjectURL(e.target.files[0])
        setUploadAvatar(e.target.files[0])
    }
    


    return user.role !== roles.PARKING_LOT_USER ? (
        <div className="edit-vehicle-content">
            <div className="title">Chỉnh sửa thông tin xe</div>
            <Form
                form={form}
                name="form"
                className="edit-vehicle-content__sub"
                onFinish={handleSubmit}
            >
                <div className="edit-vehicle-content__sub__avatar">
                    <img
                        id="vehicle-avatar"
                        className="img"
                        src={avatarURL}
                        alt="avatar"
                    />
                    <div className="edit-vehicle-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="edit-vehicle-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={handleUploadVehicleImage}
                        />
                    </div>
                </div>
                <div className="edit-vehicle-content__sub__info">
                    <div className="edit-vehicle-content__sub__info__item">
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
                            <Input
                                type="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-vehicle-content__sub__info__item">
                        <span className="span">Màu xe</span>
                        <Form.Item
                            name="color"
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

                    <div className="edit-vehicle-content__sub__info__item">
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
                                type="name"
                                size="large"
                                className="textarea"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="edit-vehicle-content__sub__button">
                    <Button className="button-cancel">
                        <Link to={`/vehicles/detail/${id}`}>Thoát</Link>
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
    ) : (
        <Navigate to="/404" />
    )
}

export default EditVehicle
