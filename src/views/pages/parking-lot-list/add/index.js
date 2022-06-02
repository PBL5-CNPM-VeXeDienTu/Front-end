import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import * as openStates from 'shared/constants/openState'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import * as roles from 'shared/constants/role'
import uploadImageApi from 'api/uploadImageApi'
import parkingLotApi from 'api/parkingLotApi'
import useAuth from 'hooks/useAuth'
import './add-parking-lot.scss'

function AddParkingLot() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [uploadAvatar, setUploadAvatar] = useState()
    const avatarURL = process.env.REACT_APP_API_URL

    const handleUploadImage = (e) => {
        const parkingLotAvatar = document.getElementById('parking-lot-avatar')
        parkingLotAvatar.src = URL.createObjectURL(e.target.files[0])
        setUploadAvatar(e.target.files[0])
    }

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.PARKING_LOT_AVATAR
    }

    const handleSubmit = async (values) => {
        try {
            values.is_open =
                values.is_open === openStates.OPENING ? true : false
            values.capacity = parseInt(values.capacity)
            const response = await parkingLotApi.createNew(values)

            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('parking-lot-avatar', uploadAvatar)
                uploadImageApi.uploadParkingLotAvatar(
                    response.data.parkingLotId,
                    postData,
                )
            }

            alert(response.data.message)
            user.role === roles.ADMIN
                ? navigate('/verify-request')
                : navigate('/parking-lots')
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div className="add-parking-lot-content">
            <div className="title">Thêm bãi đỗ xe</div>
            <Form
                name="addprofile"
                className="add-parking-lot-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-parking-lot-content__sub__avatar">
                    <img
                        id="parking-lot-avatar"
                        src={avatarURL}
                        alt="avatar"
                        onError={handleGetImageError}
                    />
                    <div className="add-parking-lot-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="add-parking-lot-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="add-parking-lot-content__sub__info">
                    <div className="add-parking-lot-content__sub__info__item">
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

                    <div className="add-parking-lot-content__sub__info__item">
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

                    <div className="add-parking-lot-content__sub__info__item">
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

                    <div className="add-parking-lot-content__sub__info__item">
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
                <div className="add-parking-lot-content__sub__button">
                    <Button className="button-cancel">
                        <Link
                            to={
                                user.role === roles.ADMIN
                                    ? '/verify-request'
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
    )
}

export default AddParkingLot
