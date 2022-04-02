import React, { useState } from 'react'
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
  import { Layout, Menu } from 'antd';
  import 'antd/dist/antd.css';

function MenuBasic () {
   const [collapsed, setCollapsed] = useState(false)
   const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
    return (
        <div>
            <Menu      
                className="sider-menu"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                inlineCollapsed={collapsed}>
            
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="2" icon={<OrderedListOutlined />}>
                Danh sách các bãi đỗ xe
                </Menu.Item>
                <Menu.Item key="3" icon={<GiftOutlined />}>
                Các gói ưu đãi
                </Menu.Item>
                <Menu.Item key="4" icon={<WalletOutlined />}>
                Ví cá nhân
                </Menu.Item>
                <Menu.Item key="5" icon={<HistoryOutlined />}>
                Lịch sử gửi xe
                </Menu.Item>
                <Menu.Item key="6" icon={<QrcodeOutlined />}>
                QR checkout
                </Menu.Item>
                <Menu.Item key="7" icon={<MessageOutlined />}>
                Feed back
                </Menu.Item>
                <div className="scoll-menu">
                    <div
                    className="scoll-menu-button"
                    onClick={toggleCollapsed}
                    >
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                    </div>
                </div>
            </Menu>
        </div>
    )
}
export default MenuBasic;