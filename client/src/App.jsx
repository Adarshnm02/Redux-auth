import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { PrivetRoute, PrivetRouteForAdmin } from "./components/PrivetRoute";
import AdminSignIn from "./Admin/AdminSignIn";
import AdminDash from "./Admin/AdminDash";
import AdminHeader from "./components/AdminHeader";
import AdminEdit from "./Admin/AdminEdit";


const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
   <>
     {!isAdminRoute && <Header />}
     {isAdminRoute && <AdminHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivetRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin-login" element={<AdminSignIn />} />
        <Route element={<PrivetRouteForAdmin />}>
          <Route path="/admin-home" element={<AdminDash />} />
          <Route path="/admin-edit/:id" element={<AdminEdit />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
