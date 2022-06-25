import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Modal, Form, DatePicker } from 'antd'
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
import packageTypeApi from 'api/packageTypeApi'
import vehicleTypeApi from 'api/vehicleTypeApi'
import './package-list.scss'

const TAB_ALL = 'Tất cả'
const TAB_OWNER = 'Của tôi'
const { Search } = Input
const numOfItem = [10, 15, 25]
const columnUserPackage = [
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

const columnPackage = [
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

function Packages() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const dateNow = new Date()
    const [showModalAll, setShowModalAll] = useState(false)
    const [showModalParkingLot, setShowModalParkingLot] = useState(false)
    const [total, setTotal] = useState(0)
    const [packageList, setPackageList] = useState([])
    const [packageTypeList, setPackageTypeList] = useState([])
    const [vehicleTypeList, setVehicleTypeList] = useState([])
    const [userPackageList, setUserPackageList] = useState([])
    const [userPackage, setUserPackage] = useState({})
    const [packageItem, setPackageItem] = useState({})
    const defaultParams = {
        limit: 10,
        page: 1,
        tab_state: TAB_ALL,
        txt_search: null,
        type_id: null,
        is_expired: null,
        vehicle_type_id: null,
        created_from_date: null,
        created_to_date: null,
        expired_from_date: null,
        expired_to_date: null,
    }
    const [params, setParams] = useState(defaultParams)

    const state = {
        pagination: {
            pageSize: params.limit,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    ...params,
                    limit: pageSize,
                    page: page,
                })
            },
        },
    }
    useEffect(() => {
        if (params.tab_state === TAB_OWNER) {
            userPackageApi
                .getUserPackageByOwner(user.id, params)
                .then((response) => {
                    setTotal(response.data.count)
                    setUserPackageList(
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
        } else {
            if (!id) {
                if (user.role === roles.PARKING_LOT_USER) {
                    packageApi
                        .getListByOwnerId(user.id, params)
                        .then((response) => {
                            setTotal(response.data.count)
                            setPackageList(
                                response.data.rows.map((packageItem) => ({
                                    key: packageItem.id,
                                    id: packageItem.id,
                                    name: packageItem.name,
                                    parking_lot_name:
                                        packageItem.ParkingLot.name,
                                    package_type:
                                        packageItem.PackageType.type_name,
                                    vehicle_type:
                                        packageItem.VehicleType.type_name,
                                    price: packageItem.price,
                                })),
                            )
                        })
                } else {
                    packageApi.getListByParams(params).then((response) => {
                        setTotal(response.data.count)
                        setPackageList(
                            response.data.rows.map((packageItem) => ({
                                key: packageItem.id,
                                id: packageItem.id,
                                name: packageItem.name,
                                parking_lot_name: packageItem.ParkingLot.name,
                                package_type: packageItem.PackageType.type_name,
                                vehicle_type: packageItem.VehicleType.type_name,
                                price: packageItem.price,
                            })),
                        )
                    })
                }
            } else {
                packageApi
                    .getListByParkinglotId(id, params)
                    .then((response) => {
                        setTotal(response.data.count)
                        setPackageList(
                            response.data.rows.map((packageItem) => ({
                                key: packageItem.id,
                                id: packageItem.id,
                                name: packageItem.name,
                                parking_lot_name: packageItem.ParkingLot.name,
                                package_type: packageItem.PackageType.type_name,
                                vehicle_type: packageItem.VehicleType.type_name,
                                price: packageItem.price,
                            })),
                        )
                    })
            }
        }

        packageTypeApi.getAll().then((response) => {
            setPackageTypeList(
                response.data.rows.map((packageType) => ({
                    key: packageType.id,
                    id: packageType.id,
                    type_name: packageType.type_name,
                })),
            )
        })
        vehicleTypeApi.getAll().then((response) => {
            setVehicleTypeList(
                response.data.rows.map((vehicleType) => ({
                    key: vehicleType.id,
                    id: vehicleType.id,
                    type_name: vehicleType.type_name,
                })),
            )
        })
    }, [id, user, params])

    const handleCancel = () => {
        setShowModalAll(false)
        setShowModalParkingLot(false)
    }

    const handleSubmitAddUserPackage = async (values) => {
        try {
            const newUserPackage = {
                package_id: userPackage.id,
            }
            const response = await userPackageApi.createNew(newUserPackage)
            alert(response.data.message)
            setShowModalAll(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleNavigation = () => {
        navigate(`/packages/add`)
    }
    const menu = () => {
        return (
            <Menu class="package-list-menu">
                <div className="package-list-menu__item">
                    <span className="package-list-menu__item__span">
                        Loại gói
                    </span>
                    <select
                        className="package-list-menu__item__select"
                        onChange={(e) => {
                            setParams({
                                ...params,
                                type_id:
                                    e.target.value === 'All'
                                        ? null
                                        : e.target.value,
                            })
                        }}
                    >
                        <option key={1} value="All">
                            All
                        </option>
                        {packageTypeList.map((packageType, index) => {
                            return (
                                <option key={index + 1} value={packageType.id}>
                                    {packageType.type_name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="package-list-menu__item">
                    <span className="package-list-menu__item__span">
                        Phương tiện
                    </span>
                    <select
                        className="package-list-menu__item__select"
                        onChange={(e) => {
                            setParams({
                                ...params,
                                vehicle_type_id:
                                    e.target.value === 'All'
                                        ? null
                                        : e.target.value,
                            })
                        }}
                    >
                        <option key={1} value="All">
                            All
                        </option>
                        {vehicleTypeList.map((vehicleType, index) => {
                            return (
                                <option key={index + 1} value={vehicleType.id}>
                                    {vehicleType.type_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                {params.tab_state === TAB_OWNER ? (
                    <>
                        <div className="package-list-menu__item">
                            <span className="package-list-menu__item__span">
                                Tình trạng
                            </span>
                            <select
                                className="package-list-menu__item__select"
                                onChange={(e) => {
                                    setParams({
                                        ...params,
                                        is_expired:
                                            e.target.value === 'All'
                                                ? null
                                                : e.target.value,
                                    })
                                }}
                            >
                                <option key={0} value="All">
                                    All
                                </option>
                                <option key={1} value={0}>
                                    Chưa hết hạn
                                </option>
                                <option key={2} value={1}>
                                    Đã hết hạn
                                </option>
                            </select>
                        </div>
                        <div className="border-bottom">
                            Ngày bắt đầu gói ưu đãi
                        </div>
                        <div className="package-list-menu__item">
                            <span className="package-list-menu__item__span padding-left">
                                Từ ngày :
                            </span>
                            <DatePicker
                                className="input"
                                size="medium"
                                onChange={(date, dateString) =>
                                    setParams({
                                        ...params,
                                        created_from_date: dateString,
                                    })
                                }
                            />
                        </div>
                        <div className="package-list-menu__item">
                            <span className="package-list-menu__item__span padding-left">
                                Đến ngày :
                            </span>
                            <DatePicker
                                className="input"
                                size="medium"
                                onChange={(date, dateString) =>
                                    setParams({
                                        ...params,
                                        created_to_date: dateString,
                                    })
                                }
                            />
                        </div>
                        <div className="border-bottom">
                            Ngày kết thúc gói ưu đãi
                        </div>
                        <div className="package-list-menu__item">
                            <span className="package-list-menu__item__span padding-left">
                                Từ ngày :
                            </span>
                            <DatePicker
                                className="input"
                                size="medium"
                                onChange={(date, dateString) =>
                                    setParams({
                                        ...params,
                                        expired_from_date: dateString,
                                    })
                                }
                            />
                        </div>
                        <div className="package-list-menu__item">
                            <span className="package-list-menu__item__span padding-left">
                                Đến ngày :
                            </span>
                            <DatePicker
                                className="input"
                                size="medium"
                                onChange={(date, dateString) =>
                                    setParams({
                                        ...params,
                                        expired_to_date: dateString,
                                    })
                                }
                            />
                        </div>
                    </>
                ) : (
                    <></>
                )}
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
                        defaultValue={{ value: params.limit }}
                        onChange={(e) =>
                            setParams({ ...params, limit: e.target.value })
                        }
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
                            params.type_id !== null ||
                            params.vehicle_type_id !== null
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
                        placeholder="Tên gói ưu đãi, Tên bãi đỗ xe"
                        onChange={(e) =>
                            setParams({ ...params, txt_search: e.target.value })
                        }
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="package-list-content__action__search__icon" />
                </div>
            </div>

            <div className="package-list-content__sub">
                <Table
                    className="package-list-content__sub__table"
                    columns={columnPackage}
                    dataSource={packageList}
                    pagination={state.pagination}
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
                            className="button-gray"
                            onClick={(e) => setShowModalParkingLot(false)}
                        >
                            Thoát
                        </button>
                        <Link to={`/packages/${packageItem.id}/edit`}>
                            <button className="button-green"> Chỉnh sửa</button>
                        </Link>
                    </div>
                </Modal>
            </div>
        </div>
    ) : user.role === roles.PARKING_USER ? (
        // -------------------------------------- PARKING USER ---------------------------------------
        <div>
            {/* ----------------------------------- TAB TẤT CẢ - PARKING USER ----------------------------------- */}
            <div
                className={
                    params.tab_state === TAB_ALL
                        ? 'package-list-content'
                        : 'package-list-content-unactive'
                }
            >
                <div className="title">Tất cả gói ưu đãi</div>
                <div className="package-list-content__swap-page">
                    <button className="button-active">Tất cả</button>
                    <button
                        className="button-unactive"
                        onClick={(e) =>
                            setParams({
                                ...defaultParams,
                                tab_state: TAB_OWNER,
                            })
                        }
                    >
                        Của tôi
                    </button>
                </div>

                <div className="package-list-content__action__state-one">
                    <div className="package-list-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.limit }}
                            onChange={(e) =>
                                setParams({ ...params, limit: e.target.value })
                            }
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
                                params.type_id !== null ||
                                params.vehicle_type_id !== null
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
                            placeholder="Tên gói ưu đãi, Tên bãi đỗ xe"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="package-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="package-list-content__sub">
                    <Table
                        className="package-list-content__sub__table"
                        columns={columnPackage}
                        dataSource={packageList}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            user.role === roles.PARKING_USER
                                ? 'package-list-content__sub__table__row-action'
                                : 'package-list-content__sub__table__row-noaction'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    setPackageItem(record)
                                    setUserPackage(record)
                                    user.role === roles.PARKING_USER
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
                                    className="button-gray"
                                    onClick={(e) => setShowModalAll(false)}
                                >
                                    Thoát
                                </button>
                                <button
                                    className="button-green"
                                    htmlType="submit"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* ----------------------------------- TAB CỦA TÔI - PARKING USER ----------------------------------- */}
            <div
                className={
                    params.tab_state === TAB_OWNER
                        ? 'package-list-content'
                        : 'package-list-content-unactive'
                }
            >
                <div className="title">Các gói ưu đãi của tôi</div>
                <div className="package-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) =>
                            setParams({
                                ...defaultParams,
                                tab_state: TAB_ALL,
                            })
                        }
                    >
                        Tất cả
                    </button>
                    <button className="button-active">Của tôi</button>
                </div>
                <div className="package-list-content__action__state-one">
                    <div className="package-list-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.limit }}
                            onChange={(e) =>
                                setParams({ ...params, limit: e.target.value })
                            }
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
                                params.type_id !== null ||
                                params.vehicle_type_id !== null ||
                                params.is_expired !== null ||
                                (params.created_from_date !== null &&
                                    params.created_from_date !== '') ||
                                (params.created_to_date !== null &&
                                    params.created_to_date !== '') ||
                                (params.expired_from_date !== null &&
                                    params.expired_from_date !== '') ||
                                (params.expired_to_date !== null &&
                                    params.expired_to_date !== '')
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
                            placeholder="Tên gói ưu đãi, Tên bãi đỗ xe"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="package-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="package-list-content__sub">
                    <Table
                        className="package-list-content__sub__table"
                        columns={columnUserPackage}
                        dataSource={userPackageList}
                        pagination={state.pagination}
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
                        defaultValue={{ value: params.limit }}
                        onChange={(e) =>
                            setParams({ ...params, limit: e.target.value })
                        }
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
                            params.type_id != null ||
                            params.vehicle_type_id != null
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
                        placeholder="Tên gói ưu đãi, Tên bãi đỗ xe"
                        onChange={(e) =>
                            setParams({ ...params, txt_search: e.target.value })
                        }
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
                    columns={columnPackage}
                    dataSource={packageList}
                    pagination={state.pagination}
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
                        className="button-gray"
                        onClick={(e) => setShowModalParkingLot(false)}
                    >
                        Thoát
                    </button>
                    <Link to={`/packages/${packageItem.id}/edit`}>
                        <button className="button-green"> Chỉnh sửa</button>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}

export default Packages
