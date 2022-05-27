import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown } from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import parkingLotApi from 'api/parkingLotApi'
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
        dataIndex: 'status',
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
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [swapPage, setSwapPage] = useState(false)
    const [activeFilter, setActiveFilter] = useState(false)
    const [verifyStateFilter, setVerifyStateFilter] = useState('All')
    const [parkingLotList, setParkingLotList] = useState()

    const onSearch = (value) => console.log(value)

    const vehicleData = []
    for (let i = 0; i < pageSize; i++) {
        vehicleData.push({
            key: i,
            user_name: 'Nguyễn Phạm Nhật Hào',
            brand: 'Ferrari SF90 Spider',
            license_plate: '29C-99999',
            created_at: '7.30.23 11/5/2022',
            type_of_vehicle: 'Xe máy',
            status: 'Chưa xác thực',
        })
    }

    useEffect(() => {
        if (verifyStateFilter === 'All') setActiveFilter(false)
        else setActiveFilter(true)
    }, [verifyStateFilter])

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
                    setTotal(response.data.count)
                    setParkingLotList(
                        response.data.rows.map((parkingLot) => ({
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

    useEffect(() => {
        const params = {
            limit: pageSize,
            page: 1,
        }
        parkingLotApi.getListByParams(params).then((response) => {
            setTotal(response.data.count)
            setParkingLotList(
                response.data.rows.map((parkingLot) => ({
                    name: parkingLot.name,
                    owner_name: parkingLot.Owner.name,
                    address: parkingLot.address,
                    created_at: parkingLot.createdAt,
                    verify_state: parkingLot.VerifyState.state,
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

    return (
        <div>
            {/* ----------------------------------- TAB PARKING-LOT  ----------------------------------- */}
            <div
                className={
                    swapPage
                        ? 'verify-request-content-unactive'
                        : 'verify-request-content'
                }
            >
                <div className="verify-request-content__title">
                    Danh sách đăng ký bãi đỗ xe
                </div>
                <div className="verify-request-content__swap-page">
                    <button className="button-active">Nhà xe</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => {
                            setSwapPage(true)
                        }}
                    >
                        Xe
                    </button>
                </div>

                <div className="verify-request-content__action">
                    <div className="verify-request-content__action__select">
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
                </div>

                <div className="verify-request-content__sub">
                    <Table
                        className="verify-request-content__sub__table"
                        columns={columParkingLot}
                        dataSource={parkingLotList}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate('/parking-lots/detail')
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
                        ? 'verify-request-content'
                        : 'verify-request-content-unactive'
                }
            >
                <div className="verify-request-content__title">
                    Danh sách đăng ký xe
                </div>
                <div className="verify-request-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => {
                            setSwapPage(false)
                        }}
                    >
                        Nhà xe
                    </button>
                    <button className="button-active">Xe</button>
                </div>

                <div className="verify-request-content__action">
                    <div className="verify-request-content__action__select">
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
                </div>

                <div className="verify-request-content__sub">
                    <Table
                        className="verify-request-content__sub__table"
                        columns={columVehicle}
                        dataSource={vehicleData}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate('/vehicles/detail')
                                },
                            }
                        }}
                        rowClassName={(record, index) =>
                            record.status === 'Đã xác thực'
                                ? 'verify-request-content__sub__table__row-green'
                                : 'verify-request-content__sub__table__row-red'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default VerifyRequest
