import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/Signin'
import Profile from './pages/Profile'
import SignUp from './pages/Signup'
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Coupons from './pages/Coupons'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword'
import Category from './pages/Category'
import { ToastContainer } from 'react-toastify'
import CreateCoupon from './pages/CreateCoupon'
import EditListing from './pages/EditListing'
import Contact from './pages/Contact'
import LoadCoupon from './pages/LoadCoupon'
import 'react-toastify/dist/ReactToastify.css'
import CreateNewCoupon from './pages/CreateNewCoupon'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Explore />}>
                        {' '}
                    </Route>
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/sign-in" element={<SignIn />}></Route>
                    <Route path="/sign-up" element={<SignUp />}></Route>
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />}></Route>
                    </Route>

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/create-coupon" element={<CreateCoupon />} />
                    <Route
                        path="/create-new-coupon"
                        element={<CreateNewCoupon />}
                    />
                    <Route
                        path="/category/:categoryName"
                        element={<Category />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/edit-listing/:couponId"
                        element={<EditListing />}
                    />
                    <Route
                        path="/category/:categoryName/:couponId"
                        element={<LoadCoupon />}
                    />

                    <Route path="/contact/:couponId" element={<Contact />} />
                </Routes>
                <Navbar></Navbar>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
