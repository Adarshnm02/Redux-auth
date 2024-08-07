import { Link, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { signOut } from "../redux/admin/adminSlice";
import { useDispatch } from "react-redux";
const AdminHeader = () => {
//   const { currentAdmin } = useSelector(state => state.admin)

    const dispatch = useDispatch()
  const handleClickSignout = async () => {
    try {
      await fetch('/api/adminAuth/admin-signout')
      dispatch(signOut())
      Navigate('/admin-login')
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Admin Dashboard</h1>

        <ul className="flex gap-4">
          {/* <li>
            <Link to="/admin-home">Home</Link>
          </li> */}
            <span onClick={handleClickSignout} className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Sign Out</span>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
