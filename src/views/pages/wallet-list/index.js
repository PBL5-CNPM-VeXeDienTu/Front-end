import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown, Space, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import walletApi from 'api/walletApi'
import {
    FilterOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import * as roles from 'shared/constants/role'
import './wallet-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

function Wallets() {
    const { user } = useAuth()
    const [pageSize, setPageSize] = useState(10)
    const [swapPage, setSwapPage] = useState(true)
    const [total, setTotal] = useState(0)
    const [walletList, setWalletList] = useState()
    let navigate = useNavigate()

    const onSearch = (value) => console.log(value)

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '10%',
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar
                return <img src={imgSource} className="avatar-user" alt="" />
            },
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

    const walletState = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                    role: swapPage
                        ? roles.PARKING_USER
                        : roles.PARKING_LOT_USER,
                }
                walletApi.getListWallets(params).then((response) => {
                    setTotal(response.data.count)
                    setWalletList(
                        response.data.rows.map((wallet) => ({
                            id: wallet.Owner.id,
                            avatar: wallet.Owner.UserInfo.avatar,
                            name: wallet.Owner.name,
                            balance: wallet.balance,
                            updated_at: wallet.Transactions[0].createdAt,
                            amount_trans:
                                wallet.Transactions[0].amount < 0
                                    ? wallet.Transactions[0].amount
                                    : '+' + wallet.Transactions[0].amount,
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
            role: swapPage ? roles.PARKING_USER : roles.PARKING_LOT_USER,
        }
        if (!!user) {
            walletApi.getListWallets(params).then((response) => {
                setTotal(response.data.count)
                setWalletList(
                    response.data.rows.map((wallet) => ({
                        id: wallet.Owner.id,
                        avatar: wallet.Owner.UserInfo.avatar,
                        name: wallet.Owner.name,
                        balance: wallet.balance,
                        updated_at: wallet.Transactions[0].createdAt,
                        amount_trans:
                            wallet.Transactions[0].amount < 0
                                ? wallet.Transactions[0].amount
                                : '+' + wallet.Transactions[0].amount,
                    })),
                )
            })
        }
    }, [user, pageSize, swapPage])

    const menu = () => {
        return (
            <Menu class="wallet-list-menu">
                <div className="wallet-list-menu__item">
                    <span className="wallet-list-menu__item__span">
                        Thời điểm giao dịch
                    </span>
                    <div className="wallet-list-menu__item__row">
                        <span className="wallet-list-menu__item__row__span">
                            Bắt đầu
                        </span>
                        <DatePicker
                            size="medium"
                            className="input"
                            placeholder="Thời gian kết thúc"
                        />
                    </div>
                </div>
                <div className="wallet-list-menu__item">
                    <div className="wallet-list-menu__item__row">
                        <span className="wallet-list-menu__item__row__span">
                            Kết thúc
                        </span>
                        <DatePicker
                            size="medium"
                            className="input"
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
                                'wallet-list-content__action__filter-unactive'
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
                        dataSource={walletList}
                        pagination={walletState.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/wallets/${record.id}/detail`)
                                },
                            }
                        }}
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
                                'wallet-list-content__action__filter-unactive'
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
                        dataSource={walletList}
                        pagination={walletState.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/wallets/${record.id}/detail`)
                                },
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Wallets
