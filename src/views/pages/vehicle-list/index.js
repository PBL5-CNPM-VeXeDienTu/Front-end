import React from 'react'
import { PlusOutlined, EditOutlined, CloseOutlined }from '@ant-design/icons'
// import image from 'assets/images/motoo.png'
import './vehicle-list.scss'
function Vehicles() {
    const avatarURL = process.env.REACT_APP_API_URL + 'public/images/avatars/vehicle/default-avatar.png';
    return (
        <div className="vehicles-list-background">
            <div className="vehicles-list-container">
                <div className="vehicles-list-container__button-add">
                    <button>
                        Đăng ký xe
                        <span><PlusOutlined/></span>  
                    </button>
                </div>
                <div className="vehicles-list-container__content">
                    <div className="vehicles-list-container__content__sub">
                        <div className="vehicles-list-container__content__item">
                            <img className="vehicles-list-container__content__item__image" src={avatarURL}/>
                            <div className="vehicles-list-container__content__item__info">
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
                                    <span className="properties">Hãng xe</span>
                                    <span>xe có đầy đủ 2 kính ,  bánh xe có vành màu cam , ống bô độ vip.</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="vehicles-list-container__content__icon">
                            <span className="edit-vehicle"><EditOutlined/></span>
                            <span className="delete-vehicle"><CloseOutlined/></span>
                        </div>
                    </div>

                    <div className="vehicles-list-container__content__sub">
                        <div className="vehicles-list-container__content__item">
                            <img className="vehicles-list-container__content__item__image" src={avatarURL}/>
                            <div className="vehicles-list-container__content__item__info">
                                <div>
                                    <span className="properties">Hãng xe</span>
                                    <span>Moto H2R</span>
                                </div>
                                <div>
                                    <span className="properties">Màu</span>
                                    <span>Đen</span>
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
                                    <span className="properties">Hãng xe</span>
                                    <span>xe có đầy đủ 2 kính ,  bánh xe có vành màu cam , ống bô độ vip.</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="vehicles-list-container__content__icon">
                            <span className="edit-vehicle"><EditOutlined/></span>
                            <span className="delete-vehicle"><CloseOutlined/></span>
                        </div>
                    </div>

                    <div className="vehicles-list-container__content__sub">
                        <div className="vehicles-list-container__content__item">
                            <img className="vehicles-list-container__content__item__image" src={avatarURL}/>
                            <div className="vehicles-list-container__content__item__info">
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
                                    <span className="properties">Hãng xe</span>
                                    <span>xe có đầy đủ 2 kính ,  bánh xe có vành màu cam , ống bô độ vip.</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="vehicles-list-container__content__icon">
                            <span className="edit-vehicle"><EditOutlined/></span>
                            <span className="delete-vehicle"><CloseOutlined/></span>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Vehicles