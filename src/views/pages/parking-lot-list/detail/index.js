import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import './detail-parking-lot.scss'

function DetailParkingLot() {
    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/parking-lot/default-avatar.png'
    const { user } = useAuth()
    return (
        <div className="detail-parking-lot-content">
            <div className="title">
                <span>Thông tin bãi đỗ xe</span>
                <Link
                    to="/parking-lots/edit"
                    className={
                        user.role === roles.PARKING_LOT_USER
                            ? 'detail-parking-lot-content__button-edit-active'
                            : 'detail-parking-lot-content__button-edit-unactive'
                    }
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
                    <div
                        className={
                            user.role === roles.ADMIN
                                ? 'div-unactive'
                                : 'div-active'
                        }
                    >
                        <span className="properties">Gói ưu đãi</span>
                        <span>
                            <Link to="/packages">
                                <button>Xem gói ưu đãi</button>
                            </Link>
                        </span>
                    </div>
                </div>
                <div
                    className={
                        user.role === roles.ADMIN
                            ? 'detail-parking-lot-content__sub__button-active'
                            : 'detail-parking-lot-content__sub__button-unactive'
                    }
                >
                    <Button className="button-gray">
                        <Link to="/verify-request">Thoát</Link>
                    </Button>
                    <Button className="button-green">
                        <Link to="/verify-request">Xác thực</Link>
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default DetailParkingLot
