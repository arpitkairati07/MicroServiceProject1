import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';

const App =() =>{
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
  </Routes>

  </BrowserRouter> 
   </>
}
export default App;