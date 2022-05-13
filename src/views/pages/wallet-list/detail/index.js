import React, { useState, useEffect } from 'react'
import { Table, Input, DatePicker, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import {
    FilterOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import './detail-wallet.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Lọai giao dịch',
        dataIndex: 'type',
        width: '20%',
    },
    {
        title: 'Thời gian',
        dataIndex: 'time',
        width: '20%',
    },
    {
        title: 'Trước giao dịch (VND)',
        dataIndex: 'begin',
        width: '20%',
    },
    {
        title: 'Số tiền (VND)',
        dataIndex: 'money',
        width: '20%',
    },
    {
        title: 'Sau giao dịch (VND)',
        dataIndex: 'after',
        width: '20%',
    },
]

function DetailWallet() {
    const [walletType, setWalletType] = useState('All')
    const [walletState, setWalletState] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [page, setPage] = useState(10)

    const onSearch = (value) => console.log(value)
    const state = {
        pagination: {
            pageSize: page,
        },
    }

    useEffect(() => {
        console.log(activeFilter)
    }, [activeFilter])

    useEffect(() => {
        if (walletType === 'All'  && walletState === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [walletType, walletState])

    const walletTypeOfItem = [
        'All',
        'Nạp Card',
        'Liên kết với ngân hàng',
        'Nạp tiền trực tiếp với chủ nhà xe',
    ]
    const data = []
    for (let i = 0; i < 46; i += 2) {
        data.push({
            key: i,
            type: `Nạp tiền qua thẻ cào ${i}`,
            time: `25/4/2021 7:12`,
            begin: 200000,
            money: `+100000`,
            after: 300000,
        })
        data.push({
            key: i + 1,
            type: `Nạp tiền qua thẻ cào ${i + 1}`,
            time: `25/4/2021 7:12`,
            begin: 200000,
            money: -100000,
            after: 300000,
        })
    }

    const menu = () => {
        return (
            <Menu class="detail-wallet-menu">
                <div className="detail-wallet-menu__item">
                    <div className="detail-wallet-menu__item__row">
                        <span className="detail-wallet-menu__item__row__span">
                            Loại giao dịch
                        </span>
                        <select
                            className="detail-wallet-menu__item__row__select"
                            onChange={(e) => setWalletType(e.target.value)}
                        >
                            {walletTypeOfItem.map((walletTypeOfItem, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={walletTypeOfItem}
                                    >
                                        {walletTypeOfItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="detail-wallet-menu__item__row">
                        <span className="detail-wallet-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="detail-wallet-menu__item__row__select"
                            onChange={(e) => setWalletState(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Chưa duyệt">Nạp tiền</option>
                            <option value="Đã duyệt">Rút tiền</option>
                        </select>
                    </div>

                    <div className="detail-wallet-menu__item__row">
                        <span className="detail-wallet-menu__item__row__span">
                            Thời gian bắt đầu
                        </span>
                        <DatePicker
                            size="medium"
                            // defaultValue={moment(
                            //     'YYYY/MM/DD',
                            // )}
                            // format="DD/MM/YYYY"
                            placeholder="Thời gian bắt đầu"
                        />
                    </div>

                    <div className="detail-wallet-menu__item__row">
                        <span className="detail-wallet-menu__item__row__span">
                            Thời gian kết thúc
                        </span>
                        <DatePicker
                            size="medium"
                            // defaultValue={moment(
                            //     'YYYY/MM/DD',
                            // )}
                            // format="DD/MM/YYYY"
                            placeholder="Thời gian kết thúc"
                        />
                    </div>
                </div>
            </Menu>
        )
    }

    return (
        <div className="detail-wallet-content">
            <div className="title">
                <span>Ví cá nhân</span>
            </div>
            <div className="detail-wallet-content__balance">
                <div className="detail-wallet-content__balance__title">
                    Số dư khả dụng: 5000000 VND
                </div>
                <Link
                    to="/wallets/payment"
                    className="detail-wallet-content__balance__btn"
                >
                    <PlusCircleOutlined className="detail-wallet-content__balance__btn__icon" />
                    <span className="detail-wallet-content__balance__btn__char">
                        Nạp tiền
                    </span>
                </Link>
            </div>
            <div className="detail-wallet-content__history">
                <div className="detail-wallet-content__history__title">
                    Lịch sử thay đổi số dư
                </div>
                <div className="detail-wallet-content__history__action">
                    <div className="detail-wallet-content__history__action__select">
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
                                    ? 'detail-wallet-content__history__action__filter-active'
                                    : 'detail-wallet-content__history__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="detail-wallet-content__history__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="detail-wallet-content__history__action__search__icon" />
                    </div>
                </div>
                <div className="detail-wallet-content__history__table">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            record.money >= 0
                                ? 'detail-wallet-content__history__table__row-green'
                                : 'detail-wallet-content__history__table__row-red'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailWallet
