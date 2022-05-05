import React, { useState } from 'react'
import { Table, Select, Input } from 'antd'

import './parking-lot-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Thời gian mở',
        dataIndex: 'time',
        width: '15%',
    },
    {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        width: '13%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '15%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
]

function ParkingLots() {
    const [item, setItem] = useState(20)
    const onSearch = (value) => console.log(value)

    const handleChange = (value) => {
        setItem(value)
    }

    console.log(item)

    const data = []
    for (let i = 0; i < item; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            time: '7h - 21h30',
            capacity: 200,
            status: 'Đang mở cửa',
            address: `30 Ngô Sĩ Liên, ${i} `,
        })
    }
    const state = {
        pagination: {
            pageSize: item,
        },
    }

    return (
        <div className="parking-lot-list-content">
            <div className="parking-lot-list-content__action">
                <div className="parking-lot-list-content__action__select">
                    <span>Hiển thị </span>
                    <Select
                        className="select-box"
                        defaultValue={{ value: item }}
                        onChange={handleChange}
                    >
                        {numOfItem.map((numOfItem, index) => {
                            return (
                                <Select.Option key={index} value={numOfItem}>
                                    {numOfItem}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </div>

                <div className="parking-lot-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        enterButton
                    />
                </div>

                <div className="parking-lot-list-content__action__search"></div>
            </div>

            <div className="parking-lot-list-content__sub">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={state.pagination}
                />
            </div>
        </div>
    )
}

export default ParkingLots
