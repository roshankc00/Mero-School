import './App.css'
import {Route,Routes} from 'react-router-dom'
import SignIn from './pages/Signin/index'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/Signup'
import { ToastContainer} from 'react-toastify';
import Sidebar from './components/Sidebar'
import Lectures from './pages/Lectures'
import Sections from './pages/Sections'
import AddLectureForm from './components/AddLectureForm'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/lecture' element={<Lectures/>}/>
      <Route path='/section' element={<Sections/>}/>
      <Route path='/addlectureform' element={<AddLectureForm/>}/>
      <Route path='/' element={<Sidebar/>}>
          <Route path='/dashboard' element={<Dashboard/>
       }/>
      </Route>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
