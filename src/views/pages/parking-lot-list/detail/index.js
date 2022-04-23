import React from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import './detail-parking-lot.scss'

function DetailParkingLot() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/parking-lot/default-avatar-test.png'
    return (
        <div className="detail-parking-lot__content">
            <div className="detail-parking-lot__content__title">
                Thông tin nhà xe
            </div>
            <div className="detail-parking-lot__content__item">
                <img
                    className="detail-parking-lot__content__item__image"
                    src={avatarURL}
                />
                <div className="detail-parking-lot__content__item__info">
                    <div>
                        <span className="properties">Tên nhà xe</span>
                        <span>Bãi xe khu A đại học Bách Khoa</span>
                    </div>
                    <div>
                        <span className="properties">Thời gian mở </span>
                        <span>7h sáng - 22h tối</span>
                    </div>
                    <div>
                        <span className="properties">Tình trạng</span>
                        <span>Đang mở </span>
                    </div>
                    <div>
                        <span className="properties">Sức chứa </span>
                        <span>1000 chỗ</span>
                    </div>
                    <div>
                        <span className="properties">Chủ nhà xe </span>
                        <span>Phạm Văn Thọ</span>
                    </div>
                    <div>
                        <span className="properties">Địa chỉ </span>
                        <span>
                            Khu A đại học Bách Khoa , Đường Nguyễn Lương Bằng ,
                            Phường Hòa Khánh Bắc , Liên Chiều
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailParkingLot
