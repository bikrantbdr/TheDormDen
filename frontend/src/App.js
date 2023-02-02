import RegisterUser from './Pages/RegisterUser';
import RegisterHostelPage from './Pages/RegisterHostelPage';
import Homepage from './Pages/Homepage';
import Loginpage from './Pages/Loginpage';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Components/ForgotPassword/ChangePassword';

import {Routes , Route} from 'react-router-dom';
import { useState } from 'react';
import Cookies from "universal-cookie"; 

function App() {
  const cookies = new Cookies();
  const [ userInfo, setUserInfo ] = useState(null);

  return (
    <>
    <Routes>

      <Route path="/" element={ <Homepage /> }/>
      <Route path="/register/user" element={<RegisterUser/>}/>
      <Route path="/register/hostel" element={<RegisterHostelPage/>}/>
      <Route path="/login" element={<Loginpage cookies={ cookies } setUserInfo={ setUserInfo } />}/>
      <Route path='/forgot_password' element={ <ForgotPassword /> }/>
      <Route path='/reset_password/:id' element={ <ChangePassword /> }/>

    {/* <Route path="/hostels/:id" element={}/>
    <Route path="/search_results" element={}/> */}
    </Routes>

    {/* <RegisterUser/> */}
    {/* <RegisterHostelPage/> */}
    </>
  );
}

export default App;
