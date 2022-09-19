import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown, Space, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import walletApi from 'api/walletApi'
import {
    FilterOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import * as roles from 'shared/constants/role'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './wallet-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

function Wallets() {
    const [total, setTotal] = useState(0)
    const [walletList, setWalletList] = useState()
    let navigate = useNavigate()
    const defaultParams = {
        limit: 10,
        page: 1,
        role: roles.PARKING_USER,
        txt_search: null,
        from_date: null,
        to_date: null,
    }
    const [params, setParams] = useState(defaultParams)

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.USER_AVATAR
    }

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '10%',
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar
                return (
                    <img
                        src={imgSource}
                        className="avatar-user"
                        alt=""
                        onError={handleGetImageError}
                    />
                )
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
    }, [params])

    const menu = () => {
        return (
            <Menu class="wallet-list-menu">
                <div className="border-bottom">
                    Thời điểm giao dịch gần nhất
                </div>
                <div className="wallet-list-menu__item">
                    <span className="wallet-list-menu__item__span padding-left">
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
                    />
                </div>
                <div className="wallet-list-menu__item">
                    <span className="wallet-list-menu__item__span padding-left">
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
                    />
                </div>
            </Menu>
        )
    }

    return (
        <div>
            <div
                className={
                    params.role === roles.PARKING_USER
                        ? 'wallet-list-content'
                        : 'wallet-list-content-unactive'
                }
            >
                <div className="title">Danh sách ví cá nhân</div>

                <div className="wallet-list-content__swap-page">
                    <button className="button-active">Parking User</button>
                    <button
                        className="button-unactive"
                        onClick={(e) =>
                            setParams({
                                ...defaultParams,
                                role: roles.PARKING_LOT_USER,
                            })
                        }
                    >
                        Parking-lot User
                    </button>
                </div>

                <div className="wallet-list-content__action">
                    <div className="wallet-list-content__action__select">
                        <span>Hiển thị</span>
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
                                (params.from_date !== null &&
                                    params.from_date !== '') ||
                                (params.to_date !== null &&
                                    params.to_date !== '')
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
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
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
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/user-wallet/${record.id}`)
                                },
                            }
                        }}
                    />
                </div>
            </div>

            <div
                className={
                    params.role === roles.PARKING_LOT_USER
                        ? 'wallet-list-content'
                        : 'wallet-list-content-unactive'
                }
            >
                <div className="title">Danh sách ví cá nhân</div>
                <div className="wallet-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) =>
                            setParams({
                                ...defaultParams,
                                role: roles.PARKING_USER,
                            })
                        }
                    >
                        Parking User
                    </button>
                    <button className="button-active">Parking-lot User</button>
                </div>
                <div className="wallet-list-content__action">
                    <div className="wallet-list-content__action__select">
                        <span>Hiển thị</span>
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
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
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
                        pagination={state.pagination}
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
