import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Modal } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import useAuth from 'hooks/useAuth'
import { roles } from 'contexts/UserContext'
import './package-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columnsUser = [
    {
        title: 'Tên gói ưu đãi',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'parking_lot_name',
        width: '20%',
    },
    {
        title: 'Loại gói ưu đãi',
        dataIndex: 'package_type',
        width: '12%',
    },
    {
        title: 'Phương tiện',
        dataIndex: 'vehicle_type',
        width: '12%',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'date_start',
        width: '12%',
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'date_end',
        width: '12%',
    },
    {
        title: 'Giá (VND)',
        dataIndex: 'price',
        width: '10%',
    },
]

const columnsAll = [
    {
        title: 'Tên gói ưu đãi',
        dataIndex: 'name',
        width: '25%',
    },
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'parking_lot_name',
        width: '30%',
    },
    {
        title: 'Loại gói ưu đãi',
        dataIndex: 'package_type',
        width: '15%',
    },
    {
        title: 'Phương tiện',
        dataIndex: 'vehicle_type',
        width: '15%',
    },
    {
        title: 'Giá (VND)',
        dataIndex: 'price',
        width: '15%',
    },
]

const packageTypeItem = ['All', 'Gói tuần', 'Gói tháng', 'Gói quý']

const vehicleTypeItem = ['All', 'Xe đạp', 'Xe máy', 'Xe ô tô']

