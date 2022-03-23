import Login from 'pages/login';
import Register from 'pages/register'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
