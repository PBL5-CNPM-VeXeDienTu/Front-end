import React from 'react'
import 'components/layouts/main-layout.scss'
import Header from 'components/header'
import Siderbar from 'components/siderbar'

import useAuth from 'hooks/useAuth'

function MainLayout(props) {
    const { collapsed } = useAuth()

    return (
        <div className={collapsed ? 'main-layout collapsed' : 'main-layout'}>
            <Siderbar className="main-layout__siderbar" />
            <div className="main-layout__content">
                <Header className="main-layout__content__header" />
                <div className="main-layout__content__main">
                    <div className="main-layout__content__main__component">
                        <props.component />
                        <div className="main-layout__content__main__footer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
