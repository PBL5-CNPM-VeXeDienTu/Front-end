import React from 'react'
import { useEffect, useState } from 'react'
import Modal from './modal'
import 'components/qr-code/qrcode.scss'
import QRCode from 'qrcode'

function QR(props) {
    const [src, setSrc] = useState('')
    const [clickedImg, setClickedImg] = useState(null)

    var data =
        'Vehicle_Id: ' +
        props.vehicle_id +
        '\n' +
        'Parking_Lot_Id: ' +
        props.parking_lot_id +
        '\n' +
        'Checkin_Time: ' +
        props.checkin_time +
        '\n' +
        'QR_key: ' +
        props.qr_key

    useEffect(() => {
        QRCode.toDataURL(data).then((data) => {
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
