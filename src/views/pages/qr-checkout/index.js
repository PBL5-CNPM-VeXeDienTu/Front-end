import React, { useEffect, useState } from 'react'
import './qr-checkout.scss'
import QR from 'components/qr-code/index'

function QrCheckout() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'

    const QRList = [
        {
            userid: '32',
            license_plates: '34-B11234',
            qr_key: '29,219219',
        },
        {
            userid: '11',
            license_plates: '55-A99234',
            qr_key: '21,1361723821',
        },
        {
            userid: '44',
            license_plates: '22-A99234',
            qr_key: '17,12831823',
        },
    ]
    const listQRs = QRList.map((value, index) => {
        return (
            <div
                className="qr-checkout-container__content__sub"
                key={QRList.id}
            >
                <div className="qr-checkout-container__content__sub__title">
                    <span>QR Checkout</span>
                </div>
                <div className="qr-checkout-container__content__item">
                    <div className="qr-checkout-container__content__item__info">
                        <div>
                            <span className="properties">Hình ảnh xe</span>
                            <img src={avatarURL} />
                        </div>
                        <div>
                            <span className="properties">Tên bãi đang đỗ</span>
                            <span>Bãi xe Nhật Hào</span>
                        </div>
                        <div>
                            <span className="properties">Địa chỉ bãi xe</span>
                            <span>142/20 Âu Cơ</span>
                        </div>
                        <div>
                            <span className="properties">
                                Thời gian checkin
                            </span>
                            <span>2022-03-22 07:12:37</span>
                        </div>
                        <div>
                            <span className="properties">Memo</span>
                            <span>
                                gần cột màu đỏ, dưới cửa sổ, gần biển treo tường
                                màu xanh
                            </span>
                        </div>
                    </div>

                    <QR
                        userid={value.userid}
                        license_plates={value.license_plates}
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
