import {useState,useEffect} from "react"
import API from "../services/api"

import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import Navbar from "@/components/Navbar"

export default function Admin(){

const [data,setData]=useState([])

const [school,setSchool]=useState("")
const [department,setDepartment]=useState("")
const [course,setCourse]=useState("")

useEffect(()=>{

fetchData()

},[])

const fetchData = async()=>{

const res = await API.get("/certificates/all")

setData(res.data)

}

const filtered = data.filter(c=>

(!school || c.school===school) &&
(!department || c.department===department) &&
(!course || c.course===course)

)

return(

<div className="bg-gray-100 min-h-screen">
    <Navbar />
    <div className="p-10 space-y-6">

<Card>

<CardHeader>
<CardTitle>Filter</CardTitle>
</CardHeader>

<CardContent className="flex gap-4">
<select className="w-full border p-2"
value={school}
onChange={(e)=>setSchool(e.target.value)}>

<option value="">Select School</option>
<option>School of Arts and Science</option>
<option>School of Engineering and Technology</option>
<option>School of Computational Engineering</option>
<option>School of Business</option>
<option>School of Agriculture</option>
<option>School of Physiotherapy</option>

</select>


<select className="w-full border p-2"
value={department}
onChange={(e)=>setDepartment(e.target.value)}>

<option value="">Select Department</option>
<option>Engineering (Core & Computational)</option>
<option>Management</option>
<option>Commerce</option>
<option>Arts & Science</option>
<option>Agricultural Sciences</option>
<option>Pharmacy</option>
<option>Nursing</option>
<option>Allied Health Sciences</option>
<option>Physiotherapy</option>

</select>


<select
className="w-full border p-2"
value={course}
onChange={(e)=>setCourse(e.target.value)}
>

<option value="">Select Course</option>

<option>B.Tech Computer Science and Engineering</option>
<option>B.Tech Artificial Intelligence and Data Science</option>
<option>B.Tech CSE (AI&ML)</option>
<option>B.Tech Information Technology</option>
<option>B.Tech CSE (Cyber Security)</option>
<option>B.Tech CSE (Applied AI)</option>

<option>M.Tech Computer Science and Engineering (AI)</option>
<option>M.Tech Computer Science and Engineering (Big Data)</option>
<option>M.Tech Computer Science and Engineering (IoT Cloud Computing)</option>

<option>Ph.D Computer Science & Engineering</option>

<option>Bachelor of Arts [B.A] - Full Time</option>
<option>Bachelor of Arts [B.A] (Economics) - Full Time</option>
<option>Bachelor of Commerce [B.Com] - Full Time</option>
<option>Bachelor of Optometry [B.Optom] - Full Time</option>
<option>Bachelor of Science [B.Sc] - Full Time</option>
<option>Bachelor of Science [B.Sc] (Allied Health Sciences) - Full Time</option>
<option>Bachelor of Science [B.Sc] (Hotel Management) - Full Time</option>
<option>Certificate Course in Hotel Management - Full Time</option>
<option>Diploma in Catering & Hotel Administration - Full Time</option>

<option>Master of Arts [M.A] - Full Time</option>
<option>Master of Commerce [M.Com] - Full Time</option>
<option>Master of Science [M.Sc] - Full Time</option>
<option>Master of Social Work [MSW] - Full Time</option>
<option>Ph.D - Full Time</option>

<option>Bachelor of Business Administration [BBA] - Full Time</option>
<option>Bachelor of Computer Application [BCA] - Full Time</option>
<option>Bachelor of Pharmacy [B.Pharm] - Full Time</option>
<option>Bachelor of Physiotherapy [BPT] - Full Time</option>
<option>Bachelor of Science [B.Sc] (Nursing) - Full Time</option>
<option>Bachelor of Science [B.Sc] (Agriculture Sciences) - Full Time</option>
<option>Bachelor of Technology [B.Tech] - Full Time</option>

<option>Master of Business Administration [MBA] - Full Time</option>
<option>Master of Computer Application [MCA] - Full Time</option>
<option>Master of Technology [M.Tech] - Full Time</option>

</select>


</CardContent>

</Card>


<Card>

<CardHeader>
<CardTitle>Certificates</CardTitle>
</CardHeader>

<CardContent>

<table className="w-full border">

<thead className="bg-gray-200">

<tr>

<th>Name</th>
<th>School</th>
<th>Department</th>
<th>Course</th>
<th>Year</th>
<th>Email</th>
<th>Certificate ID</th>

</tr>

</thead>

<tbody>

{filtered.map((c,i)=>(

<tr key={i} className="border">

<td>{c.student_name}</td>
<td>{c.school}</td>
<td>{c.department}</td>
<td>{c.course}</td>
<td>{c.year}</td>
<td>{c.email}</td>
<td>{c.certificate_id}</td>

</tr>

))}

</tbody>

</table>

</CardContent>

</Card>

</div>

</div>

)

}