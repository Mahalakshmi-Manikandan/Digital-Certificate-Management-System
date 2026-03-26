import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async () => {

try {

const res = await API.post("/auth/login",{email,password});

// SAVE TOKEN
localStorage.setItem("token",res.data.token);

// SAVE USER DATA
const userData = res.data.user ? res.data.user : {
name: res.data.name,
department: res.data.department,
designation: res.data.designation
};

localStorage.setItem("user",JSON.stringify(userData));

navigate("/dashboard");

} catch(err){

console.log(err);
alert("Login Failed");

}

};

return (

<div className="grid grid-cols-2 h-screen">

{/* LEFT SIDE FORM */}

<div className="relative flex justify-center items-center bg-white">

{/* COLLEGE LOGO OUTSIDE CARD */}

<img
src="/college-logo.png"
alt="logo"
className="absolute top-6 left-6 h-14"
/>

<Card className="w-96 shadow-lg">

<CardContent className="space-y-4 p-6">

<h2 className="text-2xl font-bold">
Login
</h2>

<Input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<Input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<Button className="w-full" onClick={handleLogin}>
Login
</Button>

<p className="text-sm">
Don't have an account?{" "}
<Link to="/register" className="text-blue-600">
Register
</Link>
</p>

</CardContent>

</Card>

</div>


{/* RIGHT SIDE IMAGE */}

<div
className="bg-cover bg-center"
style={{
backgroundImage:"url('/certificate-login.jpg')"
}}
>

</div>

</div>

);

}