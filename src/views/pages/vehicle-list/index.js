import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import * as verifyStates from 'shared/constants/verifyState'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import vehicleApi from 'api/vehicleApi'
import './vehicle-list.scss'

function Vehicles() {
    const { user } = useAuth()
    const [vehicleList, setVehicleList] = useState([])

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.VEHICLE_AVATAR
    }

    useEffect(() => {
        if (!!user) {
            vehicleApi.getListByUserId(user.id).then((response) => {
                setVehicleList(response.data.rows)
            })
        }
    }, [user])

    const navigate = useNavigate()
    const onClickHandler = (vehicleId) => navigate(`/vehicles/${vehicleId}`)

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
                                onError={handleGetImageError}
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
                                    <span className="span1">Trạng thái</span>
                                    <span
                                        className={
                                            vehicle.VerifyState.state ===
                                            verifyStates.VERIFIED
                                                ? 'span2-green'
                                                : vehicle.VerifyState.state ===
                                                  verifyStates.PENDING
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
