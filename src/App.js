import Main from './pages/Customer/Main';
import ComplainAdminPage from './pages/Admin/Complain';
import Auth from "./pages/Auth/Auth.jsx"
import Profile from './pages/Customer/Profile';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css"
import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import UpdateProfile from './pages/Customer/Update-profile';
import { API, setAuthToken } from './config/API';
import { UserContext } from './context/user-context';
import AboutUs from './pages/Customer/About-us';
import AdminProduct from './pages/Admin/Product';
import AddProduct from './pages/Admin/Add-Product';
import EditProduct from './pages/Admin/Edit-Product';
import DetailProduct from './pages/Customer/Detail-Product';
import Categories from './pages/Admin/Category';
import EditCategory from './pages/Admin/Edit-Categories';
import AddCategory from './pages/Admin/Add-Category';
import ComplainCustomer from './pages/Customer/Complain';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {

  let navigate = useNavigate()
        const [state, dispatch] = useContext(UserContext)

        useEffect(() => {
          if (localStorage.token) {
            setAuthToken(localStorage.token)
            } else {
              if(state.customerLogin === true){
                navigate('/')
              } else if (state.adminLogin === true){
                navigate('/Complain-admin')
              } else {
                navigate('/Auth')
              }
            }
            },[state])

        const checkUser = async () => {
            try {
                const config = {
                    method: "GET",
                    headers: {
                      Authorization: "Basic " + localStorage.token,
                    },
                  };
            const response = await API.get("/check-auth", config)

            // If the token incorrect
            if (response.status === "failed") {
                return dispatch({
                type: 'AUTH_ERROR',
                })
            }

            // Get user data
            let payload = response.data.data.user
            // Get token from local storage
            payload.token = localStorage.token

            // Send data to useContext
            dispatch({
                type: 'USER_SUCCESS',
                payload,
                })
            } catch (error) {
            console.log(error)
            }
        }

        useEffect(() => {
            if (localStorage.token) {
            checkUser()
            }
        }, [])

  return (
    <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/profile/:id' element={<UpdateProfile/>}/>
        <Route exact path='/category/:id' element={<EditCategory/>}/>
        <Route exact path='/add-category' element={<AddCategory/>}/>
        <Route exact path='/product/:id' element={<DetailProduct/>}/>
        <Route exact path='/categories' element={<Categories/>}/>
        <Route exact path='/edit-product/:id' element={<EditProduct/>}/>
        <Route exact path='/product-admin' element={<AdminProduct/>}/>
        <Route exact path='/add-product' element={<AddProduct/>}/>
        <Route exact path='/about-us' element={<AboutUs/>}/>
        <Route exact path='/Auth' element={<Auth/>}/>
        <Route exact path='/Complain-admin' element={<ComplainAdminPage/>}/>
        <Route exact path='/Complain-customer' element={<ComplainCustomer/>}/>
    </Routes>
  );
}

export default App;
