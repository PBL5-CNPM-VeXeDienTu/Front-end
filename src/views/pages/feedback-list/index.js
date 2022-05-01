import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table,  Input, Menu, Dropdown } from 'antd'
import { FilterOutlined, PlusCircleOutlined } from '@ant-design/icons'
import './feedback-list.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]
const columns = [
    {
        title: 'Loại phản hồi',
        dataIndex: 'type_name',
        width: '20%',
    },
    {
        title: 'Chức năng',
        dataIndex: 'name',
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


    const [page, setPage] = useState(20)
    const [feedbackType, setFeedbackType] = useState("All")
    const [feature, setFeature] = useState("All")
    const [feedbackState, setFeedbackState] = useState("All")
    const [activeFilter, setActiveFilter] = useState(false)

    const state = {
        pagination: {
            pageSize: page,
        },
    }

    const onSearch = (value) => console.log(value)

    useEffect(() => {
        console.log(activeFilter);
    }, [activeFilter])

    useEffect(() => {
        if (feedbackType === "All" && feature === "All" && feedbackState === "All") 
            setActiveFilter(false)
        else setActiveFilter(true)
    }, [feedbackType, feature, feedbackState])

    const featureOfItem = [
        "All",
        "[Basic user] Đăng ký xe",
        "[Basic user] Chỉnh sửa thông tin xe",
        "[Basic user] Hủy đăng ký xe",
    ]
    const feedbackTypeOfItem = [
        "All",
        "Câu hỏi",
        "Liên lạc về lỗi của hệ thống",
        "Mong muốn thêm chức năng",
    ]
    
    const data = []
    for (let i = 0; i < page; i++) {
        data.push({
            key: i,
            type_name: 'Mong muốn thêm chức năng',
            name: 'Nạp tiền vào ví cá nhân',
            is_processed: 'Chưa duyệt',
            content: 'Muốn có thêm chức năng nạp tiền bằng tài khoản ngân hàng',
        })
    }


    const menu = () => {
        return (
            <Menu
                class="feedback-list-menu"
            >
                <div className="feedback-list-menu__item">
                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">Loại Feedback</span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={e => setFeedbackType(e.target.value)}
                            
                        >
                            {feedbackTypeOfItem.map((feedbackTypeOfItem, index) => {
                                return (
                                    <option key={index} value={feedbackTypeOfItem}>
                                        {feedbackTypeOfItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">Chức năng</span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={e => setFeature(e.target.value)}
                        >
                            {featureOfItem.map((featureOfItem, index) => {
                                return (
                                    <option key={index} value={featureOfItem}>
                                        {featureOfItem}
                                    </option >
                                )
                            })}
                        </select>
                    </div>

                    <div className="feedback-list-menu__item__row">
                        <span className="feedback-list-menu__item__row__span">Trạng thái</span>
                        <select
                            className="feedback-list-menu__item__row__select"
                            onChange={e => setFeedbackState(e.target.value)}
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
            <div className="feedback-list-content__title">Danh sách Feedback</div>
            <div className="feedback-list-content__action">
                <div className="feedback-list-content__action__select">
                    <span>Hiển thị </span>
                    <select
                        defaultValue={{ value: page }}
                        onChange={e => setPage(e.target.value)}
                    >
                        {numOfItem.map((numOfItem, index) => {
                            return (
                                <option key={index} value={numOfItem}>
                                    {numOfItem}
                                </option >
                            )
                        })}
                    </select>
                </div>
                <Dropdown
                    overlay={menu}
                    trigger="click"
                    placement="bottom"
                >
                    <div className={activeFilter
                        ? "feedback-list-content__action__filter-active"
                        : "feedback-list-content__action__filter-unactive"}
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
                </div>

                <Link className="feedback-list-content__action__add" to="/feedbacks/add">
                    <span>Thêm feedback</span>
                    <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                </Link>
            </div>

            <div className="feedback-list-content__sub">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={state.pagination}
                />
            </div>
        </div>
    )
}

export default ParkingLots