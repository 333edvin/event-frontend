import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Auth from './Pages/Auth';
import PageNotFound from './Pages/PageNotFound';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Gallery from './Pages/Gallery';
import About from './Pages/About';
import WeddForm from './Pages/WeddForm';
import UserProfile from './Pages/User/UserProfile';
import Venue from './Pages/User/Venue';
import WeddInfo from './Pages/User/WeddInfo';
import { ItemProvider } from './Contexts/ItemContext';
import PrivateRoute from './Components/Route/PrivateRoute.js';
import AdminRoute from './Components/Route/AdminRoute.js';
import Dashboard from './Pages/User/Dashboard.jsx';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <div className="App">
      <Header/>
      <main>
      <ToastContainer />
  <ItemProvider>
<Routes>

  <Route path='/' element={<Homepage/>}/>

  <Route path='/login' element={<Auth/>}/>
  <Route path='/register' element={<Auth register/>}/>

  <Route path='/dashboard' element={<PrivateRoute/>}>
  <Route path='' element={<UserProfile/>}/>
  <Route path='/dashboard/gallery' element={<Gallery/>}/>
  <Route path='/dashboard/weddform' element={<WeddForm/>}/>
  <Route path='/dashboard/weddinfo' element={<WeddInfo/>}/>
  <Route path='/dashboard/venueselect' element={<Venue/>}/>
  </Route>

  <Route path='/dashbaord' element={<AdminRoute/>}>
    <Route path='' element={<Dashboard/>}/>
  </Route>
  
  <Route path='/about' element={<About/>}/>
  <Route path='/gallery' element={<Gallery/>}/>
  <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
  <Route path='*' element={<PageNotFound/>}/>
</Routes>
  </ItemProvider>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
