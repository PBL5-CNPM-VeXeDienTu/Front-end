import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown, Space, Modal } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import './account-list.scss'
import { Link } from 'react-router-dom'

const { Search } = Input
const numOfItem = [10, 15, 25]

const addressTypeItem = ['All', 'Đà Nẵng', 'Quảng Nam', 'Huế']

function Accounts() {
    const { user } = useAuth()
    const [page, setPage] = useState(10)
    const [swapPage, setSwapPage] = useState(true)
    const [addressType, setAddressType] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

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
        if (addressType === 'All') setActiveFilter(false)
        else setActiveFilter(true)
    }, [addressType])

    const columnsBasic = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '5%',
            render: () => (
                <img src={avatarURL} className="avatar-user" alt="" />
            ),
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'basic_name',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '35%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: () => (
                <Space size="middle">
                    <a href="/profile/edit">
                        <EditOutlined className="icon-edit" />
                    </a>
                    <a href>
                        <DeleteOutlined
                            onClick={showModal}
                            className="icon-delete"
                        />
                    </a>
                </Space>
            ),
        },
    ]

    const columnsParkinglot = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '5%',
            render: () => (
                <img src={avatarURL} className="avatar-user" alt="" />
            ),
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'basic_name',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '35%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: () => (
                <Space size="middle">
                    <a href>
                        <EditOutlined className="icon-edit" />
                    </a>
                    <a href>
                        <DeleteOutlined
                            onClick={showModal}
                            className="icon-delete"
                        />
                    </a>
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
            email: 'thopham.21082001@gmail.com',
            phone_number: '0702399134',
            address: 'tổ 3 , thôn Đại La, xã Hòa Sơn,Huyện Hòa Văn ,tp Đà Nẵng',
        })
    }

    const dataParkinglot = []
    for (let i = 0; i < page; i++) {
        dataParkinglot.push({
            key: i,
            avatar: avatarURL,
            basic_name: 'Phạm Văn Thọ',
            email: 'thopham.21082001@gmail.com',
            phone_number: '0702399134',
            address: 'tổ 3 , thôn Đại La, xã Hòa Sơn,Huyện Hòa Văn ,tp Đà Nẵng',
        })
    }

    const menu = () => {
        return (
            <Menu class="account-list-menu">
                <div className="account-list-menu__item">
                    <div className="account-list-menu__item__row">
                        <span className="account-list-menu__item__row__span">
                            Địa chỉ
                        </span>
                        <select
                            className="account-list-menu__item__row__select"
                            onChange={(e) => setAddressType(e.target.value)}
                        >
                            {addressTypeItem.map((addressType, index) => {
                                return (
                                    <option key={index} value={addressType}>
                                        {addressType}
                                    </option>
                                )
                            })}
                        </select>
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
                        ? 'account-list-content'
                        : 'account-list-content-unactive'
                }
            >
                <div className="title">Danh sách tài khoản</div>

                <div className="account-list-content__swap-page">
                    <button className="button-active">Parking-lot</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(false)}
                    >
                        Basic
                    </button>
                </div>

                <div className="account-list-content__action">
                    <div className="account-list-content__action__select">
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
                                    ? 'account-list-content__action__filter-active'
                                    : 'account-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="account-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="account-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="account-list-content__sub">
                    <Table
                        className="account-list-content__sub__table"
                        columns={columnsBasic}
                        dataSource={dataBasic}
                        pagination={state.pagination}
                        rowClassName={(record, index) => (
                            <Link>
                                <img src={record.avatar} alt="avatar" />
                            </Link>
                        )}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {},
                            }
                        }}
                    ></Table>
                </div>
            </div>

            <div
                className={
                    swapPage
                        ? 'account-list-content-unactive'
                        : 'account-list-content'
                }
            >
                <div className="title">Danh sách tài khoản</div>
                <div className="account-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(true)}
                    >
                        Parking-lot
                    </button>
                    <button className="button-active">Basic</button>
                </div>
                <div className="account-list-content__action">
                    <div className="account-list-content__action__select">
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
                                    ? 'account-list-content__action__filter-active'
                                    : 'account-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="account-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="account-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="account-list-content__sub">
                    <Table
                        className="account-list-content__sub__table"
                        columns={columnsParkinglot}
                        dataSource={dataParkinglot}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {},
                            }
                        }}
                    ></Table>
                    <Modal
                        className="delete-account-modal"
                        title="Hủy User"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p>Bạn có chắn chắn muốn xóa user hay không ?</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Accounts
