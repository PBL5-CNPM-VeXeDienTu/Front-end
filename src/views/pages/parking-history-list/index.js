import React, { useState, useEffect } from 'react'
import { Table, Input, Menu, Dropdown, Modal, Form, DatePicker } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import parkingHistoryApi from 'api/parkingHistoryApi'
import * as roles from 'shared/constants/role'

import './parking-history-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Biển số xe',
        dataIndex: 'license_plate',
        width: '15%',
    },
    {
        title: 'Tên bãi đỗ xe',
        dataIndex: 'parking_lot_name',
        width: '25%',
    },
    {
        title: 'Thời gian checkin',
        dataIndex: 'checkin_time',
        width: '18%',
    },
    {
        title: 'Thời gian checkout',
        dataIndex: 'checkout_time',
        width: '18%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'state',
        width: '14%',
        render: (text, record) => (
            <span className={record.state ? 'span-green' : 'span-gray-italic'}>
                {record.state ? 'Đang đỗ' : 'Đã checkout'}
            </span>
        ),
    },
    {
        title: 'Phí đỗ xe (VND)',
        dataIndex: 'cost',
        width: '10%',
    },
]

function ParkingHistories() {
    const { user } = useAuth()
    const [page, setPage] = useState(10)
    const [parkingHistoryList, setParkingHistoryList] = useState([])
    const [parkingHistory, setParkingHistory] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [total, setTotal] = useState(0)
    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        is_parking: null,
        checkin_from_date: null,
        checkin_to_date: null,
        checkout_from_date: null,
        checkout_to_date: null,
    }
    const [params, setParams] = useState(defaultParams)

    const onClickRow = (value) => {
        setParkingHistory(value)
        setShowModal(true)
    }

    const handleSubmit = async (values) => {
        try {
            const updateParkingHistory = { memo: values.memo }
            const response = await parkingHistoryApi.updateById(
                parkingHistory.id,
                updateParkingHistory,
            )
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        if (!!user) {
            parkingHistoryApi
                .getListByParkingLotUserId(user.id, params)
                .then((response) => {
                    setTotal(response.data.count)
                    setParkingHistoryList(
                        response.data.rows.map((parkingHistory) => ({
                            key: parkingHistory.id,
                            id: parkingHistory.id,
                            license_plate:
                                parkingHistory.Vehicle?.license_plate,
                            parking_lot_name: parkingHistory.ParkingLot?.name,
                            checkin_time: parkingHistory.checkin_time,
                            checkout_time: parkingHistory.checkout_time,
                            state: parkingHistory.is_parking,
                            cost: parkingHistory.cost,
                            memo: parkingHistory.memo,
                        })),
                    )
                })
        }
    }, [user, params])

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

    const menu = () => {
        return (
            <Menu class="history-list-menu">
                <div className="history-list-menu__item">
                    <span className="history-list-menu__item__span">
                        Trạng thái
                    </span>
                    <select
                        className="history-list-menu__item__select"
                        onChange={(e) => {
                            e.target.value === 'All'
                                ? setParams({ ...params, is_parking: null })
                                : setParams({
                                      ...params,
                                      is_parking: parseInt(e.target.value),
                                  })
                        }}
                    >
                        <option key={1} value={'All'}>
                            All
                        </option>
                        <option key={3} value={0}>
                            Đã chechout
                        </option>
                        <option key={2} value={1}>
                            Đang đỗ
                        </option>
                    </select>
                </div>
                <div className="border-bottom">Checkin</div>
                <div className="history-list-menu__item">
                    <span className="history-list-menu__item__span padding-left">
                        Từ ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                checkin_from_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="history-list-menu__item">
                    <span className="history-list-menu__item__span padding-left">
                        Đến ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                checkin_to_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="border-bottom">Checkout</div>
                <div className="history-list-menu__item">
                    <span className="history-list-menu__item__span padding-left">
                        Từ ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                checkout_from_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="history-list-menu__item">
                    <span className="history-list-menu__item__span padding-left">
                        Đến ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                checkout_to_date: dateString,
                            })
                        }
                    />
                </div>
            </Menu>
        )
    }

    return (
        <div className="history-list-content">
            <div className="title">Lịch sử gửi xe</div>
            <div className="history-list-content__action">
                <div className="history-list-content__action__select">
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
                            params.is_parking !== null ||
                            (params.checkin_from_date !== null &&
                                params.checkin_from_date !== '') ||
                            (params.checkin_to_date !== null &&
                                params.checkin_to_date !== '') ||
                            (params.checkout_from_date !== null &&
                                params.checkout_from_date !== '') ||
                            (params.checkout_to_date !== null &&
                                params.checkout_to_date !== '')
                                ? 'history-list-content__action__filter-active'
                                : 'history-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

                <div className="history-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tên bãi đỗ xe, biển số xe"
                        onChange={(e) =>
                            setParams({ ...params, txt_search: e.target.value })
                        }
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="history-list-content__action__search__icon" />
                </div>
            </div>

            <div className="history-list-content__sub">
                <Table
                    className="history-list-content__sub__table"
                    columns={columns}
                    dataSource={parkingHistoryList}
                    pagination={state.pagination}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                user.role === roles.PARKING_USER
                                    ? onClickRow(record)
                                    : setParkingHistory(null)
                            },
                        }
                    }}
                />
                <Modal
                    className="parking-history-modal"
                    visible={showModal}
                    onCancel={() => setShowModal(false)}
                    footer={null}
                >
                    <h1 className="title">Thông tin lịch sử gửi xe</h1>
                    <Form
                        className="parking-history-modal__sub"
                        fields={[
                            {
                                name: ['parking_lot_name'],
                                value: parkingHistory.parking_lot_name,
                            },
                            {
                                name: ['license_plate'],
                                value: parkingHistory.license_plate,
                            },
                            {
                                name: ['checkin_time'],
                                value: parkingHistory.checkin_time,
                            },
                            {
                                name: ['checkout_time'],
                                value: parkingHistory.checkout_time,
                            },
                            {
                                name: ['state'],
                                value: parkingHistory.state
                                    ? 'Đang đỗ'
                                    : 'Đã checkout',
                            },
                            {
                                name: ['memo'],
                                value: parkingHistory.memo,
                            },
                            {
                                name: ['cost'],
                                value: parkingHistory.cost,
                            },
                        ]}
                    >
                        <div className="parking-history-modal__sub__info">
                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Tên bãi đỗ xe</span>
                                <Form.Item
                                    name="parking_lot_name"
                                    className="form-item"
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Biển số xe</span>
                                <Form.Item
                                    name="license_plate"
                                    className="form-item"
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Thời gian checkin</span>
                                <Form.Item
                                    name="checkin_time"
                                    className="form-item"
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Thời gian checkout</span>
                                <Form.Item
                                    name="checkout_time"
                                    className="form-item"
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Trạng thái</span>
                                <Form.Item name="state" className="form-item">
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Phí đỗ xe (VND)</span>
                                <Form.Item name="cost" className="form-item">
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="parking-history-modal__sub__info__item">
                                <span className="span">Ghi chú</span>
                                <Form.Item name="memo" className="form-item">
                                    <Input.TextArea
                                        className="textarea"
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="parking-history-modal__sub__button">
                            <button
                                className="button-gray"
                                onClick={() => setShowModal(false)}
                            >
                                Thoát
                            </button>
                            <button
                                className="button-green"
                                type="primary"
                                htmlType="submit"
                                onClick={handleSubmit}
                            >
                                Lưu
                            </button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default ParkingHistories
