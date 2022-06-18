import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Input, Menu, Dropdown } from 'antd'
import {
    PlusCircleOutlined,
    SearchOutlined,
    FilterOutlined,
} from '@ant-design/icons'
import NotFound from 'views/pages/404-not-found'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import * as verifyStates from 'shared/constants/verifyState'
import * as openStates from 'shared/constants/openState'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import parkingLotApi from 'api/parkingLotApi'

import './parking-lot-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'name',
        width: '15%',
    },
    {
        title: 'Chủ sở hữu',
        dataIndex: 'owner_name',
        width: '15%',
    },
    {
        title: 'Thời gian mở',
        dataIndex: 'time_slot',
        width: '13%',
    },
    {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        width: '10%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'is_open',
        width: '10%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
]

function ParkingLots() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [parkingLotList, setParkingLotList] = useState([])
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
        txt_search: null,
        is_open: null,
        is_full: 0,
    })

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
        if (!!user) {
            user.role === roles.PARKING_LOT_USER
                ? parkingLotApi.getListByUserId(user.id).then((response) => {
                      setParkingLotList(response.data.rows)
                  })
                : parkingLotApi.getListByParams(params).then((response) => {
                      setTotal(response.data.count)
                      setParkingLotList(
                          response.data.rows.map((parkingLot) => ({
                              id: parkingLot.id,
                              name: parkingLot.name,
                              owner_name: parkingLot.Owner.name,
                              capacity: parkingLot.capacity,
                              time_slot: parkingLot.time_slot,
                              is_open: parkingLot.is_open
                                  ? parkingLot.is_full
                                      ? openStates.FULL
                                      : openStates.OPENING
                                  : openStates.CLOSED,
                              address: parkingLot.address,
                          })),
                      )
                  })
        }
    }, [user, params])

    const menu = () => {
        return (
            <Menu class="parking-lot-menu">
                <div className="parking-lot-menu__item">
                    <div className="parking-lot-menu__item__row">
                        <span className="parking-lot-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="parking-lot-menu__item__row__select"
                            onChange={(e) => {
                                switch (e.target.value) {
                                    case openStates.OPENING:
                                        setParams({
                                            ...params,
                                            is_open: 1,
                                            is_full: null,
                                        })
                                        break
                                    case openStates.CLOSED:
                                        setParams({
                                            ...params,
                                            is_open: 0,
                                            is_full: null,
                                        })
                                        break
                                    case openStates.FULL:
                                        setParams({
                                            ...params,
                                            is_open: null,
                                            is_full: 1,
                                        })
                                        break
                                    default:
                                        setParams({
                                            ...params,
                                            is_open: null,
                                            is_full: null,
                                        })
                                        break
                                }
                            }}
                        >
                            <option key={1} value="All">
                                All
                            </option>
                            <option key={2} value={openStates.OPENING}>
                                {openStates.OPENING}
                            </option>
                            <option key={3} value={openStates.CLOSED}>
                                {openStates.CLOSED}
                            </option>
                            <option key={4} value={openStates.FULL}>
                                {openStates.FULL}
                            </option>
                        </select>
                    </div>
                </div>
            </Menu>
        )
    }

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.PARKING_LOT_AVATAR
    }

    return user.role === roles.PARKING_USER ? (
        //-------------------------------- Parking User --------------------------------------
        <div className="parking-lot-list-content">
            <div className="title">Danh sách bãi đỗ xe</div>
            <div className="parking-lot-list-content__action">
                <div className="parking-lot-list-content__action__select">
                    <span>Hiển thị </span>
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
                            params.is_full || params.is_open !== null
                                ? 'parking-lot-list-content__action__filter-active'
                                : 'parking-lot-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

                <div className="parking-lot-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tên bãi đỗ xe, chủ sở hữu, địa chỉ"
                        onChange={(e) =>
                            setParams({ ...params, txt_search: e.target.value })
                        }
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="parking-lot-list-content__action__search__icon" />
                </div>
            </div>

            <div className="parking-lot-list-content__sub">
                <Table
                    className="parking-lot-list-content__sub__table"
                    columns={columns}
                    dataSource={parkingLotList}
                    pagination={state.pagination}
                    rowClassName={(record, index) => {
                        switch (record.is_open) {
                            case openStates.OPENING:
                                return 'parking-lot-list-content__sub__table__row-green'
                            case openStates.FULL:
                                return 'parking-lot-list-content__sub__table__row-orange'
                            case openStates.CLOSED:
                                return 'parking-lot-list-content__sub__table__row-red'
                            default:
                                break
                        }
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () =>
                                navigate(`/parking-lots/${record.id}`),
                        }
                    }}
                />
            </div>
        </div>
    ) : //-------------------------------- Parking-lot User ----------------------------------
    user.role === roles.PARKING_LOT_USER ? (
        <div className="parking-lot-list-container">
            <div className="parking-lot-list-container__button-add">
                <Link to="/parking-lots/add">
                    <button>
                        Đăng ký
                        <PlusCircleOutlined className="icon" />
                    </button>
                </Link>
            </div>
            <div className="parking-lot-list-container__content">
                {parkingLotList?.map((parkingLot) => (
                    <div
                        className="parking-lot-list-container__content__sub"
                        onClick={() =>
                            navigate(`/parking-lots/${parkingLot.id}`)
                        }
                    >
                        <div className="parking-lot-list-container__content__item">
                            <img
                                className="parking-lot-list-container__content__item__image"
                                src={
                                    process.env.REACT_APP_API_URL +
                                    parkingLot.avatar
                                }
                                alt=""
                                onError={handleGetImageError}
                            />
                            <div className="parking-lot-list-container__content__item__info">
                                <div>
                                    <span className="span1">Tên nhà xe</span>
                                    <span className="span2">
                                        {parkingLot.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Thời gian mở</span>
                                    <span className="span2">
                                        {parkingLot.time_slot}
                                    </span>
                                </div>

                                <div>
                                    <span className="span1">Sức chứa</span>
                                    <span className="span2">
                                        {parkingLot.capacity}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Tình trạng</span>
                                    <span
                                        className={
                                            parkingLot.is_open
                                                ? parkingLot.is_full
                                                    ? 'span2-orange'
                                                    : 'span2-green'
                                                : 'span2-red'
                                        }
                                    >
                                        {parkingLot.is_open
                                            ? parkingLot.is_full
                                                ? openStates.FULL
                                                : openStates.OPENING
                                            : openStates.CLOSED}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Xác thực</span>
                                    <span
                                        className={
                                            parkingLot.VerifyState.state ===
                                            verifyStates.VERIFIED
                                                ? 'span2-green'
                                                : parkingLot.VerifyState
                                                      .state ===
                                                  verifyStates.PENDING
                                                ? 'span2-orange'
                                                : 'span2-red'
                                        }
                                    >
                                        {parkingLot.VerifyState.state}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Địa chỉ</span>
                                    <span className="span2">
                                        {parkingLot.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        //------------------------------------ Admin --------------------------------------
        <NotFound />
    )
}

export default ParkingLots
