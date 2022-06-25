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
import transactionTypeApi from 'api/transactionTypeApi'
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
    const [balance, setBalance] = useState(0)
    const [total, setTotal] = useState(0)
    const [transactionList, setTransactionList] = useState()
    const [transactionTypeList, setTransactionTypeList] = useState()
    const [walletID, setWalletID] = useState()
    const [showModal, setShowModal] = useState(false)
    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        type_id: null,
        state: null,
        from_date: null,
        to_date: null,
    }
    const [params, setParams] = useState(defaultParams)

    const walletState = {
        pagination: {
            pageSize: params.pageSize,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    ...defaultParams,
                    limit: pageSize,
                    page: page,
                })
            },
        },
    }

    useEffect(() => {
        const user_id = !!id ? id : user.id
        walletApi.getWalletByUserId(user_id, params).then((response) => {
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
        transactionTypeApi.getAll().then((response) => {
            setTransactionTypeList(
                response.data.rows.map((transactionType) => ({
                    type_id: transactionType.id,
                    type_name: transactionType.type_name,
                })),
            )
        })
    }, [id, user, params])

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
            <Menu class="user-wallet-menu">
                <div className="user-wallet-menu__row">
                    <span className="user-wallet-menu__row__span">
                        Loại giao dịch
                    </span>
                    <select
                        className="user-wallet-menu__row__select"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                type_id:
                                    e.target.value === 'All'
                                        ? null
                                        : e.target.value,
                            })
                        }
                    >
                        <option key={0} value={'All'}>
                            All
                        </option>
                        {transactionTypeList.map((transactionType, index) => {
                            return (
                                <option
                                    key={index + 1}
                                    value={transactionType.type_id}
                                >
                                    {transactionType.type_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="user-wallet-menu__row">
                    <span className="user-wallet-menu__row__span">
                        Trạng thái
                    </span>
                    <select
                        className="user-wallet-menu__row__select"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                state:
                                    e.target.value === 'All'
                                        ? null
                                        : e.target.value,
                            })
                        }
                    >
                        <option value="All">All</option>
                        <option value={'Nạp tiền'}>Nạp tiền</option>
                        <option value={'Rút tiền'}>Rút tiền</option>
                    </select>
                </div>

                <div className="border-bottom">
                    Thời điểm thực hiện giao dịch
                </div>
                <div className="user-wallet-menu__row">
                    <span className="user-wallet-menu__row__span padding-left">
                        Từ ngày
                    </span>
                    <DatePicker
                        size="medium"
                        className="input"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                from_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="user-wallet-menu__row">
                    <span className="user-wallet-menu__row__span padding-left">
                        Đến ngày
                    </span>
                    <DatePicker
                        size="medium"
                        className="input"
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
        <div className="user-wallet-content">
            <div className="title">
                <span>Ví cá nhân</span>
            </div>
            <div className="user-wallet-content__balance">
                <div className="user-wallet-content__balance__title">
                    Số dư khả dụng: {balance} VND
                </div>
                <Button
                    className="user-wallet-content__balance__btn"
                    onClick={() => setShowModal(true)}
                    shape="circle"
                >
                    <PlusCircleOutlined className="user-wallet-content__balance__btn__icon" />
                    <span className="user-wallet-content__balance__btn__char">
                        Nạp tiền
                    </span>
                </Button>
            </div>
            <div className="user-wallet-content__history">
                <div className="user-wallet-content__history__title">
                    Lịch sử thay đổi số dư
                </div>
                <div className="user-wallet-content__history__action">
                    <div className="user-wallet-content__history__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    pageSize: e.target.value,
                                })
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
                                params.type_id !== null ||
                                params.state !== null ||
                                (params.from_date !== null &&
                                    params.from_date !== '') ||
                                (params.to_date !== null &&
                                    params.to_date !== '')
                                    ? 'user-wallet-content__history__action__filter-active'
                                    : 'user-wallet-content__history__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="user-wallet-content__history__action__search">
                        <Search
                            className="search-box"
                            placeholder="Loại giao dịch"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="user-wallet-content__history__action__search__icon" />
                    </div>
                </div>
                <div className="user-wallet-content__history__table">
                    <Table
                        columns={columns}
                        dataSource={transactionList}
                        pagination={walletState.pagination}
                        rowClassName={(record, index) =>
                            record.money >= 0
                                ? 'user-wallet-content__history__table__row-green'
                                : 'user-wallet-content__history__table__row-red'
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
                                <div className="recharge-content__sub__info">
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
                                <div className="recharge-content__sub__info">
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
                                <div className="recharge-content__sub__info">
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
                                <div className="recharge-content__sub__info">
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
                                    onClick={() => setShowModal(false)}
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
