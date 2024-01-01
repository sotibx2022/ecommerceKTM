import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import {
  Home,
  Cart,
  Register,
  Login,
  Reset,
  Dashboard,
  AllProducts,
  About,
  Contact,
  ProductDetails,
  NewProductDetails,
  EditProfile,
  ShippingDetails,
} from "./pages";
import {
  AccountDetails,
  AppLayout,
  Orders,
  Profile,
  ProfileOptions,
  Reviews,
  ReviewEdit,

  OrderDetails,
  AllNewProducts,

} from "./components/index";
import { Toaster } from "react-hot-toast";
import {

  DashboardNotifications,
  DashboardOrders,
  DashboardAddProducts,
  DashboardNewProducts,
  DashboardReviews,
  DashboardSlider,
  DashboardAdSlider,
  DashboardUsers,
} from "./pages/dashboard";
import { RegisteredUser, RegisteredAdmin } from "./functions/RouteProtection";
import DashboardLayout from "./components/dashboard/dashboardLayout/DashboardLayout";


const App = () => {

  return (
    <div>
<BrowserRouter basename="ecommerceKTM">
        <Toaster />
        <Routes>
          <Route
            path="/ecommerceKTM/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/cart"
            element={
              <AppLayout>
                <Cart />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/register"
            element={
              <AppLayout>
                <Register />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/login"
            element={
              <AppLayout>
                <Login />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/allproducts"
            element={
              <AppLayout>
                <AllProducts />
              </AppLayout>
            }
          />
           <Route
            path="/ecommerceKTM/allnewproducts"
            element={
              <AppLayout>
                <AllNewProducts />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/about"
            element={
              <AppLayout>
                <About />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/contact"
            element={
              <AppLayout>
                <Contact />
              </AppLayout>
            }
          />

          <Route
            path="/ecommerceKTM/allproducts/productdetails/:productName/:productId"
            element={
              <AppLayout>
                <ProductDetails />
              </AppLayout>
            }
          />

          <Route
            path="/ecommerceKTM/newproducts/newproductdetails/:productName/:productId"
            element={
              <AppLayout>
                <NewProductDetails />
              </AppLayout>
            }
          />

          <Route
            path="/ecommerceKTM/allproducts/search"
            element={
              <AppLayout>
                <AllProducts />
              </AppLayout>
            }
          />
          <Route
            path="/ecommerceKTM/reset"
            element={
              <AppLayout>
                <Reset />
              </AppLayout>
            }
          />
          {/* ------------------------FOR REGISTERED USER ----------------- */}

          <Route
            path="/ecommerceKTM/accountdetails"
            element={
              <RegisteredUser>
                <AppLayout></AppLayout>
                <AccountDetails />
              </RegisteredUser>
            }
          />
        
          <Route
            path="/ecommerceKTM/orders"
            element={
              <RegisteredUser>
                <AppLayout>
                  <Orders />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/ecommerceKTM/orderdetails/:orderId"
            element={
              <RegisteredUser>
                <AppLayout>
                  <OrderDetails />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/ecommerceKTM/profile"
            element={
              <RegisteredUser>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </RegisteredUser>
            }
          />
        
          <Route
            path="/ecommerceKTM/profile/edit"
            element={
              <RegisteredUser>
                <AppLayout>
                  <EditProfile />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/ecommerceKTM/profileoptions"
            element={
              <RegisteredUser>
                <AppLayout>
                  <ProfileOptions />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/ecommerceKTM/reviews"
            element={
              <RegisteredUser>
                <AppLayout>
                  <Reviews />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/ecommerceKTM/reviews/reviewedit"
            element={
              <RegisteredUser>
                <AppLayout>
                  <ReviewEdit />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/ecommerceKTM/shipping"
            element={
              <AppLayout>
                <ShippingDetails />
              </AppLayout>
            }
          />

          {/* -----------------FOR ADMIN---------------------------- */}
          <Route
            path="/ecommerceKTM/dashboard"
            element={
              <RegisteredAdmin>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/notifications"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardNotifications />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/orders"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardOrders />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/products"
            element={
              <RegisteredAdmin>
                <DashboardLayout>
                  {" "}
                  <DashboardNewProducts />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/addproduct"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardAddProducts />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
           <Route
            path="/ecommerceKTM/dashboard/products/edit/:productId"
            element={
              <RegisteredAdmin>
            
                <DashboardLayout>
                  <DashboardAddProducts />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/reviews"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardReviews />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/slider"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardSlider />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/addslider"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardAdSlider />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
           <Route
            path="/ecommerceKTM/dashboard/slider/editSlider/:editId"
            element={
              <RegisteredAdmin>
            
                <DashboardLayout>
                  <DashboardAdSlider />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/ecommerceKTM/dashboard/users"
            element={
              <RegisteredAdmin>
                {" "}
                <DashboardLayout>
                  <DashboardUsers />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
};

export default App;
