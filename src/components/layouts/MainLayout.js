import React from 'react'
import 'components/layouts/main-layout.scss'
import Header from 'components/header'
import Siderbar from 'components/siderbar'

function MainLayout(props) {
    return (
        <div className="main-layout">
            <Siderbar className="main-layout__siderbar" />
            <div className="main-layout__content">
                <Header className="main-layout__content__header" />
                <div className="main-layout__content__main">
                    <div className="main-layout__content__main__component">
                        <props.component />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
