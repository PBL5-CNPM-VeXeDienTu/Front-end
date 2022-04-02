import React from 'react';
import { Menu, Dropdown, message, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import avatar from 'assets/images/avatar.jpg';
import speaker from 'assets/images/speaker.png';
import 'components/header/header.scss';

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

class Header extends React.Component {
    menu = () => {
        return (
            <Menu
                class="header-menu"
                styles={'background-color:red'}
                onClick={onClick}
            >
                <Menu.Item key="1">Trang cá nhân</Menu.Item>
                <Menu.Item key="2">Thay đổi password</Menu.Item>
                <Menu.Item key="3">Đăng xuất</Menu.Item>
            </Menu>
        );
    };

    render() {
        return (
            <div className="header">
                <div className="header-right">
                    {/* <BellOutlined className="header-right__icon"/> */}
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
                            <span className="header-notification__unread">
                                10
                            </span>
                        </span>
                    </Popover>
                    ,
                    <Dropdown overlay={this.menu} trigger="click">
                        <a
                            className="header-right__content"
                            onClick={(e) => e.preventDefault()}
                        >
                            <img
                                className="header-right__content__avatar"
                                src={avatar}
                                alt="logo"
                            ></img>

                            <div>
                                <div class="header-right__content__name">
                                    <span>Phạm Văn Thọ</span>
                                </div>
                                <div class="header-right__content__role">
                                    <span>Basic User</span>
                                </div>
                            </div>
                            <DownOutlined className="header-right__content__dropdown" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
export default Header;
