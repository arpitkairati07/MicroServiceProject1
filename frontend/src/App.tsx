import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import { useUserData } from './context/UserContext';
import Loading from './components/Loading';

const App =() =>{
  const {isAuth,loading} = useUserData();
  return <>
  {loading ? (
    <Loading></Loading>
  ) : (<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/login' element={isAuth ? <Home></Home> : <Login></Login>}></Route>
  </Routes>

  </BrowserRouter>) }
   </>
}
export default App;