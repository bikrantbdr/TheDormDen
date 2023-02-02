import RegisterUser from './Pages/RegisterUser';
import RegisterHostelPage from './Pages/RegisterHostelPage';
import Homepage from './Pages/Homepage';
import {Routes , Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>

    <Route path="/" element={ <Homepage /> }/>
    <Route path="/register/user" element={<RegisterUser/>}/>
    <Route path="/register/hostel" element={<RegisterHostelPage/>}/>
    {/* <Route path="/login" element={}/>
    <Route path="/hostels/:id" element={}/>
    <Route path="/search_results" element={}/> */}
    </Routes>

    {/* <RegisterUser/> */}
    <RegisterHostelPage/>
    </>
  );
}

export default App;
