import React, { useState, useEffect } from 'react'
import { Link, useNavigate ,useParams} from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Modal, Form } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import packageApi from 'api/packageApi'
import userPackageApi from 'api/userPackageApi'
import './package-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columnsForBacicAndParkinglotRole = [
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

const columnsForAdminAndBasicRole = [
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
    const navigate = useNavigate()
    const { id } = useParams()
    const dateNow = new Date()
    const [swapPage, setSwapPage] = useState(false)
    const [packageType, setPackageType] = useState('All')
    const [vehicleType, setVehicleType] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [showModalAll, setShowModalAll] = useState(false)
    const [showModalParkingLot, setShowModalParkingLot] = useState(false)
    const [allPackageList, setAllPackageList] = useState([{}])
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [packageOfOwnerList, setPackageOfOwnerList] = useState([])
    const [packageOfParkinglotList, setPackageOfParkinglotList] = useState([])

    const [userPackage, setUserPackage] = useState({
        key: 0,
    })

    const [packageItem, setPackageItem] = useState({
        name: '',
        parking_lot_name: '',
        package_type: '',
        vehicle_type: '',
        price: '',
    })

    const stateAllPackage = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                packageApi.getListByParams(params).then((response) => {
                    setTotal(response.data.count)
                    setAllPackageList(
                        response.data.rows.map((packageItem) => ({
                            id: packageItem.id,
                            name: packageItem.name,
                            parking_lot_name: packageItem.ParkingLot.name,
                            package_type: packageItem.PackageType.type_name,
                            vehicle_type: packageItem.VehicleType.type_name,
                            price: packageItem.price,
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
        packageApi
            .getListByParams(params)
            .then((response) => {
                setTotal(response.data.count)
                setAllPackageList(
                    response.data.rows.map((packageItem) => ({
                        id: packageItem.id,
                        name: packageItem.name,
                        parking_lot_name: packageItem.ParkingLot.name,
                        package_type: packageItem.PackageType.type_name,
                        vehicle_type: packageItem.VehicleType.type_name,
                        price: packageItem.price,
                    })),
                )
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }, [pageSize])

    const stateOwner = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                if (!!user) {
                    userPackageApi
                        .getPackageByOwner(user.id, params)
                        .then((response) => {
                            setTotal(response.data.count)
                            setPackageOfOwnerList(
                                response.data.rows.map((packageItem) => ({
                                    id: packageItem.id,
                                    name: packageItem.name,
                                    parking_lot_name:
                                        packageItem.ParkingLot.name,
                                    package_type:
                                        packageItem.PackageType.type_name,
                                    vehicle_type:
                                        packageItem.VehicleType.type_name,
                                    date_start: new Date(
                                        packageItem.createdAt,
                                    ).toLocaleDateString('en-GB'),
                                    date_end: new Date(
                                        packageItem.expireAt,
                                    ).toLocaleDateString('en-GB'),
                                    price: packageItem.price,
                                })),
                            )
                        })
                        .catch((error) => {
                            alert(error.response.data.message)
                        })
                }
            },
        },
    }

    useEffect(() => {
        const params = {
            limit: pageSize,
            page: 1,
        }
        if (!!user) {
            userPackageApi
                .getPackageByOwner(user.id, params)
                .then((response) => {
                    setTotal(response.data.count)
                    setPackageOfOwnerList(
                        response.data.rows.map((packageItem) => ({
                            id: packageItem.id,
                            name: packageItem.name,
                            parking_lot_name: packageItem.ParkingLot.name,
                            package_type: packageItem.PackageType.type_name,
                            vehicle_type: packageItem.VehicleType.type_name,
                            date_start: new Date(
                                packageItem.createdAt,
                            ).toLocaleDateString('en-GB'),
                            date_end: new Date(
                                packageItem.expireAt,
                            ).toLocaleDateString('en-GB'),
                            price: packageItem.price,
                        })),
                    )
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        }
    }, [user, pageSize])

    const stateParkinglot = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                if (!!id) {
                    packageApi
                        .getListByParkinglotId(id, params)
                        .then((response) => {
                            setTotal(response.data.count)
                            setPackageOfParkinglotList(
                                response.data.rows.map((packageItem) => ({
                                    id: packageItem.id,
                                    name: packageItem.name,
                                    parking_lot_name:
                                        packageItem.ParkingLot.name,
                                    package_type:
                                        packageItem.PackageType.type_name,
                                    vehicle_type:
                                        packageItem.VehicleType.type_name,
                                    date_start: new Date(
                                        packageItem.createdAt,
                                    ).toLocaleDateString('en-GB'),
                                    date_end: new Date(
                                        packageItem.expireAt,
                                    ).toLocaleDateString('en-GB'),
                                    price: packageItem.price,
                                })),
                            )
                        })
                        .catch((error) => {
                            alert(error.response.data.message)
                        })
                }
            },
        },
    }

    useEffect(() => {
        const params = {
            limit: pageSize,
            page: 1,
        }
        if (!!id) {
            packageApi
                .getListByParkinglotId(id, params)
                .then((response) => {
                    setTotal(response.data.count)
                    setPackageOfParkinglotList(
                        response.data.rows.map((packageItem) => ({
                            id: packageItem.id,
                            name: packageItem.name,
                            parking_lot_name: packageItem.ParkingLot.name,
                            package_type: packageItem.PackageType.type_name,
                            vehicle_type: packageItem.VehicleType.type_name,
                            date_start: new Date(
                                packageItem.createdAt,
                            ).toLocaleDateString('en-GB'),
                            date_end: new Date(
                                packageItem.expireAt,
                            ).toLocaleDateString('en-GB'),
                            price: packageItem.price,
                        })),
                    )
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        }
    }, [pageSize,id])

    const handleCancel = () => {
        setShowModalAll(false)
        setShowModalParkingLot(false)
    }

    const onSearch = (value) => console.log(value)

    useEffect(() => {}, [activeFilter])

    useEffect(() => {
        if (packageType === 'All' && vehicleType === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [packageType, vehicleType])

    const handleSubmitAddUserPackage = async (values) => {
        try {
            const newUserPackage = {
                package_id: userPackage.id,
            }
            const response = await userPackageApi.createNew(newUserPackage)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleNavigation = (parkingLotId) => {
        navigate(`/packages/add/${parkingLotId}`)
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

    return user.role === roles.ADMIN ? (
        // --------------------------------------------------- ADMIN --------------------------------------------------
        <div className="package-list-content">
            <div className="title">Danh sách gói ưu đãi</div>
            <div className="package-list-content__action__state-one">
                <div className="package-list-content__action__select">
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
                    columns={columnsForAdminAndBasicRole}
                    dataSource={allPackageList}
                    pagination={stateAllPackage.pagination}
                    rowClassName="package-list-content__sub__table__row-action"
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setShowModalParkingLot(true)
                                setPackageItem(record)
                            },
                        }
                    }}
                />
                <Modal
                    className="package-list-modal"
                    visible={showModalParkingLot}
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
                        <span className="span2">{packageItem.price} VND</span>
                    </div>
                    <div className="div">
                        <span className="span1">Đang sử dụng</span>
                        <span className="span2">1000 Người</span>
                    </div>
                    <div className="button">
                        <button
                            className="button__cancel"
                            onClick={(e) => setShowModalParkingLot(false)}
                        >
                            Thoát
                        </button>
                        <Link to="/packages/edit">
                            <button className="button__ok"> Chỉnh sửa</button>
                        </Link>
                    </div>
                </Modal>
            </div>
        </div>
    ) : user.role === roles.BASIC_USER ? (
        // -------------------------------------- BASIC USER ---------------------------------------
        <div>
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
                        columns={columnsForAdminAndBasicRole}
                        dataSource={allPackageList}
                        pagination={stateAllPackage.pagination}
                        rowClassName={(record, index) =>
                            user.role === roles.BASIC_USER
                                ? 'package-list-content__sub__table__row-action'
                                : 'package-list-content__sub__table__row-noaction'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    // console.log(record.id)
                                    setPackageItem(record)
                                    setUserPackage(record)
                                    user.role === roles.BASIC_USER
                                        ? setShowModalAll(true)
                                        : handleCancel()
                                },
                            }
                        }}
                    />
                    <Modal
                        className="package-list-modal"
                        visible={showModalAll}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <h1 className="h1">Thông tin gói ưu đãi</h1>
                        <Form onFinish={handleSubmitAddUserPackage}>
                            <div className="div">
                                <span className="span1">Tên gói ưu đãi</span>
                                <Form.Item
                                    name="name"
                                    className="span2"
                                    initialValue={packageItem.name}
                                >
                                    <Input.TextArea
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Tên bãi đỗ xe</span>
                                <Form.Item
                                    name="parking_lot_name"
                                    className="span2"
                                    initialValue={packageItem.parking_lot_name}
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Loại gói ưu đãi</span>
                                <Form.Item
                                    name="package_type"
                                    className="span2"
                                    initialValue={packageItem.package_type}
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Phương tiện</span>
                                <Form.Item
                                    name="vehicle_type"
                                    className="span2"
                                    initialValue={packageItem.vehicle_type}
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className="div">
                                <span className="span1">Giá</span>
                                <Form.Item
                                    name="price"
                                    className="span2"
                                    initialValue={packageItem.price}
                                    VND
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    ></Input>
                                </Form.Item>
                            </div>
                            <div className="button">
                                <button
                                    className="button__cancel"
                                    onClick={(e) => setShowModalAll(false)}
                                >
                                    Thoát
                                </button>
                                <button
                                    className="button__ok"
                                    htmlType="submit"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </Form>
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
                        columns={columnsForBacicAndParkinglotRole}
                        dataSource={packageOfOwnerList}
                        pagination={stateOwner.pagination}
                        rowClassName={(record, index) =>
                            moment(record.date_end, 'DD/MM/YYYY').toDate() >
                            dateNow
                                ? 'package-list-content__sub__table__row-green'
                                : 'package-list-content__sub__table__row-red'
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
    ) : (
        // ----------------------------------ParkingLot---------------------------------
        <div className={'package-list-content'}>
            <div className="title">Các gói ưu đãi của tôi</div>

            <div className="package-list-content__action__state-two">
                <div className="package-list-content__action__select">
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
                <button
                    className="package-list-content__action__add"
                    onClick={() => handleNavigation(id)}
                >
                    <PlusCircleOutlined className="package-list-content__action__add__icon" />
                    <span>Thêm gói ưu đãi</span>
                </button>
            </div>

            <div className="package-list-content__sub">
                <Table
                    className="package-list-content__sub__table"
                    columns={columnsForBacicAndParkinglotRole}
                    dataSource={packageOfParkinglotList}
                    pagination={stateParkinglot.pagination}
                    rowClassName="package-list-content__sub__table__row-action"
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setShowModalParkingLot(true)
                                setPackageItem(record)
                            },
                        }
                    }}
                />
            </div>
            <Modal
                className="package-list-modal"
                visible={showModalParkingLot}
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
                    <span className="span2">{packageItem.package_type}</span>
                </div>
                <div className="div">
                    <span className="span1">Phương tiện</span>
                    <span className="span2">{packageItem.vehicle_type}</span>
                </div>
                <div className="div">
                    <span className="span1">Giá</span>
                    <span className="span2">{packageItem.price} VND</span>
                </div>
                <div className="div">
                    <span className="span1">Đang sử dụng</span>
                    <span className="span2">1000 Người</span>
                </div>
                <div className="button">
                    <button
                        className="button__cancel"
                        onClick={(e) => setShowModalParkingLot(false)}
                    >
                        Thoát
                    </button>
                    <Link to="/packages/edit">
                        <button className="button__ok"> Chỉnh sửa</button>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}

export default Packages
