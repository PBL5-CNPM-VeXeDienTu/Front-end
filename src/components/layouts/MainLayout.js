import React from 'react';
import { Layout } from 'antd';
import Header from 'components/header';
import Profile from 'views/pages/profile';
import { BrowserRouter, Routes, Route, Router, Switch } from 'react-router-dom';

// import App from 'components/app';
function Test(props) {
    return <p>{props.a}</p>;
}

function MainLayout(props) {
    // <div className='body-wrapper'>
    //     <div className='content-wrapper'>
    //         <Layout className='app-layout'>
    //             <Sidebar {...props} />
    //             <Layout className='app-layout__right'>
    //                 <Header />
    //                 <LoadingComponent />
    //                 <MainContent {...props} component={Component} />
    //             </Layout>
    //         </Layout>
    //     </div>
    // </div>
    return (
        <div>
            <Header />
            <props.component />
        </div>
    );
}

// MainLayout.propTypes = {
// };

// MainLayout.defaultProps = {
// };

export default MainLayout;
