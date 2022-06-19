import React, { useState, useEffect } from 'react'
import { Table, DatePicker, Menu, Dropdown } from 'antd'
import { Link, useParams } from 'react-router-dom'
import walletApi from 'api/walletApi'
import useAuth from 'hooks/useAuth'
import { FilterOutlined, PlusCircleOutlined } from '@ant-design/icons'
import * as roles from 'shared/constants/role'
import './detail-wallet.scss'

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
    const { user } = useAuth()
    const { id } = useParams()
    const [walletType, setWalletType] = useState('All')
    const [balance, setBalance] = useState(0)
    const [total, setTotal] = useState(0)
    const [transactionList, setTransactionList] = useState()
    const [walletFillter, setWalletFillter] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const walletTypeOfItem = [
        'All',
        'Nạp Card',
        'Liên kết với ngân hàng',
        'Nạp tiền trực tiếp với chủ nhà xe',
    ]

    const walletState = {
        pagination: {
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
                const params = {
                    limit: pageSize,
                    page: page,
                }
                if (user.role === roles.ADMIN) {
                    walletApi.getWalletByUserId(id, params).then((response) => {
                        setBalance(response.data.Wallet.balance)
                        setTotal(response.data.Transactions.count)
                        setTransactionList(
                            response.data.Transactions.rows.map(
                                (transaction) => ({
                                    type: transaction.TransactionType.type_name,
                                    time: transaction.createdAt,
                                    begin: transaction.old_balance,
                                    money:
                                        transaction.amount < 0
                                            ? transaction.amount
                                            : '+' + transaction.amount,
                                    after: transaction.new_balance,
                                }),
                            ),
                        )
                    })
                } else {
                    walletApi
                        .getWalletByUserId(user.id, params)
                        .then((response) => {
                            setBalance(response.data.Wallet.balance)
                            setTotal(response.data.Transactions.count)
                            setTransactionList(
                                response.data.Transactions.rows.map(
                                    (transaction) => ({
                                        type: transaction.TransactionType
                                            .type_name,
                                        time: transaction.createdAt,
                                        begin: transaction.old_balance,
                                        money:
                                            transaction.amount < 0
                                                ? transaction.amount
                                                : '+' + transaction.amount,
                                        after: transaction.new_balance,
                                    }),
                                ),
                            )
                        })
                }
            },
        },
    }

    useEffect(() => {
        if (walletType === 'All' && walletFillter === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [walletType, walletFillter])

    useEffect(() => {
        const params = {
            limit: pageSize,
            page: 1,
        }
        if (!!user) {
            if (user.role === roles.ADMIN) {
                walletApi.getWalletByUserId(id, params).then((response) => {
                    setBalance(response.data.Wallet.balance)
                    setTotal(response.data.Transactions.count)
                    setTransactionList(
                        response.data.Transactions.rows.map((transaction) => ({
                            type: transaction.TransactionType.type_name,
                            time: transaction.createdAt,
                            begin: transaction.old_balance,
                            money:
                                transaction.amount < 0
                                    ? transaction.amount
                                    : '+' + transaction.amount,
                            after: transaction.new_balance,
                        })),
                    )
                })
            } else {
                walletApi
                    .getWalletByUserId(user.id, params)
                    .then((response) => {
                        setBalance(response.data.Wallet.balance)
                        setTotal(response.data.Transactions.count)
                        setTransactionList(
                            response.data.Transactions.rows.map(
                                (transaction) => ({
                                    type: transaction.TransactionType.type_name,
                                    time: transaction.createdAt,
                                    begin: transaction.old_balance,
                                    money:
                                        transaction.amount < 0
                                            ? transaction.amount
                                            : '+' + transaction.amount,
                                    after: transaction.new_balance,
                                }),
                            ),
                        )
                    })
            }
        }
    }, [user, pageSize, id])

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
                            onChange={(e) => setWalletFillter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Nạp tiền">Nạp tiền</option>
                            <option value="Rút tiền">Rút tiền</option>
                        </select>
                    </div>

                    <div className="detail-wallet-menu__item__row">
                        <span className="detail-wallet-menu__item__row__span">
                            Thời gian bắt đầu
                        </span>
                        <DatePicker
                            size="medium"
                            className="input"
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
                            className="input"
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
                    Số dư khả dụng: {balance} VND
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
                                activeFilter
                                    ? 'detail-wallet-content__history__action__filter-active'
                                    : 'detail-wallet-content__history__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                </div>
                <div className="detail-wallet-content__history__table">
                    <Table
                        columns={columns}
                        dataSource={transactionList}
                        pagination={walletState.pagination}
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
