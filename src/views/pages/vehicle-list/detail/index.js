import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal, Button } from 'antd'
import useAuth from 'hooks/useAuth'
import vehicleApi from 'api/vehicleApi'
import { roles } from 'contexts/UserContext'
import './detail-vehicle.scss'

function DetailVehicle() {
    const { user } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { id } = useParams()
    const [vehicle, setVehicle] = useState({
        key: 0,
        user_name: '',
        brand: '',
        license_plate: '',
        created_at: '',
        type_of_vehicle: '',
        status: '',
    })

    useEffect(() => {
        if (!!user) {
            vehicleApi.getById(id).then((response) => {
                setVehicle(response.data)
            })
        }
    }, [user])

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
            <div>
                <div className="detail-vehicle-content__vehicle">
                    <div className="detail-vehicle-content__vehicle__image">
                        <img
                            className="img"
                            src={process.env.REACT_APP_API_URL + vehicle.avatar}
                            alt="avatar"
                        />
                    </div>
                    <div className="detail-vehicle-content__vehicle__info">
                        <div className="detail-vehicle-content__vehicle__info__item">
                            <span className="span-title">Biển số</span>
                            <span className="span-content">
                                {vehicle.license_plate}
                            </span>
                        </div>
                        <div className="detail-vehicle-content__vehicle__info__item">
                            <span className="span-title">Hãng xe</span>
                            <span className="span-content">
                                {vehicle.brand}
                            </span>
                        </div>
                        <div className="detail-vehicle-content__vehicle__info__item">
                            <span className="span-title">Màu</span>
                            <span className="span-content">
                                {vehicle.color}
                            </span>
                        </div>
                        <div className="detail-vehicle-content__vehicle__info__item">
                            <span className="span-title">Ngày đăng ký</span>
                            <span className="span-content">
                                {vehicle.createdAt}
                            </span>
                        </div>

                        <div className="detail-vehicle-content__vehicle__info__item">
                            <span className="span-title">Mô tả</span>
                            <span className="span-content">
                                {vehicle.detail}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="detail-vehicle-content__cavet">
                    <div className="detail-vehicle-content__cavet__item">
                        <span className="span">Hình ảnh caver trước</span>
                        <div className="detail-vehicle-content__cavet__item__image">
                            <img
                                src={
                                    process.env.REACT_APP_API_URL +
                                    vehicle.cavet_front
                                }
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className="detail-vehicle-content__cavet__item">
                        <span className="span">Hình ảnh caver sau</span>
                        <div className="detail-vehicle-content__cavet__item__image">
                            <img
                                src={
                                    process.env.REACT_APP_API_URL +
                                    vehicle.cavet_back
                                }
                                alt="avatar"
                            />
                        </div>
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

export default DetailVehicle
