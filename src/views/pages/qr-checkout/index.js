import React, { useState, useEffect } from 'react'
import QR from 'components/qr-code/index'
import useAuth from 'hooks/useAuth'
import parkingHistoryApi from 'api/parkingHistoryApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './qr-checkout.scss'

function QrCheckout() {
    const { user } = useAuth()
    const [QRList, setQRList] = useState([])
    const [params] = useState({
        is_parking: 1,
    })

    useEffect(() => {
        if (!!user) {
            parkingHistoryApi
                .getListParkingVehicle(user.id, params)
                .then((response) => {
                    setQRList(
                        response.data.rows.map((parkingHistory) => ({
                            key: parkingHistory.id,
                            parking_lot_id: parkingHistory.parking_lot_id,
                            vehicle_id: parkingHistory.vehicle_id,
                            license_plate:
                                parkingHistory.Vehicle?.license_plate,
                            qr_key: parkingHistory.qr_key,
                            checkin_time: parkingHistory.checkin_time,
                            memo: parkingHistory.memo,
                            name: parkingHistory.ParkingLot?.name,
                            address: parkingHistory.ParkingLot?.address,
                            avatar: parkingHistory.Vehicle?.avatar,
                        })),
                    )
                })
        }
    }, [user, params])

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.VEHICLE_AVATAR
    }

    const listQRs = QRList.map((value, _) => {
        return (
            <div
                className="qr-checkout-container__content__sub"
                key={QRList.id}
            >
                <div className="qr-checkout-container__content__item">
                    <div className="qr-checkout-container__content__item__info">
                        <div>
                            <span className="properties">Hình ảnh xe</span>
                            <img
                                src={
                                    process.env.REACT_APP_API_URL + value.avatar
                                }
                                alt=""
                                onError={handleGetImageError}
                            />
                        </div>
                        <div>
                            <span className="properties">Tên bãi đỗ xe</span>
                            <span>{value.name}</span>
                        </div>
                        <div>
                            <span className="properties">
                                Địa chỉ bãi đỗ xe
                            </span>
                            <span>{value.address}</span>
                        </div>
                        <div>
                            <span className="properties">
                                Thời gian checkin
                            </span>
                            <span>{value.checkin_time}</span>
                        </div>
                        <div>
                            <span className="properties">Ghi chú</span>
                            <span>{value.memo}</span>
                        </div>
                    </div>

                    <QR
                        className="qr-code"
                        vehicle_id={value.vehicle_id}
                        parking_lot_id={value.parking_lot_id}
                        checkin_time={value.checkin_time}
                        qr_key={value.qr_key}
                    />
                </div>
            </div>
        )
    })

    return (
        <div className="qr-checkout-container">
            {listQRs.length === 0 ? (
                <div className="qr-content">
                    Hiện bạn đang không có xe nào đang đỗ
                </div>
            ) : (
                <div className="qr-checkout-container__content">{listQRs}</div>
            )}
        </div>
    )
}

export default QrCheckout
