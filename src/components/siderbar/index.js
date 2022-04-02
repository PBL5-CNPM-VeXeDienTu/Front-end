import React, { useState } from 'react'
import { Button, Layout,Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined ,
  OrderedListOutlined ,
  GiftOutlined ,
  WalletOutlined ,
  HistoryOutlined ,
  QrcodeOutlined ,
  MessageOutlined ,
  LeftOutlined ,
  RightOutlined ,
  } from '@ant-design/icons';
import logoFull from 'assets/images/app-logo/header_logo_full.png'
import 'antd/dist/antd.min.css';
import 'components/siderbar/siderbar.scss';

const siderWidth = 200;
const minimizeSiderWidth = 80;


const RenderMenu  = () => {
    const [collapsed, setCollapsed] = useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const {Sider } = Layout;

    const onClickLink = (e, url = '/') => {
        // if (isEditingData) {
        //     e.preventDefault();

        //     // show modal
        //     setConfirmVisible(true);
        //     setRedirectUrl(url);
        // }
    };


    return(
        <Layout className="layout-container">
            <Sider
                width={collapsed ? minimizeSiderWidth : siderWidth}
                className="sider-bar"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
            <Link to='/' onClick={e => onClickLink(e)}>
                <div className='sider-bar__logo'>
                    {collapsed == false ? <div className='logo-full' /> : <div className='logo-collapsed' />}
                </div>
            </Link>
            <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    inlineCollapsed={collapsed}
                    className="sider-bar__menu">
                    <Menu.Item key="1"  icon={<HomeOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<OrderedListOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">Danh sách bãi đỗ xe</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<GiftOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">Các gói ưu đãi</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<WalletOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">Ví cá nhân</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<HistoryOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">Lịch sử gửi xe</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<QrcodeOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">QR checkout</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<MessageOutlined className='menu-item-icon'/>}>
                        <Link className="sider-bar__link" to="#">Feedback</Link>
                    </Menu.Item>
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
};

export default RenderMenu;
