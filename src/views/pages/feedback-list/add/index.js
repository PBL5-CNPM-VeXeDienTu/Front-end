import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import messages from 'assets/lang/messages'
import './add-feedback.scss'
const { Option } = Select

function AddFeedback() {
    const FeedbackTypes = []
    for (let i = 0; i < 1; i++) {
        FeedbackTypes.push(
            <Option key={i.toString(36) + i}>Mong muốn thêm chức năng</Option>,
        )
        FeedbackTypes.push(
            <Option key={i.toString(36) + i + 1}>
                Liên lạc về lỗi của hệ thống
            </Option>,
        )
        FeedbackTypes.push(
            <Option key={i.toString(36) + i + 2}>Câu hỏi</Option>,
        )
    }

    const Features = []
    for (let i = 0; i < 1; i++) {
        Features.push(
            <Option key={i.toString(36) + i}>Nạp tiền vào ví cá nhân</Option>,
        )
        Features.push(
            <Option key={i.toString(36) + i + 1}>
                Quản lý lịch sử gửi xe
            </Option>,
        )
        Features.push(
            <Option key={i.toString(36) + i + 2}>Hủy đăng ký xe'</Option>,
        )
        Features.push(
            <Option key={i.toString(36) + i + 2}>
                Chỉnh sửa thông tin xe'
            </Option>,
        )
    }
    return (
        <div className="add-feedback-content">
            <div className="add-feedback-content__title">Thêm nhà xe</div>
            <Form
                name="addprofile"
                className="add-feedback-content__sub"
                // onFinish={handleSubmit}
            >
                <div className="add-feedback-content__sub__info">
                    <div className="add-feedback-content__sub__info__item">
                        <span className="span">Loại Feedback</span>
                        <Form.Item
                            name="type_name"
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
                            name="name"
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
                            name="address"
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
                        <Link to="/profile">Hủy</Link>
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