function Packages() {
    const { user } = useAuth()
    const dateNow = new Date()
    const [page, setPage] = useState(10)
    const [swapPage, setSwapPage] = useState(false)
    const [packageType, setPackageType] = useState('All')
    const [vehicleType, setVehicleType] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [packageItem, setPackageItem] = useState({
        name: '',
        parking_lot_name: '',
        package_type: '',
        vehicle_type: '',
        price: '',
    })

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onClickPackageItem = (record) => {
        setIsModalVisible(true)
        setPackageItem(record)
    }

    const state = {
        pagination: {
            pageSize: page,
        },
    }

    const onSearch = (value) => console.log(value)

    useEffect(() => {}, [activeFilter])

    useEffect(() => {
        if (packageType === 'All' && vehicleType === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [packageType, vehicleType])

    const dataAll = []
    for (let i = 0; i < page; i++) {
        dataAll.push({
            key: i,
            name: 'Ưu đãi 1000 năm có một',
            parking_lot_name: 'Bãi đỗ xe Bách Khoa',
            package_type: 'Gói quý',
            vehicle_type: 'Xe máy',
            price: 120000,
        })
    }

    const dataUser = []
    for (let i = 0; i < page / 2; i++) {
        dataUser.push({
            key: i,
            name: 'Ưu đãi 1000 năm có một',
            parking_lot_name: 'Bãi đỗ xe Bách Khoa',
            package_type: 'Gói quý',
            vehicle_type: 'Xe máy',
            date_start: new Date('4-1-2022').toLocaleDateString('en-GB'),
            date_end: new Date('5-1-2022').toLocaleDateString('en-GB'),
            price: 120000,
        })
        dataUser.push({
            key: i,
            name: 'Ưu đãi 1000 năm có một',
            parking_lot_name: 'Bãi đỗ xe Bách Khoa',
            package_type: 'Gói quý',
            vehicle_type: 'Xe máy',
            date_start: new Date('5-1-2022').toLocaleDateString('en-GB'),
            date_end: new Date('6-1-2022').toLocaleDateString('en-GB'),
            price: 120000,
        })
    }

    const menu = () => {
        return (
            <Menu class="package-list-menu">
                <div className="package-list-menu__item">
                    <div className="package-list-menu__item__row">
                        <span className="package-list-menu__item__row__span">
                            Loại gói
                        </span>
                        <select
                            className="package-list-menu__item__row__select"
                            onChange={(e) => setPackageType(e.target.value)}
                        >
                            {packageTypeItem.map((packageTypeItem, index) => {
                                return (
                                    <option key={index} value={packageTypeItem}>
                                        {packageTypeItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="package-list-menu__item__row">
                        <span className="package-list-menu__item__row__span">
                            Phương tiện
                        </span>
                        <select
                            className="package-list-menu__item__row__select"
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            {vehicleTypeItem.map((vehicleTypeItem, index) => {
                                return (
                                    <option key={index} value={vehicleTypeItem}>
                                        {vehicleTypeItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </Menu>
        )
    }

    return (
        <div>
            {/* ------------------------------------------ TAB TẤT CẢ ------------------------------------------ */}
            <div
                className={
                    swapPage
                        ? 'package-list-content-unactive'
                        : 'package-list-content'
                }
            >
                <div className="title">Tất cả gói ưu đãi</div>
                <div className="package-list-content__swap-page">
                    <button className="button-active">Tất cả</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(true)}
                    >
                        Của tôi
                    </button>
                </div>

                <div className="package-list-content__action__state-one">
                    <div className="package-list-content__action__select">
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
                                    ? 'package-list-content__action__filter-active'
                                    : 'package-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="package-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="package-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="package-list-content__sub">
                    <Table
                        className="package-list-content__sub__table"
                        columns={columnsAll}
                        dataSource={dataAll}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            user.role === roles.BASIC_USER
                                ? 'package-list-content__sub__table__row-action'
                                : 'package-list-content__sub__table__row-noaction'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    onClickPackageItem(record)
                                },
                            }
                        }}
                    />
                    <Modal
                        className="package-list-modal"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <h1 className="h1">Thông tin gói ưu đãi</h1>
                        <div className="div">
                            <span className="span1">Tên gói ưu đãi</span>
                            <span className="span2">{packageItem.name}</span>
                        </div>
                        <div className="div">
                            <span className="span1">tên bãi đỗ xe</span>
                            <span className="span2">
                                {packageItem.parking_lot_name}
                            </span>
                        </div>
                        <div className="div">
                            <span className="span1">Loại gói ưu đãi</span>
                            <span className="span2">
                                {packageItem.package_type}
                            </span>
                        </div>
                        <div className="div">
                            <span className="span1">Phương tiện</span>
                            <span className="span2">
                                {packageItem.vehicle_type}
                            </span>
                        </div>
                        <div className="div">
                            <span className="span1">Giá</span>
                            <span className="span2">
                                {packageItem.price} VND
                            </span>
                        </div>
                        <div className="button">
                            <button className="button__cancel">Hủy</button>
                            <button className="button__ok">Đăng ký</button>
                        </div>
                    </Modal>
                </div>
            </div>

            {/* -------------------------------- TAB CỦA TÔI - PARKING-LOT USER -------------------------------- */}
            <div
                className={
                    swapPage && user.role === roles.PARKING_LOT_USER
                        ? 'package-list-content'
                        : 'package-list-content-unactive'
                }
            >
                <div className="title">Các gói ưu đãi của tôi</div>
                <div className="package-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(false)}
                    >
                        Tất cả
                    </button>
                    <button className="button-active">Của tôi</button>
                </div>

                <div className="package-list-content__action__state-two">
                    <div className="package-list-content__action__select">
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
                                    ? 'package-list-content__action__filter-active'
                                    : 'package-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="package-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="package-list-content__action__search__icon" />
                    </div>
                    <Link
                        className="package-list-content__action__add"
                        to="/feedbacks/add"
                    >
                        <PlusCircleOutlined className="package-list-content__action__add__icon" />
                        <span>Thêm gói ưu đãi</span>
                    </Link>
                </div>

                <div className="package-list-content__sub">
                    <Table
                        className="package-list-content__sub__table"
                        columns={columnsAll}
                        dataSource={dataAll}
                        pagination={state.pagination}
                        rowClassName="package-list-content__sub__table__row-action"
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    onClickPackageItem(record)
                                },
                            }
                        }}
                    />
                    <Modal
                        className="package-list-modal"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <h1 className="h1">Thông tin gói ưu đãi</h1>
                        <div className="div">
                            <span className="span1">Tên gói ưu đãi</span>
                            <span className="span2">{packageItem.name}</span>
                        </div>
                        <div className="div">
                            <span className="span1">tên bãi đỗ xe</span>
                            <span className="span2">
                                {packageItem.parking_lot_name}
                            </span>
                        </div>
                        <div className="div">
                            <span className="span1">Loại gói ưu đãi</span>
                            <span className="span2">
                                {packageItem.package_type}
                            </span>
                        </div>
                        <div className="div">
                            <span className="span1">Phương tiện</span>
                            <span className="span2">
                                {packageItem.vehicle_type}
                            </span>
                        </div>
                        <div className="div">
                            <span className="span1">Giá</span>
                            <span className="span2">
                                {packageItem.price} VND
                            </span>
                        </div>
                        <div className="button">
                            <button className="button__cancel">Hủy</button>
                            <button className="button__ok">Đăng ký</button>
                        </div>
                    </Modal>
                </div>
            </div>

            {/* ----------------------------------- TAB CỦA TÔI - BASIC USER ----------------------------------- */}
            <div
                className={
                    swapPage && user.role === roles.BASIC_USER
                        ? 'package-list-content'
                        : 'package-list-content-unactive'
                }
            >
                <div className="title">Các gói ưu đãi của tôi</div>
                <div className="package-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(false)}
                    >
                        Tất cả
                    </button>
                    <button className="button-active">Của tôi</button>
                </div>
                <div className="package-list-content__action__state-one">
                    <div className="package-list-content__action__select">
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
                                    ? 'package-list-content__action__filter-active'
                                    : 'package-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="package-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="package-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="package-list-content__sub">
                    <Table
                        className="package-list-content__sub__table"
                        columns={columnsUser}
                        dataSource={dataUser}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            moment(record.date_end, 'DD/MM/YYYY').toDate() >
                            dateNow
                                ? 'package-list-content__sub__table__row-green'
                                : 'package-list-content__sub__table__row-gray'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {},
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Packages
