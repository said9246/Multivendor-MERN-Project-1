import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ShopHomePage from "./pages/Shop/ShopHomePage";
import {
  LoginPage,
  SignupPage,
    HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,    
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
      ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Routes.js";
//Data about shop only
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";

import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw
} from "./routes/AdminRoutes";






import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

//
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import { loadUser,loadSeller } from './redux/actions/user';
import Store from './redux/store';
import { server } from './server.js';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const App = () => {
    const [stripeApikey, setStripeApiKey] = useState("");
  
    async function getStripeApikey() {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApikey);
    }
 useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  
    

  
  return (
    <BrowserRouter>
          

      <Routes>

             <Route
  path="/payment"
  element={
    <ProtectedRoute>
      {stripeApikey ? (
        <Elements stripe={loadStripe(stripeApikey)}>
          <PaymentPage />
        </Elements>
      ) : (
        <div>Loading Payment...</div>
      )}
    </ProtectedRoute>
  }
/>


        <Route path="/login" element={<LoginPage />} />
        <Route path='/sign-Up' element={<SignupPage/>}/>
         <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
           
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage/>}/>
        <Route path='/events' element={<EventsPage/>}/>
        <Route path='/faq' element={<FAQPage/>}/>
         <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route   path="/profile"  element={
                               <ProtectedRoute>
                                 <ProfilePage />
                               </ProtectedRoute>    } />
          <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
             </SellerProtectedRoute>
          }
        />

          <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
          </SellerProtectedRoute>
          }
        />

         <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />

         <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />


         <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
            /> 

              <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />


          <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
                  path="/dashboard-orders"
                  element={
                    <SellerProtectedRoute>
                      <ShopAllOrders />
                    </SellerProtectedRoute>
                  }
                />

                
                 <Route
                          path="/user/order/:id"
                          element={
                            <ProtectedRoute>
                              <OrderDetailsPage />
                            </ProtectedRoute>
                          }
                        />

                   <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />

           <Route
                  path="/dashboard-refunds"
                  element={
                    <SellerProtectedRoute>
                      <ShopAllRefunds />
                    </SellerProtectedRoute>
                  }
                />

                 <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

         <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />

          <Route
                  path="/dashboard-withdraw-money"
                  element={
                    <SellerProtectedRoute>
                      <ShopWithDrawMoneyPage />
                    </SellerProtectedRoute>
                  }
                />
                 <Route
                  path="/dashboard-messages"
                  element={
                    <SellerProtectedRoute>
                      <ShopInboxPage />
                    </SellerProtectedRoute>
                  }
                /> 

                  <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />


           
        {/* Admin Routes */}
       <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
          
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        /> 

      
      </Routes>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </BrowserRouter>
  )
}

export default App
