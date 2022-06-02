import React, { useRef, useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import './checkin-checkout.scss'

function CheckinCheckout() {
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false)
    const ServerFlaskUrl = process.env.REACT_APP_API_FLASK_URL
    const [licensePlate, setLicensePlate] = useState(
        'Không nhận diện được biển số',
    )

    async function submit(e) {
        e.preventDefault()
        let video = videoRef.current
        let photo = photoRef.current
        photo.width = 640
        photo.height = 480
        let ctx = photo.getContext('2d')
        ctx.drawImage(video, 0, 0, 640, 480)

        setHasPhoto(true)
        var img = new Image()
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 640, 480)
        }

        let ImgUrl = photo.toDataURL()
        const blob = await (await fetch(ImgUrl)).blob()
        const file = new File([blob], 'fileName.jpg', {
            type: 'image/jpeg',
            lastModified: new Date(),
        })
        const formData = new FormData()
        formData.append('data', file, 'fileName.jpg')
        axios.post(ServerFlaskUrl, formData).then((res) => {
            setLicensePlate(res.data)
        })
    }

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 1920, height: 1080 } })
            .then((stream) => {
                let video = videoRef.current
                video.srcObject = stream
                video.play()
            })
            .catch((err) => {})
    }

    const closePhoto = () => {
        let photo = photoRef.current
        let ctx = photo.getContext('2d')
        ctx.clearRect(0, 0, photo.width, photo.height)
        setHasPhoto(false)
    }

    const [swapPage, setSwapPage] = useState(true)
    const [data, setData] = useState('No result')

    useEffect(() => {
        getVideo()
    }, [videoRef])

    return (
        <div>
            <div
                className={
                    swapPage
                        ? 'checkin-checkout-content'
                        : 'checkin-checkout-content-unactive'
                }
            >
                <div className="checkin-checkout-content__swap-page">
                    <button className="button-active">Checkin</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(false)}
                    >
                        Checkout
                    </button>
                </div>
                <div className="checkin-checkout-content__title">Checkin</div>

                <div className="checkin-checkout-content__app">
                    <div className="checkin-checkout-content__app__item">
                        <div className="checkin-checkout-content__app__item__camera">
                            <video
                                className="checkin-checkout-content__app__item__camera__video"
                                ref={videoRef}
                            />
                            <canvas
                                className="checkin-checkout-content__app__item__camera__video"
                                ref={photoRef}
                            />
                        </div>
                        <div className="checkin-checkout-content__app__item__form">
                            <Form.Item className="checkin-checkout-content__app__item__form__license-plates">
                                <Input
                                    type="text"
                                    required
                                    value={licensePlate}
                                    onChange={(e) =>
                                        setLicensePlate(e.target.value)
                                    }
                                />
                            </Form.Item>

                            <div className="checkin-checkout-content__app__item__form__btn">
                                <form onSubmit={(e) => submit(e)}>
                                    <button className="checkin-checkout-content__app__item__form__btn__takephoto">
                                        Take Photo
                                    </button>
                                </form>
                                <button
                                    className="checkin-checkout-content__app__item__form__btn__closephoto"
                                    onClick={closePhoto}
                                >
                                    Close Photo
                                </button>
                            </div>
                        </div>
                        <div className="checkin-checkout-content__app__item__btn-checkin">
                            <button className="button-checkin">Checkin</button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    swapPage
                        ? 'checkin-checkout-content-unactive'
                        : 'checkin-checkout-content'
                }
            >
                <div className="checkin-checkout-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(true)}
                    >
                        Checkin
                    </button>
                    <button className="button-active">Checkout</button>
                </div>
                <div className="checkin-checkout-content__title">Checkout</div>

                <div className="checkin-checkout-content__sub">
                    <div className="checkin-checkout-content__sub__item">
                        <div className="checkin-checkout-content__sub__item__camera">
                            <QrReader
                                className="checkin-checkout-content__sub__item__camera__video"
                                onResult={(result, error) => {
                                    if (!!result) {
                                        setData(result?.text)
                                    }

                                    if (!!error) {
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                            <p>{data}</p>
                        </div>
                        <div className="checkin-checkout-content__sub__item__info">
                            <div>
                                <span className="properties">Hãng xe</span>
                                <span>Suzuki</span>
                            </div>
                            <div>
                                <span className="properties">Màu</span>
                                <span>Xanh đen</span>
                            </div>
                            <div>
                                <span className="properties">Biển số</span>
                                <span>123456</span>
                            </div>
                            <div>
                                <span className="properties">Ngày đăng ký</span>
                                <span>01/01/2022</span>
                            </div>
                            <div>
                                <span className="properties">Xác thực</span>
                                <span>Đã xác thực</span>
                            </div>
                            <div>
                                <span className="properties">Mô tả</span>
                                <span>
                                    xe có đầy đủ 2 kính , bánh xe có vành màu
                                    cam , ống bô độ vip.
                                </span>
                            </div>
                            <div className="checkin-checkout-content__sub__item__info__button">
                                <Button className="button-success">
                                    Checkout
                                </Button>
                                <Button className="button-cancel">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckinCheckout
