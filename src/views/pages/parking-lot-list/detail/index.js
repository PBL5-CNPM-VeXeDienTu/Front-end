import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import './detail-parking-lot.scss'

function DetailParkingLot() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/parking-lot/default-avatar.png'
    return (
        <div className="detail-parking-lot-content">
            <div className="detail-parking-lot-content__title">
                <span>Thông tin nhà xe</span>
                <Link
                    to="/parking-lots/edit"
                    className="detail-parking-lot-content__button-edit"
                >
                    <EditOutlined />
                </Link>
            </div>
            <Form className="detail-parking-lot-content__sub">
                <img
                    className="detail-parking-lot-content__sub__image"
                    src={avatarURL}
                    alt="avatar" 
                />
                <div className="detail-parking-lot-content__sub__info">
                    <div>
                        <span className="properties">Tên nhà xe</span>
                        <span>Bãi xe khu A đại học Bách Khoa</span>
                    </div>
                    <div>
                        <span className="properties">Chủ nhà xe </span>
                        <span>Phạm Văn Thọ</span>
                    </div>
                    <div>
                        <span className="properties">Thời gian mở </span>
                        <span>7h - 22h</span>
                    </div>
                    <div>
                        <span className="properties">Tình trạng</span>
                        <span>Đang mở </span>
                    </div>
                    <div>
                        <span className="properties">Sức chứa </span>
                        <span>1000</span>
                    </div>

                    <div>
                        <span className="properties">Địa chỉ </span>
                        <span>
                            Khu A đại học Bách Khoa , Đường Nguyễn Lương Bằng ,
                            Phường Hòa Khánh Bắc , Liên Chiều
                        </span>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default DetailParkingLot
