import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown, Space, DatePicker } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import './wallet-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

function Wallets() {
    const { user } = useAuth()
    const [page, setPage] = useState(10)
    const [swapPage, setSwapPage] = useState(true)
    const [activeFilter, setActiveFilter] = useState(false)
    const [walletType, setWalletType] = useState('All')
    const [walletState, setWalletState] = useState('All')
    let navigate = useNavigate()

    const avatarURL = process.env.REACT_APP_API_URL + user.UserInfo?.avatar

    const state = {
        pagination: {
            pageSize: page,
        },
    }

    const onSearch = (value) => console.log(value)

    useEffect(() => {
        // TODO
    }, [activeFilter])

    useEffect(() => {
        if (walletType === 'All' && walletState === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [walletType, walletState])

    const walletTypeOfItem = [
        'All',
        'Nạp Card',
        'Liên kết với ngân hàng',
        'Nạp tiền trực tiếp với chủ nhà xe',
    ]

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '10%',
            render: () => (
                <img src={avatarURL} className="avatar-user" alt="" />
            ),
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'name',
            width: '20%',
        },
        {
            title: 'Số dư (VND)',
            dataIndex: 'balance',
            width: '20%',
        },
        {
            title: 'Giao dịch gần nhất',
            dataIndex: 'updated_at',
            width: '15%',
        },
        {
            title: 'Số tiền giao dịch (VND)',
            dataIndex: 'amount_trans',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: () => (
                <Space size="middle">
                    <a href="/wallets/payment">
                        <PlusCircleOutlined className="icon-edit" />
                    </a>
                </Space>
            ),
        },
    ]

    const dataParkingUser = []
    for (let i = 0; i < page; i++) {
        dataParkingUser.push({
            key: i,
            avatar: avatarURL,
            name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '-100000',
        })
        dataParkingUser.push({
            key: i + 1,
            avatar: avatarURL,
            name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '+100000',
        })
    }

    const dataParkingLotUser = []
    for (let i = 0; i < page; i++) {
        dataParkingLotUser.push({
            key: i,
            avatar: avatarURL,
            name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '+100000',
        })
        dataParkingLotUser.push({
            key: i + 1,
            avatar: avatarURL,
            name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '-100000',
        })
    }

    const handleRow = (record) => ({
        onClick: () => {
            // router.push(`/schedule/${record.id}`)
            navigate(`/wallets/detail`)
        },
    })

    const menu = () => {
        return (
            <Menu class="wallet-list-menu">
                <div className="wallet-list-menu__item">
                    <div className="wallet-list-menu__item__row">
                        <span className="wallet-list-menu__item__row__span">
                            Loại giao dịch
                        </span>
                        <select
                            className="wallet-list-menu__item__row__select"
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
                    <div className="wallet-list-menu__item__row">
                        <span className="wallet-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="wallet-list-menu__item__row__select"
                            onChange={(e) => setWalletState(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Nạp tiền">Nạp tiền</option>
                            <option value="Rút tiền">Rút tiền</option>
                        </select>
                    </div>

                    <div className="wallet-list-menu__item__row">
                        <span className="wallet-list-menu__item__row__span">
                            Giao dịch gần nhất
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
        <div>
            <div
                className={
                    swapPage
                        ? 'wallet-list-content'
                        : 'wallet-list-content-unactive'
                }
            >
                <div className="title">Danh sách ví cá nhân</div>

                <div className="wallet-list-content__swap-page">
                    <button className="button-active">Parking User</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(false)}
                    >
                        Parking-lot User
                    </button>
                </div>

                <div className="wallet-list-content__action">
                    <div className="wallet-list-content__action__select">
                        <span>Hiển thị</span>
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
                                    ? 'wallet-list-content__action__filter-active'
                                    : 'wallet-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="wallet-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="wallet-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="wallet-list-content__sub">
                    <Table
                        className="wallet-list-content__sub__table"
                        columns={columns}
                        dataSource={dataParkingLotUser}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        onRow={handleRow}
                    />
                </div>
            </div>

            <div
                className={
                    swapPage
                        ? 'wallet-list-content-unactive'
                        : 'wallet-list-content'
                }
            >
                <div className="title">Danh sách ví cá nhân</div>
                <div className="wallet-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(true)}
                    >
                        Parking User
                    </button>
                    <button className="button-active">Parking-lot User</button>
                </div>
                <div className="wallet-list-content__action">
                    <div className="wallet-list-content__action__select">
                        <span>Hiển thị</span>
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
                                    ? 'wallet-list-content__action__filter-active'
                                    : 'wallet-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="wallet-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="wallet-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="wallet-list-content__sub">
                    <Table
                        className="wallet-list-content__sub__table"
                        columns={columns}
                        dataSource={dataParkingUser}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        //onRow={handleRow}
                    />
                </div>
            </div>
        </div>
    )
}

export default Wallets
