import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown } from 'antd'
import {
    SearchOutlined,
    FilterOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import parkingLotApi from 'api/parkingLotApi'
import vehicleApi from 'api/vehicleApi'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import * as verifyStates from 'shared/constants/verifyState'
import './verify-request.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columVehicle = [
    {
        title: 'Tên chủ sở hữu',
        dataIndex: 'user_name',
        width: '20%',
    },
    {
        title: 'Hãng xe',
        dataIndex: 'brand',
        width: '20%',
    },
    {
        title: 'Biển số',
        dataIndex: 'license_plate',
        width: '15%',
    },
    {
        title: 'Loại xe ',
        dataIndex: 'type_of_vehicle',
        width: '10%',
    },
    {
        title: 'Đăng kí lúc ',
        dataIndex: 'created_at',
        width: '20%',
    },
    {
        title: 'Trạng thái ',
        dataIndex: 'verify_state',
        width: '15%',
    },
]

const columParkingLot = [
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Tên chủ sở hữu',
        dataIndex: 'owner_name',
        width: '20%',
    },
    {
        title: 'Địa chỉ bãi đỗ xe',
        dataIndex: 'address',
        width: '30%',
    },
    {
        title: 'Đăng kí lúc',
        dataIndex: 'created_at',
        width: '15%',
    },
    {
        title: 'Trạng thái ',
        dataIndex: 'verify_state',
        width: '15%',
    },
]

