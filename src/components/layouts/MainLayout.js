import React from 'react';
import 'components/layouts/main-layout.scss';
import Header from 'components/header';
import Siderbar from 'components/siderbar';

function MainLayout(props) {
    return (
        <div className="main-layout">
            <Siderbar className='main-layout__siderbar' />    
            <div className="main-layout__content">
                <Header className='main-layout__content__header'/>
                <props.component className='main-layout__content__main'/>
            </div>
        </div>
    );
}


export default MainLayout;
