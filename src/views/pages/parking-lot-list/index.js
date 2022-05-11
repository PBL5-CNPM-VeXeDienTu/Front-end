import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Input, Modal } from 'antd'
import {
    PlusCircleOutlined,
    EditOutlined,
    CloseOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'

import './parking-lot-list.scss'
import { roles } from 'contexts/UserContext'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'name',
        width: '25%',
    },
    {
        title: 'Thời gian mở',
        dataIndex: 'time',
        width: '13%',
    },
    {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        width: '10%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '13%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
]

function ParkingLots() {
    const { user } = useAuth()
    const [page, setPage] = useState(10)
    const [filterState, setFilterState] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const navigate = useNavigate()

    const avatarURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/parking-lot/default-avatar.png'

    const onSearch = (value) => console.log(value)

    const state = {
        pagination: {
            pageSize: page,
        },
    }

    const data = []
    for (let i = 0; i < page; i++) {
        data.push({
            key: i,
            name: 'Bãi đỗ xe KTX Bách Khoa',
            time: '7h - 21h30',
            capacity: 200,
            status: 'Đang mở cửa',
            address: '60 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiển, Đà Nẵng',
        })
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    return user.role === roles.BASIC_USER ? (
        //--------------------------------Basic User--------------------------------------
        <div className="parking-lot-list-content">
            <div className="title">Danh sách bãi đỗ xe</div>
            <div className="parking-lot-list-content__action">
                <div className="parking-lot-list-content__action__select">
                    <span>Hiển thị </span>
                    <select
                        defaultValue={{ value: page }}
                        onChange={(e) => setPage(e.target.value)}
                    >
                        {numOfItem.map((numOfItem, index) => {
                            return (
                                <option key={index} value={numOfItem}>
                                    {numOfItem}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="parking-lot-list-content__action__filter-state">
                    <span className="span">Trạng thái</span>
                    <button
                        className={
                            filterState === 0
                                ? 'button-active__left'
                                : 'button-unactive__left'
                        }
                        onClick={(e) => setFilterState(0)}
                    >
                        All
                    </button>
                    <button
                        className={
                            filterState === 1
                                ? 'button-active'
                                : 'button-unactive'
                        }
                        onClick={(e) => setFilterState(1)}
                    >
                        Mở cửa
                    </button>
                    <button
                        className={
                            filterState === 2
                                ? 'button-active__right'
                                : 'button-unactive__right'
                        }
                        onClick={(e) => setFilterState(2)}
                    >
                        Đóng cửa
                    </button>
                </div>

                <div className="parking-lot-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="parking-lot-list-content__action__search__icon" />
                </div>
            </div>

            <div className="parking-lot-list-content__sub">
                <Table
                    className="parking-lot-list-content__sub__table"
                    columns={columns}
                    dataSource={data}
                    pagination={state.pagination}
                    rowClassName={(record, index) =>
                        record.status === 'Đang mở cửa'
                            ? 'parking-lot-list-content__sub__table__row-green'
                            : 'parking-lot-list-content__sub__table__row-red'
                    }
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => navigate('/parking-lots/detail'),
                        }
                    }}
                />
            </div>
        </div>
    ) : //--------------------------------Parking-lot User----------------------------------
    user.role === roles.PARKING_LOT_USER ? (
        <div className="parking-lot-list-container">
            <div className="parking-lot-list-container__button-add">
                <Link to="/parking-lots/add">
                    <button>
                        Đăng ký
                        <PlusCircleOutlined className="icon" />
                    </button>
                </Link>
            </div>
            <div className="parking-lot-list-container__content">
                <div className="parking-lot-list-container__content__sub">
                    <div className="parking-lot-list-container__content__item">
                        <img
                            className="parking-lot-list-container__content__item__image"
                            src={avatarURL}
                        />
                        <div className="parking-lot-list-container__content__item__info">
                            <div>
                                <span className="properties">Tên nhà xe</span>
                                <span>Bãi xe khu A đại học Bách Khoa</span>
                            </div>
                            <div>
                                <span className="properties">Chủ nhà xe</span>
                                <span>Nguyễn Hoàng Phú</span>
                            </div>
                            <div>
                                <span className="properties">Thời gian mở</span>
                                <span>7h - 22h</span>
                            </div>
                            <div>
                                <span className="properties">Tình trạng</span>
                                <span>Đang mở</span>
                            </div>
                            <div>
                                <span className="properties">Sức chứa</span>
                                <span>1000</span>
                            </div>
                            <div>
                                <span className="properties">Xác thực</span>
                                <span>Đã xác thực</span>
                            </div>
                            <div>
                                <span className="properties">Mô tả</span>
                                <span>
                                    xe có đầy đủ 2 kính , bánh xe có vành màu
                                    cam , ống bô độ vip.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="parking-lot-list-container__content__icon">
                        <Link to="/parking-lots/edit">
                            <span className="edit-vehicle">
                                <EditOutlined />
                            </span>
                        </Link>
                        <span className="delete-parking-lot">
                            <CloseOutlined onClick={showModal} />
                        </span>
                    </div>
                    <Modal
                        className="delete-parking-lot-modal"
                        title="Hủy đăng ký bãi đỗ xe"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p>
                            Bạn có chắn chắn muốn hủy đăng ký bãi đỗ xe hay
                            không ?
                        </p>
                    </Modal>
                </div>

                <div className="parking-lot-list-container__content__sub">
                    <div className="parking-lot-list-container__content__item">
                        <img
                            className="parking-lot-list-container__content__item__image"
                            src={avatarURL}
                        />
                        <div className="parking-lot-list-container__content__item__info">
                            <div>
                                <span className="properties">Tên nhà xe</span>
                                <span>Bãi xe khu A đại học Bách Khoa</span>
                            </div>
                            <div>
                                <span className="properties">Chủ nhà xe</span>
                                <span>Nguyễn Hoàng Phú</span>
                            </div>
                            <div>
                                <span className="properties">Thời gian mở</span>
                                <span>7h - 22h</span>
                            </div>
                            <div>
                                <span className="properties">Tình trạng</span>
                                <span>Đang mở</span>
                            </div>
                            <div>
                                <span className="properties">Sức chứa</span>
                                <span>1000</span>
                            </div>
                            <div>
                                <span className="properties">Xác thực</span>
                                <span>Đã xác thực</span>
                            </div>
                            <div>
                                <span className="properties">Mô tả</span>
                                <span>
                                    xe có đầy đủ 2 kính , bánh xe có vành màu
                                    cam , ống bô độ vip.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="parking-lot-list-container__content__icon">
                        <Link to="/parking-lots/edit">
                            <span className="edit-vehicle">
                                <EditOutlined />
                            </span>
                        </Link>
                        <span className="delete-parking-lot">
                            <CloseOutlined onClick={showModal} />
                        </span>
                    </div>
                    <Modal
                        className="delete-parking-lot-modal"
                        title="Hủy đăng ký bãi đỗ xe"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p>
                            Bạn có chắn chắn muốn hủy đăng ký bãi đỗ xe hay
                            không ?
                        </p>
                    </Modal>
                </div>
            </div>
        </div>
    ) : (
        //--------------------------------Admin----------------------------------
        <div className="parking-lot-list-content">Admin</div>
    )
}

export default ParkingLots
