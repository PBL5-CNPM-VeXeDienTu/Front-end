import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'

import useAuth from 'hooks/useAuth'
import vehicleApi from 'api/vehicleApi'
import './vehicle-list.scss'

const VERIFIED_STATE = 'Đã được kiểm duyệt'
const VERIFYING_STATE = 'Đang chờ xử lý'

function Vehicles() {
    const { user } = useAuth()
    const [vehicleList, setVehicleList] = useState([])

    useEffect(() => {
        if (!!user) {
            vehicleApi.getListByUserId(user.id).then((response) => {
                setVehicleList(response.data.rows)
            })
        }
    }, [user])
    console.log(vehicleList)
    const navigate = useNavigate()
    const onClickHandler = (vehicleId) =>
        navigate(`/vehicles/detail/${vehicleId}`)

    return (
        <div className="vehicles-list-container">
            <div className="vehicles-list-container__button-add">
                <Link to="/vehicles/add">
                    <button>
                        <PlusCircleOutlined className="icon" />
                        Đăng ký
                    </button>
                </Link>
            </div>
            <div className="vehicles-list-container__content">
                {vehicleList?.map((vehicle) => (
                    <div
                        className="vehicles-list-container__content__sub"
                        onClick={() => onClickHandler(vehicle.id)}
                    >
                        <div className="vehicles-list-container__content__item">
                            <img
                                className="vehicles-list-container__content__item__image"
                                src={
                                    process.env.REACT_APP_API_URL +
                                    vehicle.avatar
                                }
                                alt=""
                            />
                            <div className="vehicles-list-container__content__item__info">
                                <div>
                                    <span className="span1">Biển số</span>
                                    <span className="span2">
                                        {vehicle.license_plate}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Hãng xe</span>
                                    <span className="span2">
                                        {vehicle.brand}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Màu</span>
                                    <span className="span2">
                                        {vehicle.color}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Ngày đăng ký</span>
                                    <span className="span2">
                                        {vehicle.createdAt}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Xác thực</span>
                                    <span
                                        className={
                                            vehicle.VerifyState.state ===
                                            VERIFIED_STATE
                                                ? 'span2-green'
                                                : vehicle.VerifyState.state ===
                                                  VERIFYING_STATE
                                                ? 'span2-yellow'
                                                : 'span2-red'
                                        }
                                    >
                                        {vehicle.VerifyState.state}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Vehicles
