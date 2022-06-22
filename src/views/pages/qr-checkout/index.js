import React from 'react'
import QR from 'components/qr-code/index'

import './qr-checkout.scss'

function QrCheckout() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'

/* 
    qrData: {
        vehicle_id,
        parking_lot_id,
        checkin_time,
        qr_key
    }
*/

    const QRList = [
        {
            vehicle_id: '4',
            parking_lot_id: '1',
            checkin_time: '2022-06-21 20:37:25',
            qr_key: '496a6e00-f167-11ec-9d32-657952c1f360',
        },
        {
            vehicle_id: '2',
            parking_lot_id: '9',
            checkin_time: '2022-06-18 20:50:25',
            qr_key: '9b2c7c80-ef0d-11ec-a52f-b1040bb98e5f',
        },
        {
            vehicle_id: '2',
            parking_lot_id: '9',
            checkin_time: '2022-06-18 20:50:25',
            qr_key: '9b2c7c80-ef0d-11ec-a52f-b1040bb98e5f',
        },
    ]
    const listQRs = QRList.map((value, index) => {
        return (
            <div
                className="qr-checkout-container__content__sub"
                key={QRList.id}
            >
                <div className="qr-checkout-container__content__item">
                    <div className="qr-checkout-container__content__item__info">
                        <div>
                            <span className="properties">Hình ảnh xe</span>
                            <img src={avatarURL} alt="" />
                        </div>
                        <div>
                            <span className="properties">Tên bãi đỗ xe</span>
                            <span>Bãi xe Nhật Hào</span>
                        </div>
                        <div>
                            <span className="properties">
                                Địa chỉ bãi đỗ xe
                            </span>
                            <span>142/20 Âu Cơ</span>
                        </div>
                        <div>
                            <span className="properties">
                                Thời gian checkin
                            </span>
                            <span>2022-03-22 07:12:37</span>
                        </div>
                        <div>
                            <span className="properties">Ghi chú</span>
                            <span>
                                Gần cột màu đỏ, dưới cửa sổ, gần biển treo tường
                                màu xanh
                            </span>
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
            <div className="qr-checkout-container__content">
                <div>{listQRs}</div>
            </div>
        </div>
    )
}

export default QrCheckout
