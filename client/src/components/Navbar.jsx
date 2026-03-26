import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

return (

<nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

<h1 className="text-lg font-bold">
Takshashila Certificates
</h1>

<div className="space-x-6">

<Link to="/dashboard" className="hover:text-gray-300">
Dashboard
</Link>

<Link to="/admin" className="hover:text-gray-300">
Admin
</Link>

<Link to="/verify" className="hover:text-gray-300">
Verify
</Link>

<button
onClick={logout}
className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
>
Logout
</button>

</div>

</nav>

);

}