import React, { useState } from 'react'
import { Button, Form, Table, Input, Space, Modal } from 'antd'
import {
    EditOutlined,
    SearchOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import messages from 'assets/lang/messages'
import './setting.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

function Setting() {
    const [limit, setLimit] = useState(10)
    const [swapPage, setSwapPage] = useState(1)
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const [showVehicleModal, setShowVehicleModal] = useState(false)
    const [showPackageModal, setShowPackageModal] = useState(false)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [showFeatureModal, setShowFeatureModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [data, setData] = useState({})

    const state = {
        pagination: {
            pageSize: limit,
        },
    }

    const onSearch = (value) => console.log(value)

    const columnsTransaction = [
        {
            title: 'Tên loại giao dịch',
            dataIndex: 'name',
            width: '85%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setShowTransactionModal(true)
                            setData(record)
                        }}
                        className="icon-edit"
                    />
                    <DeleteOutlined
                        onClick={(e) => {
                            setShowDeleteModal(true)
                            setData(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]
    const columnsVehicle = [
        {
            title: 'Tên loại phương tiện',
            dataIndex: 'name',
            width: '85%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setShowVehicleModal(true)
                            setData(record)
                        }}
                        className="icon-edit"
                    />
                    <DeleteOutlined
                        onClick={(e) => {
                            setShowDeleteModal(true)
                            setData(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]
    const columnsPackage = [
        {
            title: 'Tên loại gói ưu đãi',
            dataIndex: 'name',
            width: '85%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setShowPackageModal(true)
                            setData(record)
                        }}
                        className="icon-edit"
                    />
                    <DeleteOutlined
                        onClick={(e) => {
                            setShowDeleteModal(true)
                            setData(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]
    const columnsFeedback = [
        {
            title: 'Tên loại feedback',
            dataIndex: 'name',
            width: '85%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setShowFeedbackModal(true)
                            setData(record)
                        }}
                        className="icon-edit"
                    />
                    <DeleteOutlined
                        onClick={(e) => {
                            setShowDeleteModal(true)
                            setData(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]
    const columnsFeature = [
        {
            title: 'Tên chức năng',
            dataIndex: 'name',
            width: '85%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setShowFeatureModal(true)
                            setData(record)
                        }}
                        className="icon-edit"
                    />
                    <DeleteOutlined
                        onClick={(e) => {
                            setShowDeleteModal(true)
                            setData(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ]

    const dataTransactionType = []
    for (let i = 0; i < limit; i++) {
        dataTransactionType.push({
            key: i,
            id: i,
            name: 'loại giao dịch 1',
        })
        dataTransactionType.push({
            key: i + 1,
            id: i,
            name: 'loại giao dịch 2',
        })
    }

    const dataVehicleType = []
    for (let i = 0; i < limit; i++) {
        dataVehicleType.push({
            key: i,
            id: i,
            name: 'loại phương tiện 1',
        })
        dataVehicleType.push({
            key: i + 1,
            id: i,
            name: 'loại phương tiện 2',
        })
    }
    const dataPackageType = []
    for (let i = 0; i < limit; i++) {
        dataPackageType.push({
            key: i,
            id: i,
            name: 'loại package 1',
        })
        dataPackageType.push({
            key: i + 1,
            name: 'loại package 2',
        })
    }
    const dataFeedbackType = []
    for (let i = 0; i < limit; i++) {
        dataFeedbackType.push({
            key: i,
            id: i,
            name: 'loại feedback 1',
        })
        dataFeedbackType.push({
            key: i + 1,
            id: i,
            name: 'loại feedback 2',
        })
    }
    const dataFeatureType = []
    for (let i = 0; i < limit; i++) {
        dataFeatureType.push({
            key: i,
            id: i,
            name: 'chức năng 1',
        })
        dataFeatureType.push({
            key: i + 1,
            id: i,
            name: 'chức năng 2',
        })
    }

    return (
        <div>
            <div
                className={
                    swapPage === 1
                        ? 'setting-content'
                        : 'setting-content-unactive'
                }
            >
                <div className="title">Danh sách loại giao dịch</div>

                <div className="setting-content__swap-page">
                    <button className="button-active">Loại giao dịch</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(2)}
                    >
                        Loại phương tiện
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(3)}
                    >
                        Loại gói ưu đãi
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(4)}
                    >
                        Loại feedback
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(5)}
                    >
                        Chức năng
                    </button>
                </div>

                <div className="setting-content__action">
                    <div className="setting-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: limit }}
                            onChange={(e) => setLimit(e.target.value)}
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

                    <div className="setting-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__action__add"
                        onClick={() => setShowTransactionModal(true)}
                    >
                        <PlusCircleOutlined className="setting-content__action__add__icon" />

                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__sub">
                    <Table
                        className="setting-content__sub__table"
                        columns={columnsTransaction}
                        dataSource={dataTransactionType}
                        pagination={state.pagination}
                    />

                    <Modal
                        className="modal"
                        title={
                            data.name === ''
                                ? 'Thêm loại giao dịch'
                                : 'Chỉnh sửa loại giao dịch'
                        }
                        visible={showTransactionModal}
                        onCancel={() => {
                            setShowTransactionModal(false)
                            setData({
                                key: '',
                                id: '',
                                name: '',
                            })
                        }}
                        footer={null}
                    >
                        <Form
                            className="modal__form"
                            name="form"
                            fields={[
                                {
                                    name: 'name',
                                    value: data.name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">Tên loại giao dịch</span>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>
                            </div>
                            <div className="modal__form__button">
                                <button
                                    className="button-gray"
                                    onClick={(e) => {
                                        setShowTransactionModal(false)
                                        setData({
                                            key: '',
                                            id: '',
                                            name: '',
                                        })
                                    }}
                                >
                                    Thoát
                                </button>
                                <button className="button-green">Lưu</button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* vi tri thu 2  */}

            <div
                className={
                    swapPage === 2
                        ? 'setting-content'
                        : 'setting-content-unactive'
                }
            >
                <div className="title">Danh sách loại phương tiện</div>
                <div className="setting-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(1)}
                    >
                        Loại giao dịch
                    </button>
                    <button className="button-active">Loại phương tiện</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(3)}
                    >
                        Loại gói ưu đãi
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(4)}
                    >
                        Loại feedback
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(5)}
                    >
                        Chức năng
                    </button>
                </div>
                <div className="setting-content__action">
                    <div className="setting-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: limit }}
                            onChange={(e) => setLimit(e.target.value)}
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

                    <div className="setting-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__action__add"
                        onClick={() => setShowVehicleModal(true)}
                    >
                        <PlusCircleOutlined className="setting-content__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__sub">
                    <Table
                        className="setting-content__sub__table"
                        columns={columnsVehicle}
                        dataSource={dataVehicleType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            data.name === ''
                                ? 'Thêm loại phương tiện'
                                : 'Chỉnh sửa loại phương tiện'
                        }
                        visible={showVehicleModal}
                        onCancel={() => {
                            setShowVehicleModal(false)
                            setData({
                                key: '',
                                id: '',
                                name: '',
                            })
                        }}
                        footer={null}
                    >
                        <Form
                            className="modal__form"
                            name="form"
                            fields={[
                                {
                                    name: 'name',
                                    value: data.name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">
                                    Tên loại phương tiện
                                </span>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>
                            </div>
                            <div className="modal__form__button">
                                <button
                                    className="button-gray"
                                    onClick={(e) => {
                                        setShowVehicleModal(false)
                                        setData({
                                            key: '',
                                            id: '',
                                            name: '',
                                        })
                                    }}
                                >
                                    Thoát
                                </button>
                                <button className="button-green">Lưu</button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            <div
                className={
                    swapPage === 3
                        ? 'setting-content'
                        : 'setting-content-unactive'
                }
            >
                <div className="title">Danh sách loại gói ưu đãi</div>

                <div className="setting-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(1)}
                    >
                        Loại giao dịch
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(2)}
                    >
                        Loại phương tiện
                    </button>
                    <button className="button-active">Loại gói ưu đãi</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(4)}
                    >
                        Loại feedback
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(5)}
                    >
                        Chức năng
                    </button>
                </div>

                <div className="setting-content__action">
                    <div className="setting-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: limit }}
                            onChange={(e) => setLimit(e.target.value)}
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

                    <div className="setting-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__action__add"
                        onClick={() => setShowPackageModal(true)}
                    >
                        <PlusCircleOutlined className="setting-content__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__sub">
                    <Table
                        className="setting-content__sub__table"
                        columns={columnsPackage}
                        dataSource={dataPackageType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            data.name === ''
                                ? 'Thêm loại gói ưu đãi'
                                : 'Chỉnh sửa loại gói ưu đãi'
                        }
                        visible={showPackageModal}
                        onCancel={() => {
                            setShowPackageModal(false)
                            setData({
                                key: '',
                                id: '',
                                name: '',
                            })
                        }}
                        footer={null}
                    >
                        <Form
                            className="modal__form"
                            name="form"
                            fields={[
                                {
                                    name: 'name',
                                    value: data.name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">
                                    Tên loại gói ưu đãi
                                </span>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>
                            </div>
                            <div className="modal__form__button">
                                <button
                                    className="button-gray"
                                    onClick={(e) => {
                                        setShowPackageModal(false)
                                        setData({
                                            key: '',
                                            id: '',
                                            name: '',
                                        })
                                    }}
                                >
                                    Thoát
                                </button>
                                <button className="button-green">Lưu</button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
            {/* ket thuc vi tri thu 3, vi tri thu 4 */}
            <div
                className={
                    swapPage === 4
                        ? 'setting-content'
                        : 'setting-content-unactive'
                }
            >
                <div className="title">Danh sách loại feedback</div>

                <div className="setting-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(1)}
                    >
                        Loại giao dịch
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(2)}
                    >
                        Loại phương tiện
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(3)}
                    >
                        Loại gói ưu đãi
                    </button>
                    <button className="button-active">Loại feedback</button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(5)}
                    >
                        Chức năng
                    </button>
                </div>

                <div className="setting-content__action">
                    <div className="setting-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: limit }}
                            onChange={(e) => setLimit(e.target.value)}
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

                    <div className="setting-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__action__add"
                        onClick={() => setShowFeedbackModal(true)}
                    >
                        <PlusCircleOutlined className="setting-content__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__sub">
                    <Table
                        className="setting-content__sub__table"
                        columns={columnsFeedback}
                        dataSource={dataFeedbackType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            data.name === ''
                                ? 'Thêm loại phương tiện'
                                : 'Chỉnh sửa loại phương tiện'
                        }
                        visible={showFeedbackModal}
                        onCancel={() => {
                            setShowFeedbackModal(false)
                            setData({
                                key: '',
                                id: '',
                                name: '',
                            })
                        }}
                        footer={null}
                    >
                        <Form
                            className="modal__form"
                            name="form"
                            fields={[
                                {
                                    name: 'name',
                                    value: data.name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">Tên loại feedback</span>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>
                            </div>
                            <div className="modal__form__button">
                                <button
                                    className="button-gray"
                                    onClick={(e) => {
                                        setShowFeedbackModal(false)
                                        setData({
                                            key: '',
                                            id: '',
                                            name: '',
                                        })
                                    }}
                                >
                                    Thoát
                                </button>
                                <button className="button-green">Lưu</button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* vi tri thu 5 */}
            <div
                className={
                    swapPage === 5
                        ? 'setting-content'
                        : 'setting-content-unactive'
                }
            >
                <div className="title">Danh sách chức năng</div>

                <div className="setting-content__swap-page">
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(1)}
                    >
                        Loại giao dịch
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(2)}
                    >
                        Loại phương tiện
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(3)}
                    >
                        Loại gói ưu đãi
                    </button>
                    <button
                        className="button-unactive"
                        onClick={(e) => setSwapPage(4)}
                    >
                        Loại feedback
                    </button>
                    <button className="button-active">Chức năng</button>
                </div>

                <div className="setting-content__action">
                    <div className="setting-content__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: limit }}
                            onChange={(e) => setLimit(e.target.value)}
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

                    <div className="setting-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Tìm kiếm"
                            onSearch={onSearch}
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__action__add"
                        onClick={() => setShowFeatureModal(true)}
                    >
                        <PlusCircleOutlined className="setting-content__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__sub">
                    <Table
                        className="setting-content__sub__table"
                        columns={columnsFeature}
                        dataSource={dataFeatureType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            data.name === ''
                                ? 'Thêm chức năng'
                                : 'Chỉnh sửa chức năng'
                        }
                        visible={showFeatureModal}
                        onCancel={() => {
                            setShowFeatureModal(false)
                            setData({
                                key: '',
                                id: '',
                                name: '',
                            })
                        }}
                        footer={null}
                    >
                        <Form
                            className="modal__form"
                            name="form"
                            fields={[
                                {
                                    name: 'name',
                                    value: data.name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">Tên chức năng</span>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>
                            </div>
                            <div className="modal__form__button">
                                <button
                                    className="button-gray"
                                    onClick={(e) => {
                                        setShowFeatureModal(false)
                                        setData({
                                            key: '',
                                            id: '',
                                            name: '',
                                        })
                                    }}
                                >
                                    Thoát
                                </button>
                                <button className="button-green">Lưu</button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            <Modal
                className="modal"
                title={
                    swapPage === 1
                        ? 'Xóa loại giao dịch'
                        : swapPage === 2
                        ? 'Xóa loại phương tiện'
                        : swapPage === 3
                        ? 'Xóa loại gói ưu đãi'
                        : swapPage === 4
                        ? 'Xóa loại feedback'
                        : swapPage === 5
                        ? 'Xóa chức năng'
                        : null
                }
                visible={showDeleteModal}
                onCancel={() => {
                    setShowDeleteModal(false)
                    setData({
                        key: '',
                        id: '',
                        name: '',
                    })
                }}
                footer={null}
            >
                <Form
                    className="modal__form"
                    name="form"
                    fields={[
                        {
                            id: 'id',
                            value: data.id,
                        },
                    ]}
                >
                    {swapPage === 1 ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại giao dịch này không?
                        </p>
                    ) : swapPage === 2 ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại phương tiện này
                            không?
                        </p>
                    ) : swapPage === 3 ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại gói ưu đãi này không?
                        </p>
                    ) : swapPage === 4 ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại feedback này không?
                        </p>
                    ) : swapPage === 5 ? (
                        <p>Bạn có chắn chắn muốn xóa chức năng này không?</p>
                    ) : null}
                    <div className="modal__form__button">
                        <button
                            className="button-gray"
                            onClick={(e) => {
                                setShowDeleteModal(false)
                                setData({
                                    key: '',
                                    id: '',
                                })
                            }}
                        >
                            Thoát
                        </button>
                        <button className="button-green">Lưu</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Setting
