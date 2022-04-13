import React, { useEffect, useState } from 'react';
import 'components/layouts/main-layout.scss';
import Header from 'components/header';
import Siderbar from 'components/siderbar';

function MainLayout(props) {
    const [collapsed, setCollapsed] = useState(
        localStorage.getItem('collapsed'),
    );

    useEffect(() => {
        localStorage.setItem('collapsed', collapsed);
    }, [collapsed]);

    return (
        <div className={collapsed ? 'main-layout colapsed' : 'main-layout'}>
            <Siderbar
                className="main-layout__siderbar"
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <div className="main-layout__content">
                <Header className="main-layout__content__header" />
                <props.component className="main-layout__content__main" />
            </div>
        </div>
    );
}

export default MainLayout;
