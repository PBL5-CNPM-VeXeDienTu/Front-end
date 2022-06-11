import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { Form, Input, Button, Modal, Radio } from 'antd'
import useAuth from 'hooks/useAuth'
import vehicleApi from 'api/vehicleApi'
import * as verifyStates from 'shared/constants/verifyState'
import * as roles from 'shared/constants/role'
import './detail-vehicle.scss'

function DetailVehicle() {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const [showModalVerify, setShowModalVerify] = useState(false)
    const [showModalSoftDelete, setShowModalSoftDelete] = useState(false)
    const [radioValue, setRadioValue] = useState()
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
            vehicleApi.getOneById(id).then((response) => {
                setVehicle(response.data)
            })
        }
    }, [user, id])

    const softDeleteHandle = async () => {
        try {
            const response = await vehicleApi.softDeleteById(vehicle.id)
            alert(response.data.message)
            navigate('/vehicles')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const verifyHandle = async () => {
        try {
            const updateVerifyState = {
                state: radioValue ? verifyStates.VERIFIED : verifyStates.DENIED,
                note: document.getElementById('note').value,
            }
            const response = await vehicleApi.verifyById(
                vehicle.id,
                updateVerifyState,
            )
            alert(response.data.message)
            navigate('/verify-request')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleCancel = () => {
        setShowModalSoftDelete(false)
        setShowModalVerify(false)
    }

    return user.role !== roles.PARKING_LOT_USER ? (
        <div className="detail-vehicle-content">
            <div className="title">Thông tin chi tiết xe</div>
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
                            <span className="span-title">Trạng thái</span>
                            <span
                                className={
                                    vehicle.VerifyState.state ===
                                    verifyStates.VERIFIED
                                        ? 'span-green'
                                        : vehicle.VerifyState.state ===
                                            verifyStates.PENDING
                                        ? 'span-yellow'
                                        : 'span-red'
                                }
                            >
                                {vehicle.VerifyState.state}
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
                        <span className="span">Hình ảnh cavet trước</span>
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
                        <span className="span">Hình ảnh cavet sau</span>
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
                <Button
                    className="button-delete"
                    onClick={(e) => setShowModalSoftDelete(true)}
                >
                    Hủy đăng ký
                </Button>
                <Button className="button-edit">
                    <Link to={`/vehicles/${id}/edit`}>Chỉnh sửa</Link>
                </Button>
            </div>

            <div
                className={
                    user.role === roles.ADMIN
                        ? 'detail-vehicle-content__button-active'
                        : 'detail-vehicle-content__button-unactive'
                }
            >
                <Button className="button-gray">
                    <Link to="/verify-request">Thoát</Link>
                </Button>
                <Button
                    className="button-green"
                    onClick={(e) => setShowModalVerify(true)}
                >
                    Xác thực
                </Button>
            </div>

            <Modal
                className="delete-vehicle-modal"
                title="Xác thực bãi đỗ xe"
                visible={showModalVerify}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    className="delete-vehicle-modal__form"
                    name="verify_parkingLot"
                >
                    <div className="delete-vehicle-modal__form__item">
                        <span className="span">Trạng thái</span>
                        <Form.Item name="state">
                            <Radio.Group
                                className="text"
                                value={radioValue}
                                defaultValue={radioValue}
                                onChange={(e) => {
                                    setRadioValue(e.target.value)
                                }}
                            >
                                <Radio value={1}>{verifyStates.VERIFIED}</Radio>
                                <Radio value={0}>{verifyStates.DENIED}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="delete-vehicle-modal__form__item">
                        <span className="span">Ghi chú</span>
                        <Form.Item name="note" className="form-item">
                            <Input.TextArea
                                id="note"
                                className="textarea"
                                size="medium"
                            />
                        </Form.Item>
                    </div>

                    <div className="delete-vehicle-modal__button">
                        <button
                            className="button-gray"
                            onClick={(e) => setShowModalVerify(false)}
                        >
                            Thoát
                        </button>
                        <button
                            className="button-green"
                            type="primary"
                            htmlType="submit"
                            onClick={verifyHandle}
                        >
                            Lưu
                        </button>
                    </div>
                </Form>
            </Modal>
            <Modal
                className="delete-vehicle-modal"
                title="Xác nhận hủy đăng ký xe"
                visible={showModalSoftDelete}
                onOk={softDeleteHandle}
                onCancel={handleCancel}
            >
                <p>
                    {user.role === roles.ADMIN
                        ? 'Bạn có chắn chắn muốn xóa đăng kí xe hay không ?'
                        : 'Bạn có chắn chắn muốn hủy đăng kí xe hay không ?'}
                </p>
            </Modal>
        </div>
    ) : (
        <Navigate to="/404" />
    )
}

export default DetailVehicle
