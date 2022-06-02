import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import userApi from 'api/userApi'
import * as roles from 'shared/constants/role'
import './account-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

const addressTypeItem = ['All', 'Đà Nẵng', 'Quảng Nam', 'Huế']

function Accounts() {
    const { user } = useAuth()
    const [swapPage, setSwapPage] = useState(true)
    const [addressType, setAddressType] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [parkingLotUserList, setParkingLotUserList] = useState([])
    const [basicUserList, setBasicUserList] = useState([])
    const [total, setTotal] = useState(0)
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
    })

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const onSearch = (value) => console.log(value)

    const state = {
        pagination: {
            pageSize: params.limit,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    limit: pageSize,
                    page: page,
                })
            },
        },
    }

    useEffect(() => {
        if (addressType === 'All') setActiveFilter(false)
        else setActiveFilter(true)
    }, [addressType])

    useEffect(() => {
        if (!!user) {
            userApi.getListByParams(params).then((response) => {
                setTotal(response.data.count)
                setParkingLotUserList(
                    response.data.rows
                        .filter((user) => user.role === roles.PARKING_LOT_USER)
                        .map((user) => ({
                            id: user.id,
                            avatar: user.UserInfo?.avatar,
                            name: user.name,
                            email: user.email,
                            phone_number: user.UserInfo?.phone_number,
                            address: user.UserInfo?.address,
                        })),
                )
                setBasicUserList(
                    response.data.rows
                        .filter((user) => user.role === roles.BASIC_USER)
                        .map((user) => ({
                            id: user.id,
                            avatar: user.UserInfo?.avatar,
                            name: user.name,
                            email: user.email,
                            phone_number: user.UserInfo?.phone_number,
                            address: user.UserInfo?.address,
                        })),
                )
            })
        }
    }, [user, params])

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '5%',
            render: (text, record) => {
                let imgSource = ''
                try {
                    imgSource = process.env.REACT_APP_API_URL + record.avatar
                } catch (error) {
                    imgSource =
                        process.env.REACT_APP_API_URL +
                        'public/images/avatars/user/default-avatar.png'
                }
                return <img src={imgSource} className="avatar-user" alt="" />
            },
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'name',
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
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/profile/${record.id}/edit`}>
                        <EditOutlined className="icon-edit" />
                    </Link>
                    <DeleteOutlined
                        onClick={showModal}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]

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

    return user.role === roles.ADMIN ? (
        <div>
            {/* ------------------------------------------------ TAB PARKING-LOT ------------------------------------------------ */}
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
                            defaultValue={{ value: params.pageSize }}
                            onChange={(e) =>
                                setParams({
                                    limit: e.target.value,
                                    page: params.page,
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
                        columns={columns}
                        dataSource={parkingLotUserList}
                        pagination={state.pagination}
                        rowClassName={'account-list-content__sub__table__row'}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {},
                            }
                        }}
                    ></Table>
                </div>
            </div>

            {/* --------------------------------------------------- TAB BASIC --------------------------------------------------- */}
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
                            defaultValue={{ value: params.pageSize }}
                            onChange={(e) =>
                                setParams({
                                    limit: e.target.value,
                                    page: params.page,
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
                        columns={columns}
                        dataSource={basicUserList}
                        pagination={state.pagination}
                        rowClassName={'account-list-content__sub__table__row'}
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
    ) : (
        <Navigate to="/404" />
    )
}

export default Accounts
