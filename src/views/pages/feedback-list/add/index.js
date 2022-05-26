import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import feedbackApi from 'api/feedbackAPi'

import './add-feedback.scss'
const { Option } = Select

function AddFeedback() {
    const navigate = useNavigate()

    const FeedbackTypes = []
    for (let i = 0; i < 1; i++) {
        FeedbackTypes.push(
            <Option key={i + 1}>Mong muốn thêm chức năng</Option>,
        )
        FeedbackTypes.push(
            <Option key={i + 2}>Liên lạc về lỗi của hệ thống</Option>,
        )
        FeedbackTypes.push(<Option key={i + 3}>Câu hỏi</Option>)
    }

    const Features = []
    for (let i = 0; i < 1; i++) {
        Features.push(<Option key={i + 1}>Nạp tiền vào ví cá nhân</Option>)
        Features.push(<Option key={i + 2}>Quản lý lịch sử gửi xe</Option>)
        Features.push(<Option key={i + 3}>Hủy đăng ký xe</Option>)
        Features.push(<Option key={i + 4}>Chỉnh sửa thông tin xe</Option>)
    }

    const handleSubmit = async (values) => {
        try {
            const newFeedback = {
                type_id: parseInt(values.type_id),
                feature_id: parseInt(values.feature_id),
                content: values.content,
            }
            const response = await feedbackApi.create(newFeedback)
            alert(response.data.message)
            navigate('/feedbacks')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="add-feedback-content">
            <div className="title">Thêm feedback</div>
            <Form
                name="addprofile"
                className="add-feedback-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-feedback-content__sub__info">
                    <div className="add-feedback-content__sub__info__item">
                        <span className="span">Loại Feedback</span>
                        <Form.Item
                            name="type_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>{FeedbackTypes}</Select>
                        </Form.Item>
                    </div>

                    <div className="add-feedback-content__sub__info__item">
                        <span className="span">Chức năng</span>
                        <Form.Item
                            name="feature_id"
                            classname="text"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select>{Features}</Select>
                        </Form.Item>
                    </div>

                    <div className="add-feedback-content__sub__info__item">
                        <span className="span">Mô tả</span>
                        <Form.Item
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input.TextArea
                                type="name"
                                size="large"
                                className="textarea"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="add-feedback-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/feedbacks">Thoát</Link>
                    </Button>
                    <Button
                        className="button-save"
                        type="primary"
                        htmlType="submit"
                    >
                        Lưu
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddFeedback
