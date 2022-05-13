import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown, Space, Modal, DatePicker } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
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
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [walletType, setWalletType] = useState('All')
    const [feature, setFeature] = useState('All')
    const [walletState, setWalletState] = useState('All')
    let navigate = useNavigate()

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

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
        if (walletType === 'All' && feature === 'All' && walletState === 'All')
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [walletType, feature, walletState])

    const walletTypeOfItem = [
        'All',
        'Nạp Card',
        'Liên kết với ngân hàng',
        'Nạp tiền trực tiếp với chủ nhà xe',
    ]

    const columnsBasic = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '10%',
            render: () => <img src={avatarURL} className="avatar-user" />,
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'basic_name',
            width: '20%',
        },
        {
            title: 'Số dư (VND)',
            dataIndex: 'balance',
            width: '20%',
        },
        {
            title: 'Giao dịch gần nhất lúc',
            dataIndex: 'updated_at',
            width: '20%',
        },
        {
            title: 'Số tiền giao dịch (VND)',
            dataIndex: 'amount_trans',
            width: '15%',
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
                    <div onClick={showModal}>
                        <DeleteOutlined className="icon-delete" />
                    </div>
                </Space>
            ),
        },
    ]

    const columnsParkinglot = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '10%',
            render: () => <img src={avatarURL} className="avatar-user" />,
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'basic_name',
            width: '20%',
        },
        {
            title: 'Số dư (VND)',
            dataIndex: 'balance',
            width: '20%',
        },
        {
            title: 'Giao dịch gần nhất lúc',
            dataIndex: 'updated_at',
            width: '20%',
        },
        {
            title: 'Số tiền giao dịch (VND)',
            dataIndex: 'amount_trans',
            width: '15%',
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
                    <div>
                        <DeleteOutlined
                            onClick={showModal}
                            className="icon-delete"
                        />
                    </div>
                </Space>
            ),
        },
    ]

    const dataBasic = []
    for (let i = 0; i < page; i++) {
        dataBasic.push({
            key: i,
            avatar: avatarURL,
            basic_name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '-100000',
        })
        dataBasic.push({
            key: i + 1,
            avatar: avatarURL,
            basic_name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '+100000',
        })
    }

    const dataParkinglot = []
    for (let i = 0; i < page; i++) {
        dataParkinglot.push({
            key: i,
            avatar: avatarURL,
            basic_name: 'Phạm Văn Thọ',
            balance: '1200000',
            updated_at: new Date('5-1-2022').toLocaleDateString('en-GB'),
            amount_trans: '+100000',
        })
        dataParkinglot.push({
            key: i + 1,
            avatar: avatarURL,
            basic_name: 'Phạm Văn Thọ',
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
                            <option value="Chưa duyệt">Nạp tiền</option>
                            <option value="Đã duyệt">Rút tiền</option>
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
                <div className="title">Danh sách ví</div>

                <div className="wallet-list-content__swap-page">
                    <button className="button-active">Basic</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(false)}
                    >
                        Parking-lot
                    </button>
                </div>

                <div className="wallet-list-content__action">
                    <div className="wallet-list-content__action__select">
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
                        columns={columnsBasic}
                        dataSource={dataBasic}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        onRow={handleRow}
                    ></Table>
                </div>
            </div>

            <div
                className={
                    swapPage
                        ? 'wallet-list-content-unactive'
                        : 'wallet-list-content'
                }
            >
                <div className="title">Danh sách ví</div>
                <div className="wallet-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(true)}
                    >
                        Basic
                    </button>
                    <button className="button-active">Parking-lot</button>
                </div>
                <div className="wallet-list-content__action">
                    <div className="wallet-list-content__action__select">
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
                    </div>
                </div>

                <div className="wallet-list-content__sub">
                    <Table
                        className="wallet-list-content__sub__table"
                        columns={columnsParkinglot}
                        dataSource={dataParkinglot}
                        pagination={state.pagination}
                        rowClassName={(record, index) =>
                            record.amount_trans >= 0
                                ? 'wallet-list-content__sub__table__row-green'
                                : 'wallet-list-content__sub__table__row-red'
                        }
                        //onRow={handleRow}
                    ></Table>
                    <Modal
                        className="delete-wallet-modal"
                        title="Hủy Ví"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p>Bạn có chắn chắn muốn hủy ví hay không ?</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Wallets
