import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { UserContext } from 'hooks/UserContext';

import Login from 'views/pages/login';
import Register from 'views/pages/register';
// import Routes from 'views/routes'
import AllRoutes from 'views/routes'



function App() {
    return (
        <AllRoutes/>
    );
}

export default App;
