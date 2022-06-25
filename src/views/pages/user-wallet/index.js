import React, { useState, useEffect } from 'react'
import {
    Table,
    DatePicker,
    Menu,
    Dropdown,
    Button,
    Modal,
    Form,
    Select,
    Input,
} from 'antd'
import { useParams } from 'react-router-dom'
import messages from 'assets/lang/messages'
import walletApi from 'api/walletApi'
import useAuth from 'hooks/useAuth'
import {
    FilterOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import * as roles from 'shared/constants/role'
import './user-wallet.scss'

const { Search } = Input
const { Option } = Select
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

function UserWallet() {
    const { user } = useAuth()
    const { id } = useParams()
    const [walletType, setWalletType] = useState('All')
    const [balance, setBalance] = useState(0)
    const [total, setTotal] = useState(0)
    const [transactionList, setTransactionList] = useState()
    const [walletID, setWalletID] = useState()
    const [walletFillter, setWalletFillter] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
        txt_search: null,
        type_id: null,
        state: 0,
        from_date: null,
        to_date: null,
    })

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
                        setWalletID(response.data.Wallet.id)
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
                            setWalletID(response.data.Wallet.id)
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
        if (user.role === roles.ADMIN) {
            walletApi.getWalletByUserId(id, params).then((response) => {
                setWalletID(response.data.Wallet.id)
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
            walletApi.getWalletByUserId(user.id, params).then((response) => {
                setWalletID(response.data.Wallet.id)
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
        }
    }, [user, pageSize, id])

    const onButtonClick = (e) => {
        setShowModal(true)
    }

    const handleCancle = (e) => {
        setShowModal(false)
    }

    const handleSubmit = async (values) => {
        try {
            const newRecharge = {
                serial: values.serial,
                price: parseInt(values.card),
            }
            const response = await walletApi.rechargeById(walletID, newRecharge)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
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
                <Button
                    className="detail-wallet-content__balance__btn"
                    onClick={onButtonClick}
                    shape="circle"
                >
                    <PlusCircleOutlined className="detail-wallet-content__balance__btn__icon" />
                    <span className="detail-wallet-content__balance__btn__char">
                        Nạp tiền
                    </span>
                </Button>
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
                    <div className="detail-wallet-content__history__action__search">
                        <Search className="search-box" allowClear suffix />
                        <SearchOutlined className="detail-wallet-content__history__action__search__icon" />
                    </div>
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
                    <Modal
                        className="modal"
                        visible={showModal}
                        onCancel={() => {
                            setShowModal(false)
                        }}
                        footer={null}
                    >
                        <h1 className="title">Nạp tiền </h1>
                        <Form
                            className="recharge-content__sub"
                            onFinish={handleSubmit}
                        >
                            <div className="recharge-content__sub__info">
                                <div className="recharge-content__sub__info__item">
                                    <span className="span">Nhà mạng</span>
                                    <Form.Item
                                        name="home_network"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    messages['text_required'],
                                            },
                                        ]}
                                    >
                                        <Select>
                                            <Option value="1">Mobile</Option>
                                            <Option value="2">Viettel</Option>
                                            <Option value="3">Vinaphone</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="recharge-content__sub__info__item">
                                    <span className="span">Mệnh giá</span>
                                    <Form.Item
                                        name="card"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    messages['text_required'],
                                            },
                                        ]}
                                    >
                                        <Select>
                                            <Option value="10000">10000</Option>
                                            <Option value="20000">20000</Option>
                                            <Option value="50000">50000</Option>
                                            <Option value="100000">
                                                100000
                                            </Option>
                                            <Option value="200000">
                                                200000
                                            </Option>
                                            <Option value="500000">
                                                500000
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="recharge-content__sub__info__item">
                                    <span className="span">Serial</span>
                                    <Form.Item
                                        name="serial"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    messages['text_required'],
                                            },
                                        ]}
                                    >
                                        <Input type="string" />
                                    </Form.Item>
                                </div>
                                <div className="recharge-content__sub__info__item">
                                    <span className="span">Mã thẻ</span>
                                    <Form.Item
                                        name="card_code"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    messages['text_required'],
                                            },
                                        ]}
                                    >
                                        <Input type="string" />
                                    </Form.Item>
                                </div>
                                <div className="recharge-content__sub__info__note">
                                    <span>
                                        Lưu ý: Chọn sai mệnh giá sẽ không được
                                        cộng tiền. Hãy kiểm tra kỹ trước khi nạp
                                    </span>
                                </div>
                            </div>
                            <div className="recharge-content__sub__button">
                                <Button
                                    className="button-cancel"
                                    onClick={handleCancle}
                                >
                                    Thoát
                                </Button>
                                <Button
                                    className="button-save"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default UserWallet
