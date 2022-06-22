import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { QrReader } from 'react-qr-reader'
import { Form, Input, Button, Select } from 'antd'
import axios from 'axios'
import messages from 'assets/lang/messages'
import useAuth from 'hooks/useAuth'
import checkinApi from 'api/checkinApi'
import checkoutApi from 'api/checkoutApi'
import parkingLotApi from 'api/parkingLotApi'
import vehicleApi from 'api/vehicleApi'
import './checkin-checkout.scss'
const { Option } = Select

function CheckinCheckout() {
    const FLASK_SERVER_API = process.env.REACT_APP_API_FLASK_URL

    const { user } = useAuth()
    const [parkingLotList, setParkingLotList] = useState([])
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false)
    const [licensePlate, setLicensePlate] = useState(
        'Không nhận diện được biển số',
    )

    useEffect(() => {
        if (!!user) {
                parkingLotApi.getListByUserId(user.id).then((response) => {
                      setParkingLotList(response.data.rows)
                  })
        }
    }, [])

    useEffect (() => {
        onchange = (data) => {}
    })

    async function handleSubmit(e) {
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
        axios.post(FLASK_SERVER_API, formData).then((res) => {
            setLicensePlate(res.data)
            console.log(res.data)
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
                console.log(error)
            })
    }

    

    const [swapPage, setSwapPage] = useState(true)
    const [data, setData] = useState('No result')

    useEffect(() => {
        getVideo()
    }, [swapPage])

    const checkoutSubmit = async (values) => {
        try {
            
            const qrData = {
                vehicle_id : parseInt(data.slice(12,data.indexOf('Parking_Lot_Id')-1)),
                parking_lot_id : parseInt(data.slice(data.indexOf('Parking_Lot_Id:')+16,data.indexOf('Checkin_Time:')-1)),
                checkin_time : data.slice(data.indexOf('Checkin_Time:')+14,data.indexOf('QR_key')-1),
                qr_key : data.slice(data.indexOf('QR_key:')+8,data.length)
            }
            const newCheckOut = {
                license_plate : values.license_plate,
                parking_lot_id : values.parking_lot_id,
                qr_data : qrData
            }
            console.log("check out",newCheckOut);
            setData('No result')
            const response = await checkoutApi.checkout(newCheckOut)
            
            alert(response.data.message)
            navigate('/checkin-checkout')
            
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const checkinSubmit = async (values) => {
        try {
            const newCheckIn = {
                license_plate : values.license_plate,
                parking_lot_id : values.parking_lot_id
            }
            console.log("alo",newCheckIn);

            const response = await checkinApi.checkin(newCheckIn)
            
            alert(response.data.message)
            navigate('/checkin-checkout')
            
        } catch (error) {
            alert(error.response.data.message)
            console.log(error)
            //console.log("1213",licensePlate)
        }
    }

    // console.log(ParkingLots);

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
                        onClick={() => setSwapPage(false)}
                    >
                        Checkout
                    </button>
                </div>
                <div className="checkin-checkout-content__title">Checkin</div>

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
                                }
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
                            <button className="checkin-checkout-content__app__form__taskPhoto__btn"
                            onClick = {handleSubmit}>Task Photo</button>
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
                        onClick={() => setSwapPage(true)}
                    >
                        Checkin
                    </button>
                    <button className="button-active">Checkout</button>
                </div>
                <div className="checkin-checkout-content__title">Checkout</div>

                <div className="checkin-checkout-content__sub">
                    <div className="checkin-checkout-content__sub__item">
                        <QrReader
                            className="checkin-checkout-content__sub__item__camera"
                            onResult={(result, error) => {
                                if (result) {
                                    setData(result.text)
                                }
                                if (error) {
                                    // console.log(error);
                                }
                            }}
                            //style={{ width: '100%' }}
                        />
                
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
                                }
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
                        <div className="checkin-checkout-content__sub__form__textqr">
                            <span className="span">{data!='No result' ? "Mã QR quét thành công" : "Mã QR quét thất bại"}</span>
                        </div>
                        <div className="checkin-checkout-content__sub__form__item">
                            <div>
                                <span className="span1">Biển số</span>
                                <span className="span2">
                                    123456
                                </span>
                            </div>
                            <div>
                                <span className="span1">Hãng xe</span>
                                <span className="span2">
                                    SH
                                </span>
                            </div>
                            <div>
                                <span className="span1">Màu</span>
                                <span className="span2">
                                    màu
                                </span>
                            </div>
                            <div>
                                <span className="span1">Mô tả</span>
                                <span className="span2">
                                    đây là mô tả
                                </span>
                            </div>
                        </div>
                        {/* <Button className="button-success"
                        onClick = {checkoutSubmit}>
                            Checkout
                        </Button> */}
                        <Button
                                className="checkin-checkout-content__app__form__btnCheckout"
                                type="primary"
                                htmlType="submit"
                            >
                                Checkout
                        </Button>
                        
                        </Form>
                        {/* <button className="checkin-checkout-content__app__form__taskPhoto__btn"
                            onClick = {handleSubmit}>Task Photo</button> */}
                    
                </div>
            </div>
        </div>
    )
}
export default CheckinCheckout