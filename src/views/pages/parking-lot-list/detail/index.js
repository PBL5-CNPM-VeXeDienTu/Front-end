import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Modal, Radio, Table, Space } from 'antd'
import {
    EditOutlined,
    CloseOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import * as roles from 'shared/constants/role'
import * as verifyStates from 'shared/constants/verifyState'
import * as openState from 'shared/constants/openState'
import useAuth from 'hooks/useAuth'
import parkingLotApi from 'api/parkingLotApi'
import './detail-parking-lot.scss'

function DetailParkingLot() {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const [parkingLot, setParkingLot] = useState({})
    const [showModalSoftDelete, setShowModalSoftDelete] = useState(false)
    const [showModalVerify, setShowModalVerify] = useState(false)
    const [radioValue, setRadioValue] = useState()
    const [parkingPirceList, setParkingPirceList] = useState([])

    useEffect(() => {
        try {
            if (!!id) {
                parkingLotApi.getOneById(id).then((response) => {
                    setParkingLot(response.data)
                    console.log(response.data)
                    setParkingPirceList(
                        response.data.ParkingPrices.map((parkingPirce) => ({
                            key: parkingPirce.id,
                            id: parkingPirce.id,
                            vehicle_type: parkingPirce.VehicleType.type_name,
                            price: parkingPirce.price,
                        })),
                    )
                })
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [id])

    const handleCancel = () => {
        setShowModalSoftDelete(false)
        setShowModalVerify(false)
    }

    const softDeleteHandle = async () => {
        try {
            const response = await parkingLotApi.softDeleteById(parkingLot.id)
            alert(response.data.message)
            navigate('/verify-request')
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
            const response = await parkingLotApi.verifyById(
                parkingLot.id,
                updateVerifyState,
            )
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const noActionColumns = [
        {
            title: 'Loại xe',
            dataIndex: 'vehicle_type',
            width: '20%',
        },
        {
            title: 'Phí đỗ xe (VND)',
            dataIndex: 'price',
            width: '20%',
        },
    ]

    const actionColumns = [
        {
            title: 'Loại xe',
            dataIndex: 'vehicle_type',
            width: '20%',
        },
        {
            title: 'Phí đỗ xe (VND)',
            dataIndex: 'price',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '5%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => {}} className="icon-edit" />
                    <DeleteOutlined
                        onClick={() => {}}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]

    return (
        <div className="detail-parking-lot-content">
            <div className="title">
                <span>Thông tin bãi đỗ xe</span>
            </div>
            <div
                className={
                    user.role === roles.PARKING_USER
                        ? 'detail-parking-lot-content__no-icon'
                        : 'detail-parking-lot-content__icon'
                }
            >
                <Link to={`/parking-lots/${parkingLot.id}/edit`}>
                    <span className="edit-parking-lot">
                        <EditOutlined />
                    </span>
                </Link>
                <span className="delete-parking-lot">
                    <CloseOutlined
                        onClick={(e) => setShowModalSoftDelete(true)}
                    />
                </span>
            </div>
            <div className="detail-parking-lot-content__sub">
                <Form className="detail-parking-lot-content__sub__parking-lot-detail">
                    <img
                        className="detail-parking-lot-content__sub__parking-lot-detail__image"
                        src={process.env.REACT_APP_API_URL + parkingLot.avatar}
                        alt="avatar"
                    />
                    <div className="detail-parking-lot-content__sub__parking-lot-detail__info">
                        <div>
                            <span className="span1">Tên nhà xe</span>
                            <span className="span2">{parkingLot.name}</span>
                        </div>
                        <div>
                            <span className="span1">Chủ nhà xe </span>
                            <span className="span2">
                                {parkingLot.Owner?.name}
                            </span>
                        </div>
                        <div>
                            <span className="span1">Thời gian mở </span>
                            <span className="span2">
                                {parkingLot.time_slot}
                            </span>
                        </div>
                        <div>
                            <span className="span1">Sức chứa </span>
                            <span className="span2">{parkingLot.capacity}</span>
                        </div>
                        <div>
                            <span className="span1">Tình trạng</span>
                            <span
                                className={
                                    parkingLot.is_open
                                        ? 'span2-green'
                                        : 'span2-red'
                                }
                            >
                                {parkingLot.is_open
                                    ? openState.OPENING
                                    : openState.CLOSED}
                            </span>
                        </div>
                        <div
                            className={
                                user.role === roles.PARKING_USER
                                    ? 'div-unactive'
                                    : 'div-active'
                            }
                        >
                            <span className="span1">Xác thực</span>
                            <span
                                className={
                                    parkingLot.VerifyState?.state
                                        ? parkingLot.VerifyState?.state ===
                                          verifyStates.VERIFIED
                                            ? 'span2-green'
                                            : parkingLot.VerifyState.state ===
                                              verifyStates.PENDING
                                            ? 'span2-orange'
                                            : 'span2-red'
                                        : 'span2'
                                }
                            >
                                {parkingLot.VerifyState?.state}
                            </span>
                        </div>

                        <div>
                            <span className="span1">Địa chỉ </span>
                            <span className="span2">{parkingLot.address}</span>
                        </div>
                        <div
                            className={
                                parkingLot.VerifyState?.state ===
                                verifyStates.VERIFIED
                                    ? null
                                    : 'div-unactive'
                            }
                        >
                            <span className="span1">Gói ưu đãi</span>
                            <span className="span2">
                                <Link to="/packages">
                                    <button>Xem gói ưu đãi</button>
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div
                        className={
                            user.role === roles.ADMIN &&
                            parkingLot.VerifyState?.state !==
                                verifyStates.VERIFIED
                                ? 'detail-parking-lot-content__sub__button-active'
                                : 'detail-parking-lot-content__sub__button-unactive'
                        }
                    >
                        <Button className="button-gray">
                            <Link to="/verify-request">Thoát</Link>
                        </Button>
                        <Button
                            className="button-green"
                            onClick={() => setShowModalVerify(true)}
                        >
                            Xác thực
                        </Button>
                    </div>
                </Form>
                <div className="detail-parking-lot-content__sub__parking-prices">
                    <p className="detail-parking-lot-content__sub__parking-prices__title">
                        Bảng giá đỗ xe
                    </p>
                    <div
                        className={
                            parkingLot.VerifyState?.state !==
                                verifyStates.VERIFIED ||
                            user.role === roles.PARKING_USER
                                ? 'div-unactive'
                                : 'detail-parking-lot-content__sub__parking-prices__button-add'
                        }
                    >
                        <Button className="button-green">
                            <PlusCircleOutlined className="detail-parking-lot-content__sub__parking-prices__button-add__icon" />
                            Thêm
                        </Button>
                    </div>
                    <Table
                        className="detail-parking-lot-content__sub__parking-prices__table"
                        columns={
                            user.role === roles.PARKING_USER
                                ? noActionColumns
                                : actionColumns
                        }
                        dataSource={parkingPirceList}
                        pagination={false}
                    />
                </div>
            </div>
            <Modal
                className="delete-parking-lot-modal"
                title="Xác thực bãi đỗ xe"
                visible={showModalVerify}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    className="delete-parking-lot-modal__form"
                    name="verify_parkingLot"
                >
                    <div className="delete-parking-lot-modal__form__item">
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
                    <div className="delete-parking-lot-modal__form__item">
                        <span className="span">Ghi chú</span>
                        <Form.Item name="note" className="form-item">
                            <Input.TextArea
                                id="note"
                                className="textarea"
                                size="medium"
                            />
                        </Form.Item>
                    </div>

                    <div className="delete-parking-lot-modal__button">
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
                className="delete-parking-lot-modal"
                title="Hủy đăng ký bãi đỗ xe"
                visible={showModalSoftDelete}
                onOk={softDeleteHandle}
                onCancel={handleCancel}
            >
                <p>
                    {user.role === roles.ADMIN
                        ? 'Bạn có chắn chắn muốn xóa bãi đỗ xe hay không ?'
                        : 'Bạn có chắn chắn muốn hủy đăng ký bãi đỗ xe hay không ?'}
                </p>
            </Modal>
        </div>
    )
}

export default DetailParkingLot