function VerifyRequest() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [swapPage, setSwapPage] = useState(false)
    const [activeFilter, setActiveFilter] = useState(false)
    const [verifyStateFilter, setVerifyStateFilter] = useState('All')
    const [parkingLotList, setParkingLotList] = useState()
    const [vehicleList, setVehicleList] = useState()

    const onSearch = (value) => console.log(value)

    useEffect(() => {
        if (verifyStateFilter === 'All') setActiveFilter(false)
        else setActiveFilter(true)
    }, [verifyStateFilter])

    const parkingLotState = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                parkingLotApi.getListByParams(params).then((response) => {
                    setTotal(response.data.count)
                    setParkingLotList(
                        response.data.rows.map((parkingLot) => ({
                            id: parkingLot.id,
                            name: parkingLot.name,
                            owner_name: parkingLot.Owner.name,
                            address: parkingLot.address,
                            created_at: parkingLot.createdAt,
                            verify_state: parkingLot.VerifyState.state,
                        })),
                    )
                })
            },
        },
    }

    const vehicleState = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                vehicleApi.getListByParams(params).then((response) => {
                    setTotal(response.data.count)
                    setVehicleList(
                        response.data.rows.map((vehicle) => ({
                            user_name: vehicle.Owner.name,
                            brand: vehicle.brand,
                            license_plate: vehicle.license_plate,
                            created_at: vehicle.createdAt,
                            type_of_vehicle: vehicle.VehicleType.type_name,
                            verify_state: vehicle.VerifyState.state,
                        })),
                    )
                })
            },
        },
    }

    useEffect(() => {
        const params = {
            limit: pageSize,
            page: 1,
        }
        parkingLotApi.getListByParams(params).then((response) => {
            setTotal(response.data.count)
            setParkingLotList(
                response.data.rows.map((parkingLot) => ({
                    id: parkingLot.id,
                    name: parkingLot.name,
                    owner_name: parkingLot.Owner.name,
                    address: parkingLot.address,
                    created_at: parkingLot.createdAt,
                    verify_state: parkingLot.VerifyState.state,
                })),
            )
        })
    }, [pageSize])

    useEffect(() => {
        const params = {
            limit: pageSize,
            page: 1,
        }
        vehicleApi.getListByParams(params).then((response) => {
            setTotal(response.data.count)
            setVehicleList(
                response.data.rows.map((vehicle) => ({
                    id: vehicle.id,
                    user_name: vehicle.Owner.name,
                    brand: vehicle.brand,
                    license_plate: vehicle.license_plate,
                    created_at: vehicle.createdAt,
                    type_of_vehicle: vehicle.VehicleType.type_name,
                    verify_state: vehicle.VerifyState.state,
                })),
            )
        })
    }, [pageSize])

    const menu = () => {
        return (
            <Menu class="verify-request-menu">
                <div className="verify-request-menu__item">
                    <div className="verify-request-menu__item__row">
                        <span className="verify-request-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="verify-request-menu__item__row__select"
                            onChange={(e) =>
                                setVerifyStateFilter(e.target.value)
                            }
                        >
                            <option key={1} value="All">
                                All
                            </option>
                            <option key={2} value={verifyStates.VERIFIED}>
                                {verifyStates.VERIFIED}
                            </option>
                            <option key={3} value={verifyStates.PENDING}>
                                {verifyStates.PENDING}
                            </option>
                            <option key={4} value={verifyStates.DENIED}>
                                {verifyStates.DENIED}
                            </option>
                        </select>
                    </div>
                </div>
            </Menu>
        )
    }

    return user.role === roles.ADMIN ? (
        <div>
            {/* ----------------------------------- TAB PARKING-LOT  ----------------------------------- */}
            <div
                className={
                    swapPage
                        ? 'verify-request-content'
                        : 'verify-request-content-unactive'
                }
            >
                <div className="verify-request-content__title">
                    Danh sách đăng ký bãi đỗ xe
                </div>
                <div className="verify-request-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => {
                            setSwapPage(false)
                        }}
                    >
                        Xe
                    </button>
                    <button className="button-active">Bãi đỗ xe</button>
                </div>

                <div className="verify-request-content__action">
                    <div className="verify-request-content__action__select">
                        <span>Hiển thị</span>
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
                                    ? 'verify-request-content__action__filter-active'
                                    : 'verify-request-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="verify-request-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="verify-request-content__action__search__icon" />
                    </div>

                    <Link
                        className={'verify-request-content__action__add'}
                        to="/parking-lots/add"
                    >
                        <PlusCircleOutlined className="verify-request-content__action__add__icon" />
                        <span>Thêm</span>
                    </Link>
                </div>

                <div className="verify-request-content__sub">
                    <Table
                        className="verify-request-content__sub__table"
                        columns={columParkingLot}
                        dataSource={parkingLotList}
                        pagination={parkingLotState.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/parking-lots/${record.id}`)
                                },
                            }
                        }}
                        rowClassName={(record, index) =>
                            record.verify_state === verifyStates.VERIFIED
                                ? 'verify-request-content__sub__row-green'
                                : record.verify_state === verifyStates.PENDING
                                ? 'verify-request-content__sub__row-orange'
                                : 'verify-request-content__sub__row-red'
                        }
                    />
                </div>
            </div>

            {/* ------------------------------------- TAB VEHICLE -------------------------------------- */}
            <div
                className={
                    swapPage
                        ? 'verify-request-content-unactive'
                        : 'verify-request-content'
                }
            >
                <div className="verify-request-content__title">
                    Danh sách đăng ký xe
                </div>
                <div className="verify-request-content__swap-page">
                    <button className="button-active">Xe</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => {
                            setSwapPage(true)
                        }}
                    >
                        Bãi đỗ xe
                    </button>
                </div>

                <div className="verify-request-content__action">
                    <div className="verify-request-content__action__select">
                        <span>Hiển thị</span>
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
                                    ? 'verify-request-content__action__filter-active'
                                    : 'verify-request-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="verify-request-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="verify-request-content__action__search__icon" />
                    </div>

                    <Link
                        className={'verify-request-content__action__add'}
                        to="/vehicles/add"
                    >
                        <PlusCircleOutlined className="verify-request-content__action__add__icon" />
                        <span>Thêm</span>
                    </Link>
                </div>

                <div className="verify-request-content__sub">
                    <Table
                        className="verify-request-content__sub__table"
                        columns={columVehicle}
                        dataSource={vehicleList}
                        pagination={vehicleState.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate('/vehicles/' + record.id)
                                },
                            }
                        }}
                        rowClassName={(record, index) =>
                            record.verify_state === verifyStates.VERIFIED
                                ? 'verify-request-content__sub__table__row-green'
                                : record.verify_state === verifyStates.PENDING
                                ? 'verify-request-content__sub__table__row-orange'
                                : 'verify-request-content__sub__table__row-red'
                        }
                    />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/404" />
    )
}

export default VerifyRequest
