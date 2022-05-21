import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import speaker from 'assets/images/speaker.png'
import 'components/header/header.scss'

const onClick = ({ key }) => {}

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
)

function Header() {
    const { user, setToken } = useAuth()
    const avatarURL = process.env.REACT_APP_API_URL + user.UserInfo?.avatar

    const handleLogout = () => {
        setToken(null)
    }

    const menu = () => {
        return (
            <Menu
                class="header-menu"
                styles={'background-color:red'}
                onClick={onClick}
            >
                <Menu.Item key="1">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/change-password">Đổi mật khẩu</Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleLogout}>
                    Đăng xuất
                </Menu.Item>
            </Menu>
        )
    }

    const userRole = () => {
        switch (user.role) {
            case 1:
                return 'Basic User'
            case 2:
                return 'Parking-lot User'
            case 3:
                return 'Admin'
            default:
                return 'Another'
        }
    }

    return (
        <div className="header">
            <div className="header-right">
                <Popover
                    className="header-notification"
                    content={content}
                    title="Title"
                    trigger="click"
                >
                    <span className="">
                        <img
                            className="header-notification__icon"
                            src={speaker}
                            alt="speaker"
                        ></img>
                        <span className="header-notification__unread">10</span>
                    </span>
                </Popover>

                <Dropdown overlay={menu} trigger="click">
                    <label
                        className="header-right__content"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            className="header-right__content__avatar"
                            src={avatarURL}
                            alt="logo"
                        ></img>

                        <div>
                            <div className="header-right__content__name">
                                <span>{user.name}</span>
                            </div>
                            <div className="header-right__content__role">
                                <span>{userRole()}</span>
                            </div>
                        </div>
                        <DownOutlined className="header-right__content__dropdown" />
                    </label>
                </Dropdown>
            </div>
        </div>
    )
}
export default Header
