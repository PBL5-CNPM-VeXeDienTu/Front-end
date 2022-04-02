import React from 'react';
import Header from 'components/header';

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
