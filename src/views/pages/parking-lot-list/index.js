import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Input, Modal, Menu, Dropdown } from 'antd'
import {
    PlusCircleOutlined,
    EditOutlined,
    CloseOutlined,
    SearchOutlined,
    FilterOutlined,
} from '@ant-design/icons'
import NotFound from 'views/pages/404-not-found'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import * as verifyStates from 'shared/constants/verifyState'
import * as openStates from 'shared/constants/openState'
import parkingLotApi from 'api/parkingLotApi'

import './parking-lot-list.scss'

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
        title: 'Trạng thái',
        dataIndex: 'is_open',
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
    const [activeFilter, setActiveFilter] = useState(false)
    const [openStateFilter, setOpenStateFilter] = useState('All')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [parkingLotId, setParkingLotId] = useState()
    const [parkingLotList, setParkingLotList] = useState([])

    const onSearch = (value) => console.log(value)

    const showModal = (parkingLotId) => {
        setIsModalVisible(true)
        setParkingLotId(parkingLotId)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = async () => {
        try {
            const response = await parkingLotApi.softDeleteById(parkingLotId)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        if (openStateFilter === 'All') setActiveFilter(false)
        else setActiveFilter(true)
    }, [openStateFilter])

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
                            id: parkingLot.id,
                            name: parkingLot.name,
                            owner_name: parkingLot.Owner.name,
                            time_slot: parkingLot.time_slot,
                            is_open: parkingLot.is_open
                                ? openStates.OPENING
                                : openStates.CLOSED,
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
                              id: parkingLot.id,
                              name: parkingLot.name,
                              owner_name: parkingLot.Owner.name,
                              time_slot: parkingLot.time_slot,
                              is_open: parkingLot.is_open
                                  ? openStates.OPENING
                                  : openStates.CLOSED,
                              address: parkingLot.address,
                          })),
                      )
                  })
        }
    }, [user, pageSize])

    const handleNavigation = (parkingLotId) => {
        navigate(`/parking-lots/${parkingLotId}/packages`)
    }

    const menu = () => {
        return (
            <Menu class="parking-lot-menu">
                <div className="parking-lot-menu__item">
                    <div className="parking-lot-menu__item__row">
                        <span className="parking-lot-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="parking-lot-menu__item__row__select"
                            onChange={(e) => setOpenStateFilter(e.target.value)}
                        >
                            <option key={1} value="All">
                                All
                            </option>
                            <option key={2} value={openStates.OPENING}>
                                {openStates.OPENING}
                            </option>
                            <option key={3} value={openStates.CLOSED}>
                                {openStates.CLOSED}
                            </option>
                        </select>
                    </div>
                </div>
            </Menu>
        )
    }

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
                <Dropdown overlay={menu} trigger="click" placement="bottom">
                    <div
                        className={
                            activeFilter
                                ? 'parking-lot-list-content__action__filter-active'
                                : 'parking-lot-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

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
                        record.status === openStates.OPENING
                            ? 'parking-lot-list-content__sub__table__row-green'
                            : 'parking-lot-list-content__sub__table__row-red'
                    }
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () =>
                                navigate(`/parking-lots/${record.id}`),
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
                                    <span className="span1">Sức chứa</span>
                                    <span className="span2">
                                        {parkingLot.capacity}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Tình trạng</span>
                                    <span
                                        className={
                                            parkingLot.is_open
                                                ? 'span2-green'
                                                : 'span2-red'
                                        }
                                    >
                                        {parkingLot.is_open
                                            ? openStates.OPENING
                                            : openStates.CLOSED}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Xác thực</span>
                                    <span
                                        className={
                                            parkingLot.VerifyState.state ===
                                            verifyStates.VERIFIED
                                                ? 'span2-green'
                                                : parkingLot.VerifyState
                                                      .state ===
                                                  verifyStates.PENDING
                                                ? 'span2-orange'
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
                                <div
                                    className={
                                        parkingLot.VerifyState.state ===
                                        verifyStates.VERIFIED
                                            ? 'div-active'
                                            : 'div-unactive'
                                    }
                                >
                                    <span className="span1">Gói ưu đãi</span>
                                    <span className="span2">
                                        <button
                                            onClick={() =>
                                                handleNavigation(parkingLot.id)
                                            }
                                        >
                                            Xem gói ưu đãi
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="parking-lot-list-container__content__icon">
                            <Link to={`/parking-lots/${parkingLot.id}/edit`}>
                                <span className="edit-parking-lot">
                                    <EditOutlined />
                                </span>
                            </Link>
                            <span className="delete-parking-lot">
                                <CloseOutlined
                                    onClick={(e) => showModal(parkingLot.id)}
                                />
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
