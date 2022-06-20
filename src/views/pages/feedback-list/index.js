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
import feedbackTypeApi from 'api/feedbackTypeApi'
import featureApi from 'api/featureApi'
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

function ParkingLots() {
    const { user } = useAuth()
    const [total, setTotal] = useState(0)
    const [showParkingUserModal, setShowParkingUserModal] = useState(false)
    const [showAdminModal, setShowAdminModal] = useState(false)
    const [radioValue, setRadioValue] = useState(0)
    const [feedbackList, setFeedbackList] = useState([])
    const [feedbackTypeList, setFeedbackTypeList] = useState([])
    const [featureList, setFeatureList] = useState([])
    const [feedback, setFeedback] = useState({})
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
        txt_search: null,
        type_id: null,
        feature_id: null,
        is_processed: null,
    })

    const showFeedbackItem = (record) => {
        setShowParkingUserModal(true)
        setFeedback(record)
    }

    const replyFeedbackItem = (record) => {
        setShowAdminModal(true)
        setFeedback(record)
    }

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
                      setFeedbackList(
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
                          setFeedbackList(
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
            feedbackTypeApi.getAll().then((response) => {
                setFeedbackTypeList(
                    response.data.rows.map((feedbackType) => ({
                        id: feedbackType.id,
                        type_name: feedbackType.type_name,
                    })),
                )
            })
            featureApi.getAll().then((response) => {
                setFeatureList(
                    response.data.rows.map((feature) => ({
                        id: feature.id,
                        name: feature.name,
                    })),
                )
            })
        } catch (error) {
            alert(error)
        }
    }, [params, user])

    const handleCancel = () => {
        setShowParkingUserModal(false)
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
                            <option key={1} value="All">
                                All{' '}
                            </option>
                            {feedbackTypeList.map((feedbackType, index) => {
                                return (
                                    <option
                                        key={index + 1}
                                        value={feedbackType.id}
                                    >
                                        {feedbackType.type_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">
                            Chức năng
                        </span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    feature_id:
                                        e.target.value === 'All'
                                            ? null
                                            : e.target.value,
                                })
                            }
                        >
                            <option key={1} value="All">
                                All{' '}
                            </option>
                            {featureList.map((feature, index) => {
                                return (
                                    <option key={index + 1} value={feature.id}>
                                        {feature.name}
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
                            onChange={(e) => {
                                switch (e.target.value) {
                                    case 'All':
                                        setParams({
                                            ...params,
                                            is_processed: null,
                                        })
                                        break
                                    case 'Chưa duyệt':
                                        setParams({
                                            ...params,
                                            is_processed: 0,
                                        })
                                        break
                                    case 'Đã duyệt':
                                        setParams({
                                            ...params,
                                            is_processed: 1,
                                        })
                                        break
                                    default:
                                        break
                                }
                            }}
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
                            params.type_id != null ||
                            params.feature_id != null ||
                            params.is_processed != null
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
                        placeholder="Loại phản hồi, chức năng, nội dung"
                        onChange={(e) =>
                            setParams({ ...params, txt_search: e.target.value })
                        }
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
                    dataSource={feedbackList}
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
                {/* -------------------------------------- MODAL PARKING USER & PARKING-LOT USER -------------------------------------- */}
                <Modal
                    className="feedback-list-modal"
                    visible={showParkingUserModal}
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
                                className="button-gray"
                                onClick={(e) => setShowAdminModal(false)}
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

export default ParkingLots
