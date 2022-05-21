import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd'
import useAuth from 'hooks/useAuth'
import { roles } from 'contexts/UserContext'
import './detail-vehicle.scss'

function EditVehicle() {
    const { user } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'
    const cavetFrontURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const cavetBackURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }
    return (
        <div className="detail-vehicle-content">
            <div className="title">Thông tin xe</div>
            <div className="detail-vehicle-content__vehicle">
                <div className="detail-vehicle-content__vehicle__image">
                    <img className="img" src={avatarVehicleURL} alt="avatar" />
                </div>
                <div className="detail-vehicle-content__vehicle__info">
                    <div className="detail-vehicle-content__vehicle__info__item">
                        <span className="span-title">Biển số</span>
                        <span className="span-content">123456</span>
                    </div>
                    <div className="detail-vehicle-content__vehicle__info__item">
                        <span className="span-title">Hãng xe</span>
                        <span className="span-content">Suzuki</span>
                    </div>
                    <div className="detail-vehicle-content__vehicle__info__item">
                        <span className="span-title">Màu</span>
                        <span className="span-content">Xanh đen</span>
                    </div>
                    <div className="detail-vehicle-content__vehicle__info__item">
                        <span className="span-title">Ngày đăng ký</span>
                        <span className="span-content">01/01/2022</span>
                    </div>

                    <div className="detail-vehicle-content__vehicle__info__item">
                        <span className="span-title">Mô tả</span>
                        <span className="span-content">
                            Xe không kính, không phải là vì xe không có kính
                        </span>
                    </div>
                </div>
            </div>
            <div className="detail-vehicle-content__cavet">
                <div className="detail-vehicle-content__cavet__item">
                    <span className="span">Hình ảnh caver trước</span>
                    <div className="detail-vehicle-content__cavet__item__image">
                        <img src={cavetFrontURL} alt="avatar" />
                    </div>
                </div>
                <div className="detail-vehicle-content__cavet__item">
                    <span className="span">Hình ảnh caver sau</span>
                    <div className="detail-vehicle-content__cavet__item__image">
                        <img src={cavetBackURL} alt="avatar" />
                    </div>
                </div>
            </div>
            <div
                className={
                    user.role === roles.ADMIN
                        ? 'detail-vehicle-content__button-unactive'
                        : 'detail-vehicle-content__button-active'
                }
            >
                <Button className="button-delete" onClick={showModal}>
                    Hủy đăng ký
                </Button>
                <Button className="button-edit">
                    <Link to="/vehicles/edit">Chỉnh sửa</Link>
                </Button>
            </div>

            <div
                className={
                    user.role === roles.ADMIN
                        ? 'detail-vehicle-content__button-active'
                        : 'detail-vehicle-content__button-unactive'
                }
            >
                <Button className="button-gray" onClick={showModal}>
                    <Link to="/verify-request">Thoát</Link>
                </Button>
                <Button className="button-green">
                    <Link to="/verify-request">Xác thực</Link>
                </Button>
            </div>

            <Modal
                className="delete-vehicle-modal"
                title="Hủy đăng ký xe"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn có chắn chắn muốn hủy đăng ký xe hay không ?</p>
            </Modal>
        </div>
    )
}

export default EditVehicle
