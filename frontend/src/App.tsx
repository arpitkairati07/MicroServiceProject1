import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import { useUserData } from './context/UserContext';
import Loading from './components/Loading';
import Register from './pages/Register';
import Album from './pages/Album';

const App =() =>{
  const {isAuth,loading} = useUserData();
  return <>
  {loading ? (
    <Loading></Loading>
  ) : (<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
       <Route path='/album/:id' element={<Album></Album>}></Route>
    <Route path='/login' element={isAuth ? <Home></Home> : <Login></Login>}></Route>
    <Route path='/register' element={isAuth ? <Home></Home> : <Register></Register>}></Route>
  </Routes>

  </BrowserRouter>) }
   </>
}
export default App;