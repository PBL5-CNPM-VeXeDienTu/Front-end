import React, { useEffect, useState } from 'react'
import {
    Button,
    Form,
    Table,
    Input,
    Space,
    Modal,
    Dropdown,
    Menu,
    DatePicker,
} from 'antd'
import {
    EditOutlined,
    SearchOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    FilterOutlined,
} from '@ant-design/icons'
import transactionTypeApi from 'api/transactionTypeApi'
import vehicleTypeApi from 'api/vehicleTypeApi'
import packageTypeApi from 'api/packageTypeApi'
import feedbackTypeApi from 'api/feedbackTypeApi'
import featureApi from 'api/featureApi'
import messages from 'assets/lang/messages'
import './setting.scss'

const TAB_TRANSACTION_TYPE = 'Loại giao dịch'
const TAB_VEHICLE_TYPE = 'Loại phương tiện'
const TAB_PACKAGE_TYPE = 'Loại gói ưu đãi'
const TAB_FEEDBACK_TYPE = 'Loại feedback'
const TAB_FEATURE = 'Chức năng'

const { Search } = Input
const numOfItem = [10, 15, 25]

function Setting() {
    const [isEdit, setIsEdit] = useState(false)
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const [showVehicleModal, setShowVehicleModal] = useState(false)
    const [showPackageModal, setShowPackageModal] = useState(false)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [showFeatureModal, setShowFeatureModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [transactionType, setTransactionType] = useState()
    const [vehicleType, setVehicleType] = useState()
    const [packageType, setPackageType] = useState()
    const [feedbackType, setFeedbackType] = useState()
    const [features, setFeatures] = useState()
    const [data, setData] = useState({})
    const [total, setTotal] = useState(0)
    const [tabActive, setTabActive] = useState(TAB_TRANSACTION_TYPE)
    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        type_id: null,
        vehicle_type_id: null,
        created_from_date: null,
        created_to_date: null,
        updated_from_date: null,
        updated_to_date: null,
    }
    const [params, setParams] = useState(defaultParams)

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
        switch (tabActive) {
            case TAB_TRANSACTION_TYPE:
                transactionTypeApi.getAll(params).then((response) => {
                    setTotal(response.data.count)
                    setTransactionType(
                        response.data.rows.map((transaction) => ({
                            id: transaction.id,
                            createdAt: transaction.createdAt,
                            type_name: transaction.type_name,
                            updatedAt: transaction.updatedAt,
                        })),
                    )
                })
                break
            case TAB_VEHICLE_TYPE:
                vehicleTypeApi.getAll(params).then((response) => {
                    setTotal(response.data.count)
                    setVehicleType(
                        response.data.rows.map((vehicleType) => ({
                            id: vehicleType.id,
                            createdAt: vehicleType.createdAt,
                            type_name: vehicleType.type_name,
                            updatedAt: vehicleType.updatedAt,
                        })),
                    )
                })
                break
            case TAB_PACKAGE_TYPE:
                packageTypeApi.getAll(params).then((response) => {
                    setTotal(response.data.count)
                    setPackageType(
                        response.data.rows.map((packageType) => ({
                            id: packageType.id,
                            createdAt: packageType.createdAt,
                            type_name: packageType.type_name,
                            updatedAt: packageType.updatedAt,
                        })),
                    )
                })
                break
            case TAB_FEEDBACK_TYPE:
                feedbackTypeApi.getAll(params).then((response) => {
                    setTotal(response.data.count)
                    setFeedbackType(
                        response.data.rows.map((feedbackType) => ({
                            id: feedbackType.id,
                            createdAt: feedbackType.createdAt,
                            type_name: feedbackType.type_name,
                            updatedAt: feedbackType.updatedAt,
                        })),
                    )
                })
                break
            case TAB_FEATURE:
                featureApi.getAll(params).then((response) => {
                    setTotal(response.data.count)
                    setFeatures(
                        response.data.rows.map((featureType) => ({
                            id: featureType.id,
                            createdAt: featureType.createdAt,
                            name: featureType.name,
                            updatedAt: featureType.updatedAt,
                        })),
                    )
                })
                break
            default:
                break
        }
    }, [tabActive, params])

    const menu = () => {
        return (
            <Menu class="setting-menu">
                <div className="border-bottom">Thời điểm tạo</div>
                <div className="setting-menu__item">
                    <span className="setting-menu__item__span padding-left">
                        Từ ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                created_from_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="setting-menu__item">
                    <span className="setting-menu__item__span padding-left">
                        Đến ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                created_to_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="border-bottom">Thời điểm cập nhật</div>
                <div className="setting-menu__item">
                    <span className="setting-menu__item__span padding-left">
                        Từ ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                updated_from_date: dateString,
                            })
                        }
                    />
                </div>
                <div className="setting-menu__item">
                    <span className="setting-menu__item__span padding-left">
                        Đến ngày :
                    </span>
                    <DatePicker
                        className="input"
                        size="medium"
                        onChange={(date, dateString) =>
                            setParams({
                                ...params,
                                updated_to_date: dateString,
                            })
                        }
                    />
                </div>
            </Menu>
        )
    }

    useEffect(() => {
        switch (tabActive) {
            case TAB_TRANSACTION_TYPE:
                transactionTypeApi.getAll().then((response) => {
                    setTransactionType(
                        response.data.rows.map((transaction) => ({
                            id: transaction.id,
                            createdAt: transaction.createdAt,
                            type_name: transaction.type_name,
                            updatedAt: transaction.updatedAt,
                        })),
                    )
                })
                break
            case TAB_VEHICLE_TYPE:
                vehicleTypeApi.getAll().then((response) => {
                    setVehicleType(
                        response.data.rows.map((vehicleType) => ({
                            id: vehicleType.id,
                            createdAt: vehicleType.createdAt,
                            type_name: vehicleType.type_name,
                            updatedAt: vehicleType.updatedAt,
                        })),
                    )
                })
                break
            case TAB_PACKAGE_TYPE:
                packageTypeApi.getAll().then((response) => {
                    setPackageType(
                        response.data.rows.map((packageType) => ({
                            id: packageType.id,
                            createdAt: packageType.createdAt,
                            type_name: packageType.type_name,
                            updatedAt: packageType.updatedAt,
                        })),
                    )
                })
                break
            case TAB_FEEDBACK_TYPE:
                feedbackTypeApi.getAll().then((response) => {
                    setFeedbackType(
                        response.data.rows.map((feedbackType) => ({
                            id: feedbackType.id,
                            createdAt: feedbackType.createdAt,
                            type_name: feedbackType.type_name,
                            updatedAt: feedbackType.updatedAt,
                        })),
                    )
                })
                break
            case TAB_FEATURE:
                featureApi.getAll().then((response) => {
                    setFeatures(
                        response.data.rows.map((featureType) => ({
                            id: featureType.id,
                            createdAt: featureType.createdAt,
                            name: featureType.name,
                            updatedAt: featureType.updatedAt,
                        })),
                    )
                })
                break
            default:
                break
        }
    }, [tabActive])

    const columnsTransaction = [
        {
            title: 'Tên loại giao dịch',
            dataIndex: 'type_name',
            width: '45%',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            width: '20%',
        },
        {
            title: 'Thời gian update',
            dataIndex: 'updatedAt',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setIsEdit(true)
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
            dataIndex: 'type_name',
            width: '45%',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            width: '20%',
        },
        {
            title: 'Thời gian update',
            dataIndex: 'updatedAt',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setIsEdit(true)
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
            dataIndex: 'type_name',
            width: '45%',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            width: '20%',
        },
        {
            title: 'Thời gian update',
            dataIndex: 'updatedAt',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setIsEdit(true)
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
            dataIndex: 'type_name',
            width: '45%',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            width: '20%',
        },
        {
            title: 'Thời gian update',
            dataIndex: 'updatedAt',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setIsEdit(true)
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
            width: '45%',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            width: '20%',
        },
        {
            title: 'Thời gian update',
            dataIndex: 'updatedAt',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={(e) => {
                            setIsEdit(true)
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

    const handleEditTransactionSubmit = async (values) => {
        try {
            const response = await transactionTypeApi.updateById(
                data.id,
                values,
            )
            alert(response.data.message)
            setShowTransactionModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleAddTransactionSubmit = async (values) => {
        try {
            const response = await transactionTypeApi.createNew(values)

            alert(response.data.message)
            setShowTransactionModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleEditVehicleTypeSubmit = async (values) => {
        try {
            const response = await vehicleTypeApi.updateById(data.id, values)
            alert(response.data.message)
            setShowVehicleModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleAddVehicleTypeSubmit = async (values) => {
        try {
            const response = await vehicleTypeApi.createNew(values)

            alert(response.data.message)
            setShowVehicleModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleEditPackageTypeSubmit = async (values) => {
        try {
            const response = await packageTypeApi.updateById(data.id, values)
            alert(response.data.message)
            setShowPackageModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleAddPackageTypeSubmit = async (values) => {
        try {
            const response = await packageTypeApi.createNew(values)

            alert(response.data.message)
            setShowPackageModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleEditFeedbackTypeSubmit = async (values) => {
        try {
            const response = await feedbackTypeApi.updateById(data.id, values)
            alert(response.data.message)
            setShowFeedbackModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleAddFeedbackTypeSubmit = async (values) => {
        try {
            const response = await feedbackTypeApi.createNew(values)

            alert(response.data.message)
            setShowFeedbackModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleEditFeaturesSubmit = async (values) => {
        try {
            const response = await featureApi.updateById(data.id, values)
            alert(response.data.message)
            setShowFeatureModal(false)
            // window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleAddFeaturesSubmit = async (values) => {
        console.log(values)
        try {
            const response = await featureApi.createNew(values)

            alert(response.data.message)
            setShowFeatureModal(false)
            //window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleDeleteTransactionTypeSubmit = async () => {
        try {
            const response = await transactionTypeApi.deleteById(data.id)

            alert(response.data.message)
            setShowDeleteModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleDeleteVehicleTypeSubmit = async () => {
        try {
            const response = await vehicleTypeApi.deleteById(data.id)

            alert(response.data.message)
            setShowDeleteModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleDeletePackageTypeSubmit = async () => {
        try {
            const response = await packageTypeApi.deleteById(data.id)

            alert(response.data.message)
            setShowDeleteModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleDeleteFeedbackTypeSubmit = async () => {
        try {
            const response = await feedbackTypeApi.deleteById(data.id)

            alert(response.data.message)
            setShowDeleteModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleDeleteFeaturesSubmit = async () => {
        try {
            const response = await featureApi.deleteById(data.id)

            alert(response.data.message)
            setShowDeleteModal(false)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="setting-content">
            <div className="title">Master Setting</div>

            <div className="setting-content__swap-page">
                <button
                    className={
                        tabActive === TAB_TRANSACTION_TYPE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_TRANSACTION_TYPE)
                        setParams(defaultParams)
                    }}
                >
                    Loại giao dịch
                </button>
                <button
                    className={
                        tabActive === TAB_VEHICLE_TYPE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_VEHICLE_TYPE)
                        setParams(defaultParams)
                    }}
                >
                    Loại phương tiện
                </button>
                <button
                    className={
                        tabActive === TAB_PACKAGE_TYPE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_PACKAGE_TYPE)
                        setParams(defaultParams)
                    }}
                >
                    Loại gói ưu đãi
                </button>
                <button
                    className={
                        tabActive === TAB_FEEDBACK_TYPE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_FEEDBACK_TYPE)
                        setParams(defaultParams)
                    }}
                >
                    Loại feedback
                </button>
                <button
                    className={
                        tabActive === TAB_FEATURE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_FEATURE)
                        setParams(defaultParams)
                    }}
                >
                    Chức năng
                </button>
            </div>

            {/* ------------------------------ TAB TRANSACTION_TYPE ------------------------------- */}
            <div
                className={
                    tabActive === TAB_TRANSACTION_TYPE
                        ? 'setting-content__tab'
                        : 'setting-content__tab-unactive'
                }
            >
                <div className="setting-content__tab__action">
                    <div className="setting-content__tab__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
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
                                (params.created_from_date !== null &&
                                    params.created_from_date !== '') ||
                                (params.created_to_date !== null &&
                                    params.created_to_date !== '') ||
                                (params.updated_from_date !== null &&
                                    params.updated_from_date !== '') ||
                                (params.updated_to_date !== null &&
                                    params.updated_to_date !== '')
                                    ? 'setting-content__tab__action__filter-active'
                                    : 'setting-content__tab__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="setting-content__tab__action__search">
                        <Search
                            className="search-box"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__tab__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__tab__action__add"
                        onClick={() => {
                            setIsEdit(false)
                            setShowTransactionModal(true)
                        }}
                    >
                        <PlusCircleOutlined className="setting-content__tab__action__add__icon" />

                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__tab__sub">
                    <Table
                        className="setting-content__tab__sub__table"
                        columns={columnsTransaction}
                        dataSource={transactionType}
                        pagination={state.pagination}
                    />

                    <Modal
                        className="modal"
                        title={
                            isEdit
                                ? 'Chỉnh sửa loại giao dịch'
                                : 'Thêm loại giao dịch'
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
                            onFinish={
                                isEdit
                                    ? handleEditTransactionSubmit
                                    : handleAddTransactionSubmit
                            }
                            fields={[
                                {
                                    name: 'type_name',
                                    value: data.type_name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">Tên loại giao dịch</span>
                                <Form.Item
                                    name="type_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: messages['text_required'],
                                        },
                                    ]}
                                >
                                    <Input
                                        type="type_name"
                                        className="textbox"
                                    />
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
                                <button
                                    className="button-green"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* ------------------------------ TAB VEHICLE_TYPE ------------------------------- */}
            <div
                className={
                    tabActive === TAB_VEHICLE_TYPE
                        ? 'setting-content__tab'
                        : 'setting-content__tab-unactive'
                }
            >
                <div className="setting-content__tab__action">
                    <div className="setting-content__tab__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
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
                                (params.created_from_date !== null &&
                                    params.created_from_date !== '') ||
                                (params.created_to_date !== null &&
                                    params.created_to_date !== '') ||
                                (params.updated_from_date !== null &&
                                    params.updated_from_date !== '') ||
                                (params.updated_to_date !== null &&
                                    params.updated_to_date !== '')
                                    ? 'setting-content__tab__action__filter-active'
                                    : 'setting-content__tab__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="setting-content__tab__action__search">
                        <Search
                            className="search-box"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__tab__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__tab__action__add"
                        onClick={() => {
                            setIsEdit(false)
                            setShowVehicleModal(true)
                        }}
                    >
                        <PlusCircleOutlined className="setting-content__tab__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__tab__sub">
                    <Table
                        className="setting-content__tab__sub__table"
                        columns={columnsVehicle}
                        dataSource={vehicleType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            isEdit
                                ? 'Chỉnh sửa loại phương tiện'
                                : 'Thêm loại phương tiện'
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
                            onFinish={
                                isEdit
                                    ? handleEditVehicleTypeSubmit
                                    : handleAddVehicleTypeSubmit
                            }
                            fields={[
                                {
                                    name: 'type_name',
                                    value: data.type_name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">
                                    Tên loại phương tiện
                                </span>
                                <Form.Item
                                    name="type_name"
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
                                <button
                                    className="button-green"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* ------------------------------ TAB PACKAGE_TYPE ------------------------------- */}
            <div
                className={
                    tabActive === TAB_PACKAGE_TYPE
                        ? 'setting-content__tab'
                        : 'setting-content__tab-unactive'
                }
            >
                <div className="setting-content__tab__action">
                    <div className="setting-content__tab__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
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
                                (params.created_from_date !== null &&
                                    params.created_from_date !== '') ||
                                (params.created_to_date !== null &&
                                    params.created_to_date !== '') ||
                                (params.updated_from_date !== null &&
                                    params.updated_from_date !== '') ||
                                (params.updated_to_date !== null &&
                                    params.updated_to_date !== '')
                                    ? 'setting-content__tab__action__filter-active'
                                    : 'setting-content__tab__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="setting-content__tab__action__search">
                        <Search
                            className="search-box"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__tab__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__tab__action__add"
                        onClick={() => {
                            setIsEdit(false)
                            setShowPackageModal(true)
                        }}
                    >
                        <PlusCircleOutlined className="setting-content__tab__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__tab__sub">
                    <Table
                        className="setting-content__tab__sub__table"
                        columns={columnsPackage}
                        dataSource={packageType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            isEdit
                                ? 'Chỉnh sửa loại gói ưu đãi'
                                : 'Thêm loại gói ưu đãi'
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
                            onFinish={
                                isEdit
                                    ? handleEditPackageTypeSubmit
                                    : handleAddPackageTypeSubmit
                            }
                            fields={[
                                {
                                    name: 'type_name',
                                    value: data.type_name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">
                                    Tên loại gói ưu đãi
                                </span>
                                <Form.Item
                                    name="type_name"
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
                                <button
                                    className="button-green"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* ------------------------------ TAB FEEDBACK_TYPE ------------------------------- */}
            <div
                className={
                    tabActive === TAB_FEEDBACK_TYPE
                        ? 'setting-content__tab'
                        : 'setting-content__tab-unactive'
                }
            >
                <div className="setting-content__tab__action">
                    <div className="setting-content__tab__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
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
                                (params.created_from_date !== null &&
                                    params.created_from_date !== '') ||
                                (params.created_to_date !== null &&
                                    params.created_to_date !== '') ||
                                (params.updated_from_date !== null &&
                                    params.updated_from_date !== '') ||
                                (params.updated_to_date !== null &&
                                    params.updated_to_date !== '')
                                    ? 'setting-content__tab__action__filter-active'
                                    : 'setting-content__tab__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="setting-content__tab__action__search">
                        <Search
                            className="search-box"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__tab__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__tab__action__add"
                        onClick={() => {
                            setIsEdit(false)
                            setShowFeedbackModal(true)
                        }}
                    >
                        <PlusCircleOutlined className="setting-content__tab__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__tab__sub">
                    <Table
                        className="setting-content__tab__sub__table"
                        columns={columnsFeedback}
                        dataSource={feedbackType}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            isEdit
                                ? 'Chỉnh sửa loại phương tiện'
                                : 'Thêm loại phương tiện'
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
                            onFinish={
                                isEdit
                                    ? handleEditFeedbackTypeSubmit
                                    : handleAddFeedbackTypeSubmit
                            }
                            fields={[
                                {
                                    name: 'type_name',
                                    value: data.type_name,
                                },
                            ]}
                        >
                            <div className="modal__form__item">
                                <span className="span">Tên loại feedback</span>
                                <Form.Item
                                    name="type_name"
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
                                <button
                                    className="button-green"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/* ------------------------------ TAB FEATURE ------------------------------- */}
            <div
                className={
                    tabActive === TAB_FEATURE
                        ? 'setting-content__tab'
                        : 'setting-content__tab-unactive'
                }
            >
                <div className="setting-content__tab__action">
                    <div className="setting-content__tab__action__select">
                        <span>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
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
                                (params.created_from_date !== null &&
                                    params.created_from_date !== '') ||
                                (params.created_to_date !== null &&
                                    params.created_to_date !== '') ||
                                (params.updated_from_date !== null &&
                                    params.updated_from_date !== '') ||
                                (params.updated_to_date !== null &&
                                    params.updated_to_date !== '')
                                    ? 'setting-content__tab__action__filter-active'
                                    : 'setting-content__tab__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>
                    <div className="setting-content__tab__action__search">
                        <Search
                            className="search-box"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="setting-content__tab__action__search__icon" />
                    </div>
                    <Button
                        className="setting-content__tab__action__add"
                        onClick={() => {
                            setIsEdit(false)
                            setShowFeatureModal(true)
                        }}
                    >
                        <PlusCircleOutlined className="setting-content__tab__action__add__icon" />
                        <span>Thêm</span>
                    </Button>
                </div>

                <div className="setting-content__tab__sub">
                    <Table
                        className="setting-content__tab__sub__table"
                        columns={columnsFeature}
                        dataSource={features}
                        pagination={state.pagination}
                    />
                    <Modal
                        className="modal"
                        title={
                            isEdit ? 'Chỉnh sửa chức năng' : 'Thêm chức năng'
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
                            onFinish={
                                isEdit
                                    ? handleEditFeaturesSubmit
                                    : handleAddFeaturesSubmit
                            }
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
                                <button
                                    className="button-green"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Lưu
                                </button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>

            <Modal
                className="modal"
                title={
                    tabActive === TAB_TRANSACTION_TYPE
                        ? 'Xóa loại giao dịch'
                        : tabActive === TAB_VEHICLE_TYPE
                        ? 'Xóa loại phương tiện'
                        : tabActive === TAB_PACKAGE_TYPE
                        ? 'Xóa loại gói ưu đãi'
                        : tabActive === TAB_FEEDBACK_TYPE
                        ? 'Xóa loại feedback'
                        : tabActive === TAB_FEATURE
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
                    onFinish={
                        tabActive === TAB_TRANSACTION_TYPE
                            ? handleDeleteTransactionTypeSubmit
                            : tabActive === TAB_VEHICLE_TYPE
                            ? handleDeleteVehicleTypeSubmit
                            : tabActive === TAB_PACKAGE_TYPE
                            ? handleDeletePackageTypeSubmit
                            : tabActive === TAB_FEEDBACK_TYPE
                            ? handleDeleteFeedbackTypeSubmit
                            : tabActive === TAB_FEATURE
                            ? handleDeleteFeaturesSubmit
                            : null
                    }
                >
                    {tabActive === TAB_TRANSACTION_TYPE ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại giao dịch này không?
                        </p>
                    ) : tabActive === TAB_VEHICLE_TYPE ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại phương tiện này
                            không?
                        </p>
                    ) : tabActive === TAB_PACKAGE_TYPE ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại gói ưu đãi này không?
                        </p>
                    ) : tabActive === TAB_FEEDBACK_TYPE ? (
                        <p>
                            Bạn có chắn chắn muốn xóa loại feedback này không?
                        </p>
                    ) : tabActive === TAB_FEATURE ? (
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
                        <button
                            className="button-green"
                            type="primary"
                            htmlType="submit"
                        >
                            {' '}
                            Xóa
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Setting
