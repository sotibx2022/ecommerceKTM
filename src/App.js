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
<BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <AppLayout>
                <Cart />
              </AppLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AppLayout>
                <Register />
              </AppLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AppLayout>
                <Login />
              </AppLayout>
            }
          />
          <Route
            path="/allproducts"
            element={
              <AppLayout>
                <AllProducts />
              </AppLayout>
            }
          />
           <Route
            path="/allnewproducts"
            element={
              <AppLayout>
                <AllNewProducts />
              </AppLayout>
            }
          />
          <Route
            path="/about"
            element={
              <AppLayout>
                <About />
              </AppLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <AppLayout>
                <Contact />
              </AppLayout>
            }
          />

          <Route
            path="/allproducts/productdetails/:productName/:productId"
            element={
              <AppLayout>
                <ProductDetails />
              </AppLayout>
            }
          />

          <Route
            path="/newproducts/newproductdetails/:productName/:productId"
            element={
              <AppLayout>
                <NewProductDetails />
              </AppLayout>
            }
          />

          <Route
            path="/allproducts/search"
            element={
              <AppLayout>
                <AllProducts />
              </AppLayout>
            }
          />
          <Route
            path="/reset"
            element={
              <AppLayout>
                <Reset />
              </AppLayout>
            }
          />
          {/* ------------------------FOR REGISTERED USER ----------------- */}

          <Route
            path="/accountdetails"
            element={
              <RegisteredUser>
                <AppLayout></AppLayout>
                <AccountDetails />
              </RegisteredUser>
            }
          />
        
          <Route
            path="/orders"
            element={
              <RegisteredUser>
                <AppLayout>
                  <Orders />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/orderdetails/:orderId"
            element={
              <RegisteredUser>
                <AppLayout>
                  <OrderDetails />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/profile"
            element={
              <RegisteredUser>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </RegisteredUser>
            }
          />
        
          <Route
            path="/profile/edit"
            element={
              <RegisteredUser>
                <AppLayout>
                  <EditProfile />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/profileoptions"
            element={
              <RegisteredUser>
                <AppLayout>
                  <ProfileOptions />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/reviews"
            element={
              <RegisteredUser>
                <AppLayout>
                  <Reviews />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/reviews/reviewedit"
            element={
              <RegisteredUser>
                <AppLayout>
                  <ReviewEdit />
                </AppLayout>
              </RegisteredUser>
            }
          />
          <Route
            path="/shipping"
            element={
              <AppLayout>
                <ShippingDetails />
              </AppLayout>
            }
          />

          {/* -----------------FOR ADMIN---------------------------- */}
          <Route
            path="/dashboard"
            element={
              <RegisteredAdmin>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/dashboard/notifications"
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
            path="/dashboard/orders"
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
            path="/dashboard/products"
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
            path="/dashboard/addproduct"
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
            path="/dashboard/products/edit/:productId"
            element={
              <RegisteredAdmin>
            
                <DashboardLayout>
                  <DashboardAddProducts />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/dashboard/reviews"
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
            path="/dashboard/slider"
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
            path="/dashboard/addslider"
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
            path="/dashboard/slider/editSlider/:editId"
            element={
              <RegisteredAdmin>
            
                <DashboardLayout>
                  <DashboardAdSlider />
                </DashboardLayout>
              </RegisteredAdmin>
            }
          />
          <Route
            path="/dashboard/users"
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
