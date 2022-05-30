import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import parkingLotApi from 'api/parkingLotApi'
import * as openStates from 'shared/constants/openState'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import * as roles from 'shared/constants/role'
import useAuth from 'hooks/useAuth'
import uploadImageApi from 'api/uploadImageApi'
import './edit-parking-lot.scss'

const { Option } = Select

function EditParkingLot() {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [parkingLot, setParkingLot] = useState({})
    const [uploadAvatar, setUploadAvatar] = useState()
    const avatarURL = process.env.REACT_APP_API_URL + parkingLot.avatar

    const handleUploadImage = (e) => {
        const parkingLotAvatar = document.getElementById('parking-lot-avatar')
        parkingLotAvatar.src = URL.createObjectURL(e.target.files[0])
        setUploadAvatar(e.target.files[0])
    }

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.PARKING_AVATAR
    }

    useEffect(() => {
        if (!!id) {
            parkingLotApi
                .getOneById(id)
                .then((response) => response)
                .then((response) => {
                    form.setFieldsValue({
                        name: response.data.name,
                        owner_name: response.data.Owner.name,
                        time_slot: response.data.time_slot,
                        is_open: response.data.is_open
                            ? openStates.OPENING
                            : openStates.CLOSED,
                        capacity: response.data.capacity,
                        address: response.data.address,
                    })

                    setParkingLot(response.data)
                })
        }
    }, [id, form])
    const handleSubmit = async (values) => {
        try {
            values.is_open =
                values.is_open === openStates.OPENING ? true : false
            values.capacity = parseInt(values.capacity)
            const response = await parkingLotApi.updateById(id, values)

            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('parking-lot-avatar', uploadAvatar)
                uploadImageApi.uploadParkingLotAvatar(id, postData)
            }

            alert(response.data.message)
            window.location.reload()
            navigate(`/parking-lots/edit/${id}`)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return user.role !== roles.BASIC_USER ? (
        <div className="edit-parking-lot-content">
            <div className="title">Chỉnh sửa thông tin bãi đỗ xe</div>
            <Form
                form={form}
                className="edit-parking-lot-content__sub"
                onFinish={handleSubmit}
            >
                <div className="edit-parking-lot-content__sub__avatar">
                    <img
                        id="parking-lot-avatar"
                        src={avatarURL}
                        alt="avatar"
                        onError={handleGetImageError}
                    />
                    <div className="edit-parking-lot-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="edit-parking-lot-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="edit-parking-lot-content__sub__info">
                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Tên nhà xe</span>
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Chủ nhà xe</span>
                        <Form.Item
                            name="owner_name"
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
                                disabled
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Thời gian mở</span>
                        <Form.Item
                            name="time_slot"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Tình trạng</span>
                        <Form.Item
                            name="is_open"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>
                                <Option key={openStates.OPENING}>
                                    {openStates.OPENING}
                                </Option>
                                <Option key={openStates.CLOSED}>
                                    {openStates.CLOSED}
                                </Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Sức chứa</span>
                        <Form.Item
                            name="capacity"
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

                    <div className="edit-parking-lot-content__sub__info__item">
                        <span className="span">Địa chỉ</span>
                        <Form.Item
                            name="address"
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
                                className="textbox"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="edit-parking-lot-content__sub__button">
                    <Button className="button-cancel">
                        <Link
                            to={
                                user.role === roles.ADMIN
                                    ? `/parking-lots/${parkingLot.id}`
                                    : '/parking-lots'
                            }
                        >
                            Thoát
                        </Link>
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

export default EditParkingLot
