import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import * as roles from 'shared/constants/role'
import * as verifyStates from 'shared/constants/verifyState'
import * as openState from 'shared/constants/openState'
import useAuth from 'hooks/useAuth'
import parkingLotApi from 'api/parkingLotApi'
import './detail-parking-lot.scss'

function DetailParkingLot() {
    const { user } = useAuth()
    const { id } = useParams()
    const [parkingLot, SetParkingLot] = useState({})

    useEffect(() => {
        if (!!id) {
            parkingLotApi.getOneById(id).then((response) => {
                SetParkingLot(response.data)
            })
        }
    }, [id])
    return (
        <div className="detail-parking-lot-content">
            <div className="title">
                <span>Thông tin bãi đỗ xe</span>
                <Link
                    to={`/parking-lots/edit/${parkingLot.id}`}
                    className={
                        user.role === roles.BASIC_USER
                            ? 'detail-parking-lot-content__button-edit-unactive'
                            : 'detail-parking-lot-content__button-edit-active'
                    }
                >
                    <EditOutlined />
                </Link>
            </div>
            <Form className="detail-parking-lot-content__sub">
                <img
                    className="detail-parking-lot-content__sub__image"
                    src={process.env.REACT_APP_API_URL + parkingLot.avatar}
                    alt="avatar"
                />
                <div className="detail-parking-lot-content__sub__info">
                    <div>
                        <span className="span1">Tên nhà xe</span>
                        <span className="span2">{parkingLot.name}</span>
                    </div>
                    <div>
                        <span className="span1">Chủ nhà xe </span>
                        <span className="span2">{parkingLot.Owner?.name}</span>
                    </div>
                    <div>
                        <span className="span1">Thời gian mở </span>
                        <span className="span2">{parkingLot.time_slot}</span>
                    </div>
                    <div>
                        <span className="span1">Sức chứa </span>
                        <span className="span2">{parkingLot.capacity}</span>
                    </div>
                    <div>
                        <span className="span1">Tình trạng</span>
                        <span
                            className={
                                parkingLot.is_open ? 'span2-green' : 'span2-red'
                            }
                        >
                            {parkingLot.is_open
                                ? openState.OPENING
                                : openState.CLOSED}
                        </span>
                    </div>
                    <div
                        className={
                            user.role === roles.BASIC_USER
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
                                ? 'div-active'
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
                        parkingLot.VerifyState?.state !== verifyStates.VERIFIED
                            ? 'detail-parking-lot-content__sub__button-active'
                            : 'detail-parking-lot-content__sub__button-unactive'
                    }
                >
                    <Button className="button-gray">
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
                    <Button className="button-green">
                        <Link to="/verify-request">Xác thực</Link>
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default DetailParkingLot
