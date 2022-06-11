import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import Icon, {
    UserOutlined,
    LineChartOutlined,
    GiftOutlined,
    WalletOutlined,
    HistoryOutlined,
    QrcodeOutlined,
    MessageOutlined,
    LeftOutlined,
    CheckCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import * as sidebarIcons from 'shared/icons/sidebar-icons'

import 'antd/dist/antd.min.css'
import 'components/siderbar/siderbar.scss'

const siderWidth = 200
const minimizeSiderWidth = 80

const RenderMenu = () => {
    const { user } = useAuth()
    const { collapsed, setCollapsed } = useAuth()
    const defaultSelectedKey = localStorage.getItem('selected_sidebar_key')

    const toggleCollapsed = () => {
        localStorage.setItem('collapsed', !collapsed)
        setCollapsed(!collapsed)
    }
    const { Sider } = Layout

    const onClickLink = (e, url = '/') => {}

    const handleSelectItem = (e) => {
        localStorage.setItem('selected_sidebar_key', e.key)
    }

    const parkingUserMenu = 
        <>
            <Menu.Item
                key="1"
                icon={<Icon component={sidebarIcons.carSgv} />}
            >
                <Link className="sider-bar__link" to="/vehicles">
                    Danh sách các xe
                </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<Icon component={sidebarIcons.parkingListSgv} />}
            >
                <Link className="sider-bar__link" to="/parking-lots">
                    Danh sách bãi đỗ xe
                </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<GiftOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/packages">
                    Các gói ưu đãi
                </Link>
            </Menu.Item>
            <Menu.Item
                key="4"
                icon={<WalletOutlined className="menu-item-icon" />}
            >
                <Link
                    className="sider-bar__link"
                    to={
                        user.role === roles.ADMIN
                            ? '/wallets'
                            : '/wallets/detail'
                    }
                >
                    Ví cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item
                key="5"
                icon={<HistoryOutlined className="menu-item-icon" />}
            >
                <Link
                    className="sider-bar__link"
                    to="/parking-histories"
                >
                    Lịch sử gửi xe
                </Link>
            </Menu.Item>
            <Menu.Item
                key="6"
                icon={<QrcodeOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/qr-checkout">
                    QR checkout
                </Link>
            </Menu.Item>
            <Menu.Item
                key="7"
                icon={<MessageOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/feedbacks">
                    Feedback
                </Link>
            </Menu.Item>
        </>

    const parkingLotUserMenu = 
        <>
            <Menu.Item
                key="1"
                icon={<Icon component={sidebarIcons.parkingListSgv} />}
            >
                <Link className="sider-bar__link" to="/parking-lots">
                    Danh sách bãi xe
                </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<Icon component={sidebarIcons.twoWayArrowSvg} />}
            >
                <Link
                    className="sider-bar__link"
                    to="/checkin-checkout"
                >
                    Quản lí ra vào bãi
                </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<GiftOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/packages">
                    Các gói ưu đãi
                </Link>
            </Menu.Item>
            <Menu.Item
                key="4"
                icon={<WalletOutlined className="menu-item-icon" />}
            >
                <Link
                    className="sider-bar__link"
                    to={
                        user.role === roles.ADMIN
                            ? '/wallets'
                            : '/wallets/detail'
                    }
                >
                    Ví cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item
                key="5"
                icon={<HistoryOutlined className="menu-item-icon" />}
            >
                <Link
                    className="sider-bar__link"
                    to="/parking-histories"
                >
                    Lịch sử gửi xe
                </Link>
            </Menu.Item>
            <Menu.Item
                key="6"
                icon={<LineChartOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="#">
                    Thống kê doanh thu
                </Link>
            </Menu.Item>
            <Menu.Item
                key="7"
                icon={<MessageOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/feedbacks">
                    Feedback
                </Link>
            </Menu.Item>
        </>

    const adminMenu = 
        <>
            <Menu.Item
                key="1"
                icon={<UserOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/accounts">
                    Quản lí tài khoản user
                </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={
                    <CheckCircleOutlined className="menu-item-icon" />
                }
            >
                <Link className="sider-bar__link" to="/verify-request">
                    Quản lí yêu cầu đăng kí
                </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<WalletOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/wallets">
                    Quản lí ví user
                </Link>
            </Menu.Item>
            <Menu.Item
                key="4"
                icon={<GiftOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/packages">
                    Quản lí gói ưu đãi
                </Link>
            </Menu.Item>
            <Menu.Item
                key="5"
                icon={<MessageOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/feedbacks">
                    Quản lí feedback
                </Link>
            </Menu.Item>
        </>

    return (
        <Layout className="layout-container">
            <Sider
                width={collapsed ? minimizeSiderWidth : siderWidth}
                className="sider-bar"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Link to="/" onClick={(e) => onClickLink(e)}>
                    <div className="sider-bar__logo">
                        {collapsed === false ? (
                            <div className="logo-full" />
                        ) : (
                            <div className="logo-collapsed" />
                        )}
                    </div>
                </Link>
                <Menu
                    defaultSelectedKeys={[defaultSelectedKey]}
                    defaultOpenKeys={['sub1']}
                    inlineCollapsed={collapsed}
                    className="sider-bar__menu"
                    onSelect={(e) => handleSelectItem(e)}
                >
                    {
                        user.role === roles.PARKING_USER ? (
                            // ------------------- PARKING USER -----------------------
                            parkingUserMenu
                        ) : user.role === roles.PARKING_LOT_USER ? (
                            //------------------PARKING-LOT USER---------------------
                            parkingLotUserMenu
                        ) :  (
                            //------------------------ADMIN--------------------------
                            adminMenu
                        )
                    }
                    <div className="scoll-menu">
                        <Button
                            className="scoll-menu-button"
                            onClick={toggleCollapsed}
                        >
                            {collapsed ? <RightOutlined /> : <LeftOutlined />}
                        </Button>
                    </div>
                </Menu>
            </Sider>
        </Layout>
    )
}

export default RenderMenu
