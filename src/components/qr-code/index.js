import React from 'react'
import { useEffect, useState } from 'react'
import Modal from './modal'
import 'components/qr-code/qrcode.scss'
import QRCode from 'qrcode'

function QR(props) {
    const [src, setSrc] = useState({})
    const [clickedImg, setClickedImg] = useState(null)

    const data = {
        vehicle_id: props.vehicle_id,
        parking_lot_id: props.parking_lot_id,
        checkin_time: props.checkin_time,
        qr_key: props.qr_key,
    }
    useEffect(() => {
        QRCode.toDataURL(JSON.stringify(data)).then((data) => {
            setSrc(data)
        })
    }, [data])

    const handleClick = (src) => {
        setClickedImg(src)
    }

    return (
        <div div className="qr-checkout-container__content__item">
            <img
                className="qr-checkout-container__content__item__qr"
                src={src}
                onClick={() => handleClick(src)}
                alt=""
            />
            <div>
                {clickedImg && (
                    <Modal
                        clickedImg={clickedImg}
                        setClickedImg={setClickedImg}
                    />
                )}
            </div>
        </div>
    )
}

export default QR
