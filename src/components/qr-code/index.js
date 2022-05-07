import React, { Component } from 'react'
import { useEffect, useState } from 'react'
import Modal from './modal'
import 'components/qr-code/qrcode.scss'
import QRCode from 'qrcode'

function QR(props) {
    var data =
        'User_Id: ' +
        props.userid +
        '\n' +
        'License_plate: ' +
        props.license_plates +
        '\n' +
        'QR_key: ' +
        props.qr_key
    const [src, setSrc] = useState('')
    useEffect(() => {
        QRCode.toDataURL(data).then((data) => {
            setSrc(data)
        })
    }, [])
    const [clickedImg, setClickedImg] = useState(null)
    const handleClick = (src) => {
        setClickedImg(src)
    }

    return (
        <div div className="qr-checkout-container__content__item">
            <img
                className="qr-checkout-container__content__item__qr"
                src={src}
                onClick={() => handleClick(src)}
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
