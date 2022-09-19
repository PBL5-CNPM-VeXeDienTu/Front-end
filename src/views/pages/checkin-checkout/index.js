import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrReader } from 'react-qr-reader'
import { Form, Input, Button, Select, Modal } from 'antd'
import { ScanOutlined, WarningOutlined, CheckOutlined } from '@ant-design/icons'
import axios from 'axios'
import messages from 'assets/lang/messages'
import useAuth from 'hooks/useAuth'
import checkinApi from 'api/checkinApi'
import checkoutApi from 'api/checkoutApi'
import parkingLotApi from 'api/parkingLotApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './checkin-checkout.scss'
const { Option } = Select

function CheckinCheckout() {
    const FLASK_SERVER_API = process.env.REACT_APP_API_FLASK_URL

    const { user } = useAuth()
    const [parkingLotList, setParkingLotList] = useState([])
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [infoVehicle, setInfoVehicle] = useState({})
    const [licensePlate, setLicensePlate] = useState(
        'Không nhận diện được biển số',
    )

    useEffect(() => {
        if (!!user) {
            parkingLotApi.getListByUserId(user.id).then((response) => {
                setParkingLotList(response.data.rows)
            })
        }
    }, [user])

    useEffect(() => {
        onchange = (data) => {}
    })

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.VEHICLE_AVATAR
    }

    const handleCancel = () => {
        setShowSuccessModal(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let video = videoRef.current
        let photo = photoRef.current

        photo.width = 640
        photo.height = 480

        let ctx = photo.getContext('2d')
        ctx.drawImage(video, 0, 0, 640, 480)

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
        axios.post(FLASK_SERVER_API, formData).then((res) => {
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
            .catch((error) => {
                alert(error)
            })
    }

    const [swapPage, setSwapPage] = useState(true)
    const [data, setData] = useState('No result')

    useEffect(() => {
        getVideo()
    }, [swapPage])

    const checkoutSubmit = async (values) => {
        try {
            const qrData = JSON.parse(data)
            const newCheckOut = {
                license_plate: values.license_plate,
                parking_lot_id: values.parking_lot_id,
                qr_data: qrData,
            }
            setData('No result')

            const response = await checkoutApi.checkout(newCheckOut)

            alert(response.data.message)

            if (response.status === 200) {
                setInfoVehicle(response.data.Vehicle)
                setShowSuccessModal(true)
            }

            navigate('/checkin-checkout')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const checkinSubmit = async (values) => {
        try {
            const newCheckIn = {
                license_plate: values.license_plate,
                parking_lot_id: values.parking_lot_id,
            }

            const response = await checkinApi.checkin(newCheckIn)

            alert(response.data.message)
            navigate('/checkin-checkout')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div>
            <div
                className={
                    swapPage
                        ? 'checkin-checkout-content'
                        : 'checkin-checkout-content-unactive'
                }
            >
                <div className="title">Checkin</div>
                <div className="checkin-checkout-content__swap-page">
                    <button className="button-active">Checkin</button>
                    <button
                        className="button-unactive"
                        onClick={() => setSwapPage(false)}
                    >
                        Checkout
                    </button>
                </div>

                <div className="checkin-checkout-content__app">
                    <div className="checkin-checkout-content__app__camera">
                        <video
                            className="checkin-checkout-content__app__camera__video"
                            ref={swapPage ? videoRef : null}
                        />
                        <canvas
                            className="checkin-checkout-content__app__camera__canvas"
                            ref={photoRef}
                        />
                    </div>
                    <div>
                        <Form
                            name="checkin-checkout-content__app__form"
                            className="checkin-checkout-content__app__form"
                            onFinish={checkinSubmit}
                            fields={[
                                {
                                    name: ['license_plate'],
                                    value: licensePlate,
                                },
                            ]}
                        >
                            <div className="checkin-checkout-content__app__form__item">
                                <span className="span">Tên nhà xe</span>
                                <Form.Item
                                    name="parking_lot_id"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Select className="textbox">
                                        {parkingLotList.map((item, id) => {
                                            return (
                                                <Option value={item.id}>
                                                    {item.name}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="checkin-checkout-content__app__form__item">
                                <span className="span">Biển số xe</span>
                                <Form.Item
                                    name="license_plate"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                    initialValue={licensePlate}
                                >
                                    <Input
                                        type="text"
                                        required
                                        onChange={(e) =>
                                            setLicensePlate(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <Button
                                className="checkin-checkout-content__app__form__btnCheckin"
                                type="primary"
                                htmlType="submit"
                            >
                                Checkin
                            </Button>
                        </Form>

                        <div className="checkin-checkout-content__app__form__taskPhoto">
                            <button
                                className="checkin-checkout-content__app__form__taskPhoto__btn"
                                onClick={handleSubmit}
                            >
                                <ScanOutlined className="icon-scan" />
                                Quét biển số
                            </button>
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
                <div className="title">Checkout</div>
                <div className="checkin-checkout-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={() => setSwapPage(true)}
                    >
                        Checkin
                    </button>
                    <button className="button-active">Checkout</button>
                </div>

                <div className="checkin-checkout-content__sub">
                    <div className="checkin-checkout-content__sub__item">
                        <video
                            className="checkin-checkout-content__sub__item__video"
                            ref={!swapPage ? videoRef : null}
                        />
                    </div>
                    <Form
                        name="checkin-checkout-content__sub__form"
                        className="checkin-checkout-content__sub__form"
                        onFinish={checkoutSubmit}
                        fields={[
                            {
                                name: ['license_plate'],
                                value: licensePlate,
                            },
                        ]}
                    >
                        <div className="checkin-checkout-content__sub__form__info">
                            <span className="span">Tên nhà xe</span>
                            <Form.Item
                                name="parking_lot_id"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                            >
                                <Select className="textbox">
                                    {parkingLotList.map((item, id) => {
                                        return (
                                            <Option value={item.id}>
                                                {item.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="checkin-checkout-content__sub__form__info">
                            <span className="span">Biển số xe</span>
                            <Form.Item
                                name="license_plate"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                ]}
                                initialValue={licensePlate}
                            >
                                <Input
                                    type="text"
                                    required
                                    onChange={(e) =>
                                        setLicensePlate(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                        <QrReader
                            className="checkin-checkout-content__sub__form__qrreader"
                            onResult={(result, error) => {
                                if (result) {
                                    setData(result.text)
                                }
                            }}
                        />
                        <div className="checkin-checkout-content__sub__form__textqr">
                            <span className="span">
                                {data !== 'No result'
                                    ? 'Mã QR quét thành công '
                                    : 'Mã QR chưa được quét '}
                            </span>
                            <WarningOutlined
                                className={
                                    data !== 'No result'
                                        ? 'warning-content-unactive'
                                        : 'warning-content'
                                }
                            />
                            <CheckOutlined
                                className={
                                    data !== 'No result'
                                        ? 'success-content'
                                        : 'success-content-unactive'
                                }
                            />
                        </div>

                        <Button
                            className="checkin-checkout-content__sub__form__btnCheckout"
                            type="primary"
                            htmlType="submit"
                        >
                            Checkout
                        </Button>
                    </Form>
                    <div className="checkin-checkout-content__sub__form__take-photo">
                        <button
                            className="checkin-checkout-content__sub__form__take-photo__btn"
                            onClick={handleSubmit}
                        >
                            <ScanOutlined className="icon-scan" />
                            Quét biển số
                        </button>
                    </div>

                    <Modal
                        className="success-modal"
                        visible={showSuccessModal}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <h1 className="h1">Checkout thành công</h1>
                        <Form
                            onFinish={handleCancel}
                            fields={[
                                {
                                    name: ['license_plate'],
                                    value: infoVehicle.license_plate,
                                },
                                {
                                    name: ['brand'],
                                    value: infoVehicle.brand,
                                },
                                {
                                    name: ['color'],
                                    value: infoVehicle.color,
                                },
                                {
                                    name: ['detail'],
                                    value: infoVehicle.detail,
                                },
                            ]}
                        >
                            <div className="div">
                                <span className="span1">Hình ảnh xe</span>
                                <img
                                    src={
                                        process.env.REACT_APP_API_URL +
                                        infoVehicle.avatar
                                    }
                                    alt=""
                                    onError={handleGetImageError}
                                />
                            </div>
                            <div className="div">
                                <span className="span1">Biển số</span>
                                <Form.Item
                                    name="license_plate"
                                    className="span2"
                                    initialValue={infoVehicle.license_plate}
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Hãng xe</span>
                                <Form.Item
                                    name="brand"
                                    className="span2"
                                    initialValue={infoVehicle.brand}
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Màu</span>
                                <Form.Item
                                    name="color"
                                    className="span2"
                                    initialValue={infoVehicle.color}
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Mô tả</span>
                                <Form.Item
                                    name="detail"
                                    className="span2"
                                    initialValue={infoVehicle.detail}
                                >
                                    <Input.TextArea
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                            <div className="button">
                                <button
                                    className="button-green"
                                    htmlType="submit"
                                >
                                    OK
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default CheckinCheckout
