import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'

import useAuth from 'hooks/useAuth'
import vehicleApi from 'api/vehicleApi'
import './vehicle-list.scss'

function Vehicles() {
    const { user } = useAuth()
    const [vehicleList, setVehicalList] = useState([])

    useEffect(() => {
        if (!!user) {
            vehicleApi.getByUserId(user.id).then((response) => {
                setVehicalList(response.data)
            })
        }
    }, [user])

    const navigate = useNavigate()
    const onClickHandler = () => navigate('/vehicles/detail')

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
                        onClick={onClickHandler}
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
                                    <span className="properties">Biển số</span>
                                    <span>{vehicle.license_plate}</span>
                                </div>
                                <div>
                                    <span className="properties">Hãng xe</span>
                                    <span>{vehicle.brand}</span>
                                </div>
                                <div>
                                    <span className="properties">Màu</span>
                                    <span>{vehicle.color}</span>
                                </div>
                                <div>
                                    <span className="properties">
                                        Ngày đăng ký
                                    </span>
                                    <span>{vehicle.createdAt}</span>
                                </div>
                                <div>
                                    <span className="properties">Xác thực</span>
                                    <span>{vehicle.verify_state_id}</span>
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
