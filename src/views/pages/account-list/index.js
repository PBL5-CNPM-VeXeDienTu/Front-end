import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import userApi from 'api/userApi'
import * as roles from 'shared/constants/role'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './account-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

const addressTypeItem = ['All', 'Đà Nẵng', 'Quảng Nam', 'Huế']

function Accounts() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [addressType, setAddressType] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
    const [userList, setUserList] = useState([])
    const [deleteUser, setDeleteUser] = useState()
    const [total, setTotal] = useState(0)
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
        role: 1,
    })

    const handleCancel = () => {
        setShowDeleteUserModal(false)
    }

    const handleSubmit = async () => {
        try {
            const response = await userApi.softDeleteById(deleteUser.id)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const onSearch = (value) => console.log(value)

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.USER_AVATAR
    }

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
        if (addressType === 'All') setActiveFilter(false)
        else setActiveFilter(true)
    }, [addressType])

    useEffect(() => {
        if (!!user) {
            userApi.getListByParams(params).then((response) => {
                setTotal(response.data.count)
                setUserList(
                    response.data.rows.map((user) => ({
                        id: user.id,
                        role: user.role,
                        avatar: user.UserInfo?.avatar,
                        name: user.name,
                        email: user.email,
                        phone_number: user.UserInfo?.phone_number,
                        address: user.UserInfo?.address,
                        deletedAt: user.deletedAt ? 'Đã xóa' : 'Chưa xóa',
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
            width: '10%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '35%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'deletedAt',
            width: '15%',
            render: (text, record) => (
                <span
                    className={
                        record.deletedAt === 'Đã xóa'
                            ? 'span-red'
                            : 'span-green'
                    }
                >
                    {record.deletedAt}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '5%',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/profile/${record.id}/edit`}>
                        <EditOutlined className="icon-edit" />
                    </Link>
                    <DeleteOutlined
                        onClick={() => {
                            setShowDeleteUserModal(true)
                            setDeleteUser(record)
                        }}
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
            {/* --------------------------------------------------- TAB BASIC --------------------------------------------------- */}
            <div
                className={
                    params.role === 1
                        ? 'account-list-content'
                        : 'account-list-content-unactive'
                }
            >
                <div className="title">Danh sách tài khoản</div>

                <div className="account-list-content__swap-page">
                    <button className="button-active">Basic User</button>
                    <button
                        className="button-unactive"
                        onClick={() => setParams({ ...params, role: 2 })}
                    >
                        Parking-lot User
                    </button>
                    <button
                        className="button-unactive"
                        onClick={() => setParams({ ...params, role: 3 })}
                    >
                        Admin
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
                    <Link
                        className="account-list-content__action__add"
                        to="/accounts/add"
                    >
                        <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                        <span>Thêm User</span>
                    </Link>
                </div>

                <div className="account-list-content__sub">
                    <Table
                        className="account-list-content__sub__table"
                        columns={columns}
                        dataSource={userList}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/profile/${record.id}`)
                                },
                            }
                        }}
                    ></Table>
                </div>
            </div>

            {/* ------------------------------------------------ TAB PARKING-LOT ------------------------------------------------ */}
            <div
                className={
                    params.role === 2
                        ? 'account-list-content'
                        : 'account-list-content-unactive'
                }
            >
                <div className="title">Danh sách tài khoản</div>
                <div className="account-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={() => setParams({ ...params, role: 1 })}
                    >
                        Basic User
                    </button>
                    <button className="button-active">Parking-lot User</button>
                    <button
                        className="button-unactive"
                        onClick={() => setParams({ ...params, role: 3 })}
                    >
                        Admin
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
                    <Link
                        className="account-list-content__action__add"
                        to="/accounts/add"
                    >
                        <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                        <span>Thêm User</span>
                    </Link>
                </div>

                <div className="account-list-content__sub">
                    <Table
                        className="account-list-content__sub__table"
                        columns={columns}
                        dataSource={userList}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/profile/${record.id}`)
                                },
                            }
                        }}
                    ></Table>
                </div>
            </div>

            {/* --------------------------------------------------- TAB ADMIN -------------------------------------------------- */}
            <div
                className={
                    params.role === 3
                        ? 'account-list-content'
                        : 'account-list-content-unactive'
                }
            >
                <div className="title">Danh sách tài khoản</div>
                <div className="account-list-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={() => setParams({ ...params, role: 1 })}
                    >
                        Basic User
                    </button>
                    <button
                        className="button-unactive"
                        onClick={() => setParams({ ...params, role: 2 })}
                    >
                        Parking-lot User
                    </button>
                    <button className="button-active">Admin</button>
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
                    <Link
                        className="account-list-content__action__add"
                        to="/accounts/add"
                    >
                        <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                        <span>Thêm User</span>
                    </Link>
                </div>

                <div className="account-list-content__sub">
                    <Table
                        className="account-list-content__sub__table"
                        columns={columns}
                        dataSource={userList}
                        pagination={state.pagination}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/profile/${record.id}`)
                                },
                            }
                        }}
                    ></Table>
                </div>
            </div>

            <Modal
                className="delete-account-modal"
                title="Xóa người dùng"
                visible={showDeleteUserModal}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <p>Bạn có chắn chắn muốn xóa người dùng hay không ?</p>
            </Modal>
        </div>
    ) : (
        <Navigate to="/404" />
    )
}

export default Accounts
