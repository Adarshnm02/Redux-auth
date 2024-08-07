import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivetRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};




const PrivetRouteForAdmin = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  console.log("Privet route for admin", currentAdmin);
  if(!currentAdmin || currentAdmin.admin === false) return <Navigate to="/admin-login"/>
  return currentAdmin? <Outlet/> : <Navigate to="/admin-login" />
 }

 export { PrivetRoute , PrivetRouteForAdmin};