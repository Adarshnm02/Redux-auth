import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [errorSearch, setErrorSearch] = useState(null);
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    fetch("/api/adminAuth/userDetails")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/adminAuth/deleteUser/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log("Fetching Fail");
        return;
      }
      const data = await res.json();
      console.log("User deleted: ", data);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  const handleSearch = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
    console.log(formData);
    
  };

  const search = async () => {
    try {
      const res = await fetch('/api/adminAuth/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        console.log("Search unsuccessful");
        return;
      }
      if(data.error){
        console.log(data.error);
        setError(data.error)
        return;
      }
      setUsers(data)
      console.log("Search Successful");
      
    } catch (error) {
      console.log("Error while searching ", error);
      
    }
  } 

  const handleEdit=(userId)=>{
    console.log('clicked');
    navigate(`/admin-edit/${userId}`)
  }


  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">
          User Details
        </h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              onChange={handleSearch}
              type="text"
              id="search"
              placeholder="Enter name"
              className="bg-slate-200 px-4 py-2 rounded-md mr-4"
            />
            <button onClick={search} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Search
            </button>
          </div>
          <div className="flex items-center">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Create
            </button>
          </div>
        </div>
        {/* {errorSearch && <p className="text-red-500">{error}</p>} */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th  className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button onClick={()=>handleEdit(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDash;
