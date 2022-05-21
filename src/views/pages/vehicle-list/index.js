import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'

import './vehicle-list.scss'

function Vehicles() {
    const navigate = useNavigate()
    const onClickHandler = () => navigate('/vehicles/detail')

    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'

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
                <div
                    className="vehicles-list-container__content__sub"
                    onClick={onClickHandler}
                >
                    <div className="vehicles-list-container__content__item">
                        <img
                            className="vehicles-list-container__content__item__image"
                            src={avatarURL}
                            alt=""
                        />
                        <div className="vehicles-list-container__content__item__info">
                            <div>
                                <span className="properties">Biển số</span>
                                <span>123456</span>
                            </div>
                            <div>
                                <span className="properties">Hãng xe</span>
                                <span>Suzuki</span>
                            </div>
                            <div>
                                <span className="properties">Màu</span>
                                <span>Xanh đen</span>
                            </div>
                            <div>
                                <span className="properties">Ngày đăng ký</span>
                                <span>01/01/2022</span>
                            </div>
                            <div>
                                <span className="properties">Xác thực</span>
                                <span>Đã xác thực</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="vehicles-list-container__content__sub"
                    onClick={onClickHandler}
                >
                    <div className="vehicles-list-container__content__item">
                        <img
                            className="vehicles-list-container__content__item__image"
                            src={avatarURL}
                            alt=""
                        />
                        <div className="vehicles-list-container__content__item__info">
                            <div>
                                <span className="properties">Biển số</span>
                                <span>123456</span>
                            </div>
                            <div>
                                <span className="properties">Hãng xe</span>
                                <span>Suzuki</span>
                            </div>
                            <div>
                                <span className="properties">Màu</span>
                                <span>Xanh đen</span>
                            </div>
                            <div>
                                <span className="properties">Ngày đăng ký</span>
                                <span>01/01/2022</span>
                            </div>
                            <div>
                                <span className="properties">Xác thực</span>
                                <span>Đã xác thực</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="vehicles-list-container__content__sub"
                    onClick={onClickHandler}
                >
                    <div className="vehicles-list-container__content__item">
                        <img
                            className="vehicles-list-container__content__item__image"
                            src={avatarURL}
                            alt=""
                        />
                        <div className="vehicles-list-container__content__item__info">
                            <div>
                                <span className="properties">Biển số</span>
                                <span>123456</span>
                            </div>
                            <div>
                                <span className="properties">Hãng xe</span>
                                <span>Suzuki</span>
                            </div>
                            <div>
                                <span className="properties">Màu</span>
                                <span>Xanh đen</span>
                            </div>
                            <div>
                                <span className="properties">Ngày đăng ký</span>
                                <span>01/01/2022</span>
                            </div>
                            <div>
                                <span className="properties">Xác thực</span>
                                <span>Đã xác thực</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicles
