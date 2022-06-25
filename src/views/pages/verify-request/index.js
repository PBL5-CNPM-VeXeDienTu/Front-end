import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, DatePicker } from 'antd'
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

const TAB_VEHICLE = 'xe'
const TAB_PARKING_LOT = 'Bãi đỗ xe'
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
    const [parkingLotList, setParkingLotList] = useState()
    const [vehicleList, setVehicleList] = useState()
    const defaultParams = {
        limit: 10,
        page: 1,
        tab_state: TAB_VEHICLE,
        txt_search: null,
        verify_state: null,
        from_date: null,
        to_date: null,
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
        params.tab_state === TAB_VEHICLE
            ? vehicleApi.getListByParams(params).then((response) => {
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
            : parkingLotApi.getListByParams(params).then((response) => {
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
    }, [params])

    const menu = () => {
        return (
            <Menu class="verify-request-menu">
                <div className="verify-request-menu__item">
                    <span className="verify-request-menu__item__span">
                        Trạng thái
                    </span>
                    <select
                        className="verify-request-menu__item__select"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                verify_state:
                                    e.target.value === 'All'
                                        ? null
                                        : e.target.value,
                            })
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
                <div className="border-bottom">Thời điểm đăng kí</div>
                <div className="verify-request-menu__item">
                    <span className="verify-request-menu__item__span padding-left">
                        Từ ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                from_date: dateString,
                            })
                        }
                        placeholder="Thời gian bắt đầu"
                    />
                </div>
                <div className="verify-request-menu__item">
                    <span className="verify-request-menu__item__span padding-left">
                        Đến ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                to_date: dateString,
                            })
                        }
                        placeholder="Thời gian bắt đầu"
                    />
                </div>
            </Menu>
        )
    }

    return user.role === roles.ADMIN ? (
        <div>
            {/* ------------------------------------- TAB VEHICLE -------------------------------------- */}
            <div
                className={
                    params.tab_state === TAB_VEHICLE
                        ? 'verify-request-content'
                        : 'verify-request-content-unactive'
                }
            >
                <div className="title">Danh sách đăng ký xe</div>
                <div className="verify-request-content__swap-page">
                    <button className="button-active">Xe</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => {
                            setParams({
                                ...defaultParams,
                                tab_state: TAB_PARKING_LOT,
                            })
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
                                params.verify_state != null ||
                                params.from_date != null ||
                                params.to_date != null
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
                            placeholder="Tên bãi đỗ xe, chủ sở hữu, địa chỉ"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
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
                        pagination={state.pagination}
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

            {/* ----------------------------------- TAB PARKING-LOT  ----------------------------------- */}
            <div
                className={
                    params.tab_state === TAB_PARKING_LOT
                        ? 'verify-request-content'
                        : 'verify-request-content-unactive'
                }
            >
                <div className="title">Danh sách đăng ký bãi đỗ xe</div>
                <div className="verify-request-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => {
                            setParams({
                                ...defaultParams,
                                tab_state: TAB_VEHICLE,
                            })
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
                                params.verify_state != null ||
                                params.from_date != null ||
                                params.to_date != null
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
                            placeholder="Chủ sở hữu, hãng xe, biển số"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
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
                        pagination={state.pagination}
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
        </div>
    ) : (
        <Navigate to="/404" />
    )
}

export default VerifyRequest
