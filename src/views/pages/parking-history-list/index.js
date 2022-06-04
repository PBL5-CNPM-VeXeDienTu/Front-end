import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import parkingHistoryApi from 'api/parkingHistoryApi'
import * as roles from 'shared/constants/role'

import './parking-history-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const vehicleStateOfItem = ['All', 'Đang đỗ', 'Không đỗ']
const historyTypeOfItem = ['All', 'Biển số xe', 'Tên bãi đỗ xe']
const columns = [
    {
        title: 'Biển số xe',
        dataIndex: 'license_plate',
        width: '10%',
    },
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'parking_lot_name',
        width: '25%',
    },
    {
        title: 'Thời gian checkin',
        dataIndex: 'checkin_time',
        width: '18%',
    },
    {
        title: 'Thời gian checkout',
        dataIndex: 'checkout_time',
        width: '18%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'state',
        width: '14%',
        render: (text, record) => (
            <span className={record.state ? 'span-green' : 'span-gray-italic'}>
                {record.state ? 'Đang đỗ' : 'Đã checkout'}
            </span>
        ),
    },
    {
        title: 'Phí đỗ xe (VND)',
        dataIndex: 'cost',
        width: '15%',
    },
]

function ParkingHistories() {
    const { user } = useAuth()
    const [page, setPage] = useState(10)
    const [historyType, setHistoryType] = useState('All')
    const [vehicleState, setVehicleState] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [parkingHistoryList, setParkingHistoryList] = useState([])
    const [total, setTotal] = useState(0)
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
    })

    const state = {
        pagination: {
            pageSize: params.limit,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    limit: pageSize,
                    page: page,
                })
            },
        },
    }

    const onSearch = (value) => console.log(value)

    useEffect(() => {
        if (!!user) {
            if (user.role === roles.BASIC_USER) {
                parkingHistoryApi
                    .getListByParkingLotUserId(user.id, params)
                    .then((response) => {
                        setTotal(response.data.count)
                        setParkingHistoryList(
                            response.data.rows.map((parkingHistory) => ({
                                key: parkingHistory.id,
                                id: parkingHistory.id,
                                license_plate:
                                    parkingHistory.Vehicle?.license_plate,
                                parking_lot_name:
                                    parkingHistory.ParkingLot?.name,
                                checkin_time: parkingHistory.checkin_time,
                                checkout_time: parkingHistory.checkout_time,
                                state: parkingHistory.is_parking,
                                cost: parkingHistory.cost,
                                memo: parkingHistory.memo,
                            })),
                        )
                    })
            }
        }
        if (historyType === 'All' && vehicleState === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [user, params, historyType, vehicleState])

    const menu = () => {
        return (
            <Menu class="history-list-menu">
                <div className="history-list-menu__item">
                    <div className="history-list-menu__item__row">
                        <span className="history-list-menu__item__row__span">
                            Tìm kiếm theo
                        </span>
                        <select
                            className="history-list-menu__item__row__select"
                            onChange={(e) => setHistoryType(e.target.value)}
                        >
                            {historyTypeOfItem.map(
                                (historyTypeOfItem, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={historyTypeOfItem}
                                        >
                                            {historyTypeOfItem}
                                        </option>
                                    )
                                },
                            )}
                        </select>
                    </div>

                    <div className="history-list-menu__item__row">
                        <span className="history-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="history-list-menu__item__row__select"
                            onChange={(e) => setVehicleState(e.target.value)}
                        >
                            {vehicleStateOfItem.map(
                                (vehicleStateOfItem, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={vehicleStateOfItem}
                                        >
                                            {vehicleStateOfItem}
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

    return (
        <div className="history-list-content">
            <div className="title">Lịch sử gửi xe</div>
            <div className="history-list-content__action">
                <div className="history-list-content__action__select">
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
                                ? 'history-list-content__action__filter-active'
                                : 'history-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

                <div className="history-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="history-list-content__action__search__icon" />
                </div>
            </div>

            <div className="history-list-content__sub">
                <Table
                    columns={columns}
                    dataSource={parkingHistoryList}
                    pagination={state.pagination}
                />
            </div>
        </div>
    )
}

export default ParkingHistories
