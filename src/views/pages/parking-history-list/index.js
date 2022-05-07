import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import './parking-history-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Biển số xe',
        dataIndex: 'license_plates',
        width: '20%',
    },
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'parking_lot_name',
        width: '20%',
    },
    {
        title: 'Thời gian checkin',
        dataIndex: 'checkin_time',
        width: '10%',
    },
    {
        title: 'Thời gian checkout',
        dataIndex: 'checkout_time',
        width: '10%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '20%',
    },
    {
        title: 'Phí đỗ xe (VND)',
        dataIndex: 'cost',
        width: '20%',
    },
]

function ParkingHistories() {
    const [page, setPage] = useState(10)
    const [historyType, setHistoryType] = useState('All')
    const [vehicleState, setVehicleState] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [wallet, setWallet] = useState({
        key: 0,
        license_plates: '',
        parking_lot_name: '',
        checkin_time: '',
        checkout_time: '',
        status: '',
        cost: 0,
    })

    const state = {
        pagination: {
            pageSize: page,
        },
    }

    const onSearch = (value) => console.log(value)

    useEffect(() => {
        console.log(activeFilter)
    }, [activeFilter])

    useEffect(() => {
        if (historyType === 'All' && vehicleState === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [historyType, vehicleState])

    const vehicleStateOfItem = ['All', 'Đang đỗ', 'Không đỗ']
    const historyTypeOfItem = ['All', 'Biển số xe', 'Tên bãi đỗ xe']

    const data = []
    for (let i = 0; i < page / 2; i++) {
        data.push({
            key: i,
            license_plates: '29C99999',
            parking_lot_name: 'Phu',
            checkin_time: '7h30',
            checkout_time: '14h30',
            status: 'Đang đỗ',
            cost: '2000',
        })
        data.push({
            key: i + 1,
            license_plates: '29C99999',
            parking_lot_name: 'Phu',
            checkin_time: '7h30',
            checkout_time: '14h30',
            status: 'Không đỗ',
            cost: '2000',
        })
    }

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
            <div className="history-list-content__title">Lịch sử gửi xe</div>
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
                </div>
            </div>

            <div className="history-list-content__sub">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={state.pagination}
                    rowClassName={(record, index) =>
                        record.status === 'Đang đỗ'
                            ? 'history-list-content__sub__row-green'
                            : 'history-list-content__sub__row-red'
                    }
                />
            </div>
        </div>
    )
}

export default ParkingHistories
