import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Modal, Form, Radio } from 'antd'
import {
    FilterOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import feedbackApi from 'api/feedbackAPi'
import './feedback-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Loại phản hồi',
        dataIndex: 'feedback_type',
        width: '20%',
    },
    {
        title: 'Chức năng',
        dataIndex: 'feature',
        width: '20%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'is_processed',
        width: '10%',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        width: '50%',
    },
]

const featureOfItem = [
    'All',
    '[Basic user] Đăng ký xe',
    '[Basic user] Chỉnh sửa thông tin xe',
    '[Basic user] Hủy đăng ký xe',
]

const feedbackTypeOfItem = [
    'All',
    'Câu hỏi',
    'Liên lạc về lỗi của hệ thống',
    'Mong muốn thêm chức năng',
]

function ParkingLots() {
    const { user } = useAuth()
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
    })
    const [total, setTotal] = useState(0)
    const [feedbackType, setFeedbackType] = useState('All')
    const [feature, setFeature] = useState('All')
    const [feedbackState, setFeedbackState] = useState('All')
    const [activeFilter, setActiveFilter] = useState(false)
    const [showBasicUserModal, setShowBasicUserModal] = useState(false)
    const [showAdminModal, setShowAdminModal] = useState(false)
    const [dataColumns, setDataColumns] = useState([{}])
    const [radioValue, setRadioValue] = useState(0)
    const [feedback, setFeedback] = useState({
        key: 0,
        type_name: '',
        feedback_name: '',
        is_processed: '',
        content: '',
    })

    const onSearch = (value) => console.log(value)

    const showFeedbackItem = (record) => {
        setShowBasicUserModal(true)
        setFeedback(record)
    }

    const replyFeedbackItem = (record) => {
        setShowAdminModal(true)
        setFeedback(record)
    }

    useEffect(() => {
        if (
            feedbackType === 'All' &&
            feature === 'All' &&
            feedbackState === 'All'
        )
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [feedbackType, feature, feedbackState])

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
        try {
            user.role === roles.ADMIN
                ? feedbackApi.getListByParams(params).then((response) => {
                      setTotal(response.data.count)
                      setDataColumns(
                          response.data.rows.map((feedback) => ({
                              id: feedback.id,
                              feedback_type: feedback.Feature.name,
                              feature: feedback.FeedbackType.type_name,
                              is_processed: feedback.is_processed
                                  ? 'Đã duyệt'
                                  : 'Chưa duyệt',
                              content: feedback.content,
                              response: feedback.response,
                          })),
                      )
                  })
                : feedbackApi
                      .getListByUserId(user.id, params)
                      .then((response) => {
                          setTotal(response.data.count)
                          setDataColumns(
                              response.data.rows.map((feedback) => ({
                                  id: feedback.id,
                                  feedback_type: feedback.Feature.name,
                                  feature: feedback.FeedbackType.type_name,
                                  is_processed: feedback.is_processed
                                      ? 'Đã duyệt'
                                      : 'Chưa duyệt',
                                  content: feedback.content,
                                  response: feedback.response,
                              })),
                          )
                      })
        } catch (error) {
            alert(error)
        }
    }, [params, user])

    const handleCancel = () => {
        setShowBasicUserModal(false)
        setShowAdminModal(false)
    }

    const handleSubmit = async (values) => {
        try {
            const updateFeedback = {
                is_processed: radioValue ? true : false,
                response: values.response,
            }
            const response = await feedbackApi.updateById(
                feedback.id,
                updateFeedback,
            )
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const menu = () => {
        return (
            <Menu class="feedback-list-menu">
                <div className="feedback-list-menu__item">
                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">
                            Loại Feedback
                        </span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={(e) => setFeedbackType(e.target.value)}
                        >
                            {feedbackTypeOfItem.map(
                                (feedbackTypeOfItem, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={feedbackTypeOfItem}
                                        >
                                            {feedbackTypeOfItem}
                                        </option>
                                    )
                                },
                            )}
                        </select>
                    </div>

                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">
                            Chức năng
                        </span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={(e) => setFeature(e.target.value)}
                        >
                            {featureOfItem.map((featureOfItem, index) => {
                                return (
                                    <option key={index} value={featureOfItem}>
                                        {featureOfItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={(e) => setFeedbackState(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Chưa duyệt">Chưa duyệt</option>
                            <option value="Đã duyệt">Đã duyệt</option>
                        </select>
                    </div>
                </div>
            </Menu>
        )
    }

    return (
        <div className="feedback-list-content">
            <div className="title">Danh sách Feedback</div>
            <div
                className={
                    user.role === roles.ADMIN
                        ? 'feedback-list-content__action__state-one'
                        : 'feedback-list-content__action__state-two'
                }
            >
                <div className="feedback-list-content__action__select">
                    <span>Hiển thị </span>
                    <select
                        defaultValue={{ value: params.limit }}
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
                                ? 'feedback-list-content__action__filter-active'
                                : 'feedback-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

                <div className="feedback-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="feedback-list-content__action__search__icon" />
                </div>

                <Link
                    className={
                        user.role === roles.ADMIN
                            ? 'feedback-list-content__action__add-unactive'
                            : 'feedback-list-content__action__add-active'
                    }
                    to="/feedbacks/add"
                >
                    <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                    <span>Thêm feedback</span>
                </Link>
            </div>

            <div className="feedback-list-content__sub">
                <Table
                    className="feedback-list-content__sub__table"
                    columns={columns}
                    dataSource={dataColumns}
                    pagination={state.pagination}
                    rowClassName={(record, index) =>
                        record.is_processed === 'Đã duyệt'
                            ? 'feedback-list-content__sub__table__row-green'
                            : 'feedback-list-content__sub__table__row-red'
                    }
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                user.role === roles.ADMIN
                                    ? record.is_processed === 'Chưa duyệt'
                                        ? replyFeedbackItem(record)
                                        : showFeedbackItem(record)
                                    : showFeedbackItem(record)
                            },
                        }
                    }}
                />
                {/* -------------------------------------- MODAL BASIC USER & PARKING-LOT USER -------------------------------------- */}
                <Modal
                    className="feedback-list-modal"
                    visible={showBasicUserModal}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <h1 className="title">Chi tiết Feedback</h1>
                    <div className="div">
                        <span className="span1">Loại Feedback</span>
                        <span className="span2">{feedback.feedback_type}</span>
                    </div>
                    <div className="div">
                        <span className="span1">Chức năng</span>
                        <span className="span2">{feedback.feature}</span>
                    </div>
                    <div className="div">
                        <span className="span1">Tình trạng</span>
                        <span
                            className={
                                feedback.is_processed === 'Đã duyệt'
                                    ? 'span2-green'
                                    : 'span2-red'
                            }
                        >
                            {feedback.is_processed}
                        </span>
                    </div>
                    <div className="div">
                        <span className="span1">Nội dung</span>
                        <span className="span2">{feedback.content}</span>
                    </div>
                    <div className="div">
                        <span className="span1">Phản hồi</span>
                        <span
                            className={
                                feedback.is_processed === 'Đã duyệt'
                                    ? 'span2'
                                    : 'span2-italic'
                            }
                        >
                            {feedback.response
                                ? feedback.response
                                : 'Chưa có phản hồi'}
                        </span>
                    </div>
                </Modal>

                {/* -------------------------------------------------- MODAL ADMIN -------------------------------------------------- */}
                <Modal
                    className="feedback-list-modal"
                    visible={showAdminModal}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <h1 className="title">Phản hồi Feedback</h1>
                    <Form
                        name="reply_feedback"
                        className="feedback-list-modal__sub"
                    >
                        <div className="feedback-list-modal__sub__info">
                            <div className="feedback-list-modal__sub__info__item">
                                <span className="span">Loại Feedback</span>
                                <Form.Item
                                    name="type_id"
                                    initialValue={feedback.feedback_type}
                                    className="form-item"
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="feedback-list-modal__sub__info__item">
                                <span className="span">Chức năng</span>
                                <Form.Item
                                    name="feature_id"
                                    initialValue={feedback.feature}
                                    className="form-item"
                                >
                                    <Input
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="feedback-list-modal__sub__info__item">
                                <span className="span">Nội dung</span>
                                <Form.Item
                                    name="content"
                                    initialValue={feedback.content}
                                    className="form-item"
                                >
                                    <Input.TextArea
                                        className="text"
                                        disabled
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>

                            <div className="feedback-list-modal__sub__info__item">
                                <span className="span__textarea">
                                    Trạng thái
                                </span>
                                <Radio.Group
                                    className="radio-group"
                                    value={radioValue}
                                    onChange={(e) => {
                                        setRadioValue(e.target.value)
                                    }}
                                >
                                    <Radio value={0}>Chưa duyệt</Radio>
                                    <Radio value={1}>Đã duyệt</Radio>
                                </Radio.Group>
                            </div>

                            <div className="feedback-list-modal__sub__info__item">
                                <span className="span__textarea">Phản hồi</span>
                                <Form.Item
                                    name="response"
                                    className="form-item"
                                >
                                    <Input.TextArea
                                        className="textarea"
                                        size="medium"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="feedback-list-modal__sub__button">
                            <button
                                className="button-cancel"
                                onClick={(e) => setShowAdminModal(false)}
                            >
                                Thoát
                            </button>
                            <button
                                className="button-save"
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

export default ParkingLots
