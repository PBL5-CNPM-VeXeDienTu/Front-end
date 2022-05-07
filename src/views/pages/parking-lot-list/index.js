import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Input } from 'antd'

import './parking-lot-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'name',
        width: '25%',
    },
    {
        title: 'Thời gian mở',
        dataIndex: 'time',
        width: '13%',
    },
    {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        width: '10%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '13%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
]

function ParkingLots() {
    const [page, setPage] = useState(10)
    const [ filterState, setFilterState ] = useState(0)
    const navigate = useNavigate()

    const onSearch = (value) => console.log(value)

    const state = {
        pagination: {
            pageSize: page,
        },
    }

    const data = []
    for (let i = 0; i < page; i++) {
        data.push({
            key: i,
            name: 'Bãi đỗ xe KTX Bách Khoa',
            time: '7h - 21h30',
            capacity: 200,
            status: 'Đang mở cửa',
            address: '60 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiển, Đà Nẵng',
        })
    }

    return (
        <div className="parking-lot-list-content">
            <div className="parking-lot-list-content__title">
                Danh sách bãi đỗ xe
            </div>
            <div className="parking-lot-list-content__action">
                <div className="parking-lot-list-content__action__select">
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
                <div className="parking-lot-list-content__action__filter-state">
                    <span className="span">Trạng thái</span>
                    <button 
                        className={ filterState === 0 
                            ? "button-active__left" 
                            : "button-unactive__left" 
                        } 
                        onClick={ (e) => setFilterState(0)}
                    >
                        All
                    </button>
                    <button 
                        className={ filterState === 1 
                            ? "button-active" 
                            : "button-unactive" 
                        } 
                        onClick={ (e) => setFilterState(1)}
                    >
                        Mở cửa
                    </button>
                    <button 
                        className={ filterState === 2 
                            ? "button-active__right" 
                            : "button-unactive__right" 
                        } 
                        onClick={ (e) => setFilterState(2)}
                    >
                        Đóng cửa
                    </button>
                </div>


                <div className="parking-lot-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        allowClear
                        suffix
                    />
                </div>
            </div>

            <div className="parking-lot-list-content__sub">
                <Table
                    className="parking-lot-list-content__sub__table"
                    columns={columns}
                    dataSource={data}
                    pagination={state.pagination}
                    rowClassName={(record, index) =>
                        record.status === 'Đang mở cửa'
                            ? 'parking-lot-list-content__sub__table__row-green'
                            : 'parking-lot-list-content__sub__table__row-red'
                    }
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => navigate('/parking-lots/detail'),
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default ParkingLots
