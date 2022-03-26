import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserContext } from 'hooks/UserContext';

import Login from 'pages/login';
import Register from 'pages/register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={"User data goes here"}>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
