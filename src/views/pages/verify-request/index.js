import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
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
        title: 'Tên chủ sở hữu',
        dataIndex: 'owner_name',
        width: '20%',
    },
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'name',
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
        dataIndex: 'status',
        width: '15%',
    },
]

const verifyVehicleTypeItem = ['All', 'Tên chủ sở hữu', 'Biển số']
const verifyParkingLotTypeItem = [
    'All',
    'Tên chủ sở hữu',
    'Tên bãi đỗ xe',
    'Địa chỉ bãi đỗ xe',
]
const verifyStatusItem = ['All', 'Đã xác thực', 'Chưa xác thực']

function VerifyRequest() {
    const [page, setPage] = useState(10)
    const [swapPage, setSwapPage] = useState(true)
    const [verifyVehicleType, setVerifyVehicleType] = useState('All')
    const [verifyParkingLotType, setVerifyParkingLotType] = useState('All')
    const [verifyStatusType, setVerifyStatusType] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [parkingLot, setkParkingLot] = useState({
        key: 0,
        name: '',
        address: '',
        created_at: '',
        owner_name: '',
        status: '',
    })
    const [vehicle, setVehicle] = useState({
        key: 0,
        user_name: '',
        brand: '',
        license_plate: '',
        created_at: '',
        type_of_vehicle: '',
        status: '',
    })
    const state = {
        pagination: {
            pageSize: page,
        },
    }
    let navigate = useNavigate()
    const handleRow = (record) => ({
        onClick: () => {
            navigate(`vehicle-detail`)
        },
    })
    const onSearch = (value) => console.log(value)

    useEffect(() => {}, [activeFilter])

    useEffect(() => {
        if (
            verifyVehicleType === 'All' &&
            verifyParkingLotType === 'All' &&
            verifyStatusType === 'All'
        )
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [verifyVehicleType, verifyParkingLotType, verifyStatusType])

    const parkingLotData = []
    for (let i = 0; i < page; i++) {
        parkingLotData.push({
            key: i,
            name: 'Bãi đỗ xe Bách Khoa',
            address: '60 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
            created_at: '7.30.23 11/5/2022',
            owner_name: 'Nguyễn Hoàng Phú',
            status: 'Đã xác thực',
        })
    }

    const vehicleData = []
    for (let i = 0; i < page; i++) {
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
    const onClickParkingLotItem = (record) => {
        setkParkingLot(record)
    }
    const onClickVehicleItem = (record) => {
        setVehicle(record)
        handleRow(record)
    }

    const menu = () => {
        if (swapPage) {
            return (
                <Menu class="verify-request-menu">
                    <div className="verify-request-menu__item">
                        <div className="verify-request-menu__item__row">
                            <span className="verify-request-menu__item__row__span">
                                Tìm theo
                            </span>
                            <select
                                className="verify-request-menu__item__row__select"
                                onChange={(e) =>
                                    setVerifyVehicleType(e.target.value)
                                }
                            >
                                {verifyVehicleTypeItem.map(
                                    (verifyVehicleTypeItem, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={verifyVehicleTypeItem}
                                            >
                                                {verifyVehicleTypeItem}
                                            </option>
                                        )
                                    },
                                )}
                            </select>
                        </div>
                        <div className="verify-request-menu__item__row">
                            <span className="verify-request-menu__item__row__span">
                                Trạng thái
                            </span>
                            <select
                                className="verify-request-menu__item__row__select"
                                onChange={(e) =>
                                    setVerifyStatusType(e.target.value)
                                }
                            >
                                {verifyStatusItem.map(
                                    (verifyStatusItem, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={verifyStatusItem}
                                            >
                                                {verifyStatusItem}
                                            </option>
                                        )
                                    },
                                )}
                            </select>
                        </div>
                    </div>
                </Menu>
            )
        } else {
            return (
                <Menu class="verify-request-menu">
                    <div className="verify-request-menu__item">
                        <div className="verify-request-menu__item__row">
                            <span className="verify-request-menu__item__row__span">
                                Tìm theo
                            </span>
                            <select
                                className="verify-request-menu__item__row__select"
                                onChange={(e) =>
                                    setVerifyParkingLotType(e.target.value)
                                }
                            >
                                {verifyParkingLotTypeItem.map(
                                    (verifyParkingLotTypeItem, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={verifyParkingLotTypeItem}
                                            >
                                                {verifyParkingLotTypeItem}
                                            </option>
                                        )
                                    },
                                )}
                            </select>
                        </div>
                        <div className="verify-request-menu__item__row">
                            <span className="verify-request-menu__item__row__span">
                                Trạng thái
                            </span>
                            <select
                                className="verify-request-menu__item__row__select"
                                onChange={(e) =>
                                    setVerifyStatusType(e.target.value)
                                }
                            >
                                {verifyStatusItem.map(
                                    (verifyStatusItem, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={verifyStatusItem}
                                            >
                                                {verifyStatusItem}
                                            </option>
                                        )
                                    },
                                )}
                            </select>
                        </div>
                    </div>
                </Menu>
            )
        }
    }
    return (
        <div>
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
                            setVerifyVehicleType('All')
                            setVerifyStatusType('All')
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
                        // onRow={(record, rowIndex) => {
                        //     return {
                        //         onClick: () => onClickVehicleItem(record),
                        //     }
                        // }}
                        onRow={handleRow}
                        rowClassName={(record, index) =>
                            record.status === 'Đã xác thực'
                                ? 'verify-request-content__sub__table__row-green'
                                : 'verify-request-content__sub__table__row-red'
                        }
                    />
                </div>
            </div>

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
                            setVerifyParkingLotType('All')
                            setVerifyStatusType('All')
                        }}
                    >
                        Xe
                    </button>
                </div>

                <div className="verify-request-content__action">
                    <div className="verify-request-content__action__select">
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
                        dataSource={parkingLotData}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => onClickParkingLotItem(record),
                            }
                        }}
                        rowClassName={(record, index) =>
                            record.status === 'Đã xác thực'
                                ? 'verify-request-content__sub__row-green'
                                : 'verify-request-content__sub__row-red'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default VerifyRequest
