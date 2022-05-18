import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'antd'
import './vehicle-detail.scss'

function VerifyVehicleRequest() {
    const avatarVehicleURL =
        process.env.REACT_APP_API_URL +
        'public/images/avatars/vehicle/default-avatar.png'
    const cavetFrontURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    const cavetBackURL =
        process.env.REACT_APP_API_URL + 'public/images/cavet/default.png'
    return (
        <div className="verify-vehicle-request-content">
            <div className="title">Chi tiết xe đăng kí</div>
            <Form className="verify-vehicle-request-content__sub">
                <div className="verify-vehicle-request-content__sub__vehicle">
                    <div className="verify-vehicle-request-content__sub__vehicle__image">
                        <img
                            className="img"
                            src={avatarVehicleURL}
                            alt="avatar"
                        />
                    </div>
                    <div className="verify-vehicle-request-content__sub__vehicle__info">
                        <div className="verify-vehicle-request-content__sub__vehicle__info__item">
                            <span className="span">Biển số </span>
                            <li className="li">43A-299.99 </li>
                        </div>
                        <div className="verify-vehicle-request-content__sub__vehicle__info__item">
                            <span className="span">Hãng xe</span>
                            <li className="li">Mercedes-Benz EQS </li>
                        </div>
                        <div className="verify-vehicle-request-content__sub__vehicle__info__item">
                            <span className="span">Màu</span>
                            <li className="li">Đen </li>
                        </div>

                        <div className="verify-vehicle-request-content__sub__vehicle__info__item">
                            <span className="span">Mô tả</span>
                            <li className="li">
                                Bản EQS 350 tiêu chuẩn, xe được trang bị một
                                động cơ điện phía sau duy nhất sản sinh công
                                suất 292 mã lực và mô-men xoắn 565 Nm, trong khi
                                chiếc EQS 450+ có công suất lên tới 333 mã lực.{' '}
                            </li>
                        </div>
                    </div>
                </div>
                <div className="verify-vehicle-request-content__sub__cavet">
                    <div className="verify-vehicle-request-content__sub__cavet__item">
                        <span className="span">Hình ảnh caver trước</span>
                        <div className="verify-vehicle-request-content__sub__cavet__item__image">
                            <img src={cavetFrontURL} alt="avatar" />
                        </div>
                    </div>
                    <div className="verify-vehicle-request-content__sub__cavet__item">
                        <span className="span">Hình ảnh caver sau</span>
                        <div className="verify-vehicle-request-content__sub__cavet__item__image">
                            <img src={cavetBackURL} alt="avatar" />
                        </div>
                    </div>
                </div>
                <div className="verify-vehicle-request-content__sub__button">
                    <Button className="button-cancel">
                        <Link to="/vehicles">Thoát</Link>
                    </Button>
                    <Button
                        className="button-save"
                        type="primary"
                        htmlType="submit"
                    >
                        Xác nhận
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default VerifyVehicleRequest
