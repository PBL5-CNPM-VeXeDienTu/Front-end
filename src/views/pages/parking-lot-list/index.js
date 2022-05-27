import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Input, Modal } from 'antd'
import {
    PlusCircleOutlined,
    EditOutlined,
    CloseOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import NotFound from 'views/pages/404-not-found'
import useAuth from 'hooks/useAuth'
import { roles } from 'contexts/UserContext'
import parkingLotApi from 'api/parkingLotApi'

import './parking-lot-list.scss'

const VERIFIED_STATE = 'Đã được kiểm duyệt'
const VERIFYING_STATE = 'Đang chờ xử lý'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Chủ sở hữu',
        dataIndex: 'owner_name',
        width: '20%',
    },
    {
        title: 'Thời gian mở',
        dataIndex: 'time_slot',
        width: '13%',
    },
    {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        width: '10%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
]

function ParkingLots() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [filterState, setFilterState] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [parkingLotList, setParkingLotList] = useState([])

    const onSearch = (value) => console.log(value)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const state = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                parkingLotApi.getListByParams(params).then((response) => {
                    setParkingLotList(
                        response.data.rows.map((parkingLot) => ({
                            name: parkingLot.name,
                            owner_name: parkingLot.Owner.name,
                            time_slot: parkingLot.time_slot,
                            capacity: parkingLot.capacity,
                            address: parkingLot.address,
                        })),
                    )
                })
            },
        },
    }

    useEffect(() => {
        if (!!user) {
            const params = {
                limit: pageSize,
                page: 1,
            }
            user.role === roles.PARKING_LOT_USER
                ? parkingLotApi.getListByUserId(user.id).then((response) => {
                      setParkingLotList(response.data.rows)
                  })
                : parkingLotApi.getListByParams(params).then((response) => {
                      setTotal(response.data.count)
                      setParkingLotList(
                          response.data.rows.map((parkingLot) => ({
                              name: parkingLot.name,
                              owner_name: parkingLot.Owner.name,
                              time_slot: parkingLot.time_slot,
                              capacity: parkingLot.capacity,
                              address: parkingLot.address,
                          })),
                      )
                  })
        }
    }, [user])

    return user.role === roles.BASIC_USER ? (
        //-------------------------------- Basic User --------------------------------------
        <div className="parking-lot-list-content">
            <div className="title">Danh sách bãi đỗ xe</div>
            <div className="parking-lot-list-content__action">
                <div className="parking-lot-list-content__action__select">
                    <span>Hiển thị </span>
                    <select
                        defaultValue={{ value: pageSize }}
                        onChange={(e) => setPageSize(e.target.value)}
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
                    dataSource={parkingLotList}
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
    ) : //-------------------------------- Parking-lot User ----------------------------------
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
                {parkingLotList?.map((parkingLot) => (
                    <div className="parking-lot-list-container__content__sub">
                        <div className="parking-lot-list-container__content__item">
                            <img
                                className="parking-lot-list-container__content__item__image"
                                src={
                                    process.env.REACT_APP_API_URL +
                                    parkingLot.avatar
                                }
                                alt=""
                            />
                            <div className="parking-lot-list-container__content__item__info">
                                <div>
                                    <span className="span1">Tên nhà xe</span>
                                    <span className="span2">
                                        {parkingLot.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Thời gian mở</span>
                                    <span className="span2">
                                        {parkingLot.time_slot}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Tình trạng</span>
                                    <span className="span2">
                                        {parkingLot.is_open
                                            ? 'Đang mở'
                                            : 'Đang đóng'}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Sức chứa</span>
                                    <span className="span2">
                                        {parkingLot.capacity}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Xác thực</span>
                                    <span
                                        className={
                                            parkingLot.VerifyState.state ===
                                            VERIFIED_STATE
                                                ? 'span2-green'
                                                : parkingLot.VerifyState
                                                      .state === VERIFYING_STATE
                                                ? 'span2-yellow'
                                                : 'span2-red'
                                        }
                                    >
                                        {parkingLot.VerifyState.state}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Địa chỉ</span>
                                    <span className="span2">
                                        {parkingLot.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="parking-lot-list-container__content__icon">
                            <Link to="/parking-lots/edit">
                                <span className="edit-parking-lot">
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
                ))}
            </div>
        </div>
    ) : (
        //------------------------------------ Admin --------------------------------------
        <NotFound />
    )
}

export default ParkingLots
