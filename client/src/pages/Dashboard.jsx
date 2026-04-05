import { useState, useEffect } from "react"
import API from "../services/api"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"

export default function Dashboard() {

  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [department, setDepartment] = useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [email, setEmail] = useState("")

  const [file, setFile] = useState(null)
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"))
    setUser(u)
  }, [])

  const generate = async () => {


    if (!name || !course || !email) {
      alert("Name, Course, Email are required")
      return
    }

    try {

      await API.post("/certificates/single", {
        name,  
        school,
        department,
        course,
        year,
        email
      })

      alert("Certificate Generated")

    } catch (err) {
      console.log(err.response?.data || err)
      alert(err.response?.data?.message || "Error occurred")
    }
  }

  const uploadCSV = async () => {
    try {

      if (!file) {
        alert("Please select a CSV file")
        return
      }

      const formData = new FormData()
      formData.append("file", file)

      await API.post("/certificates/bulk", formData) 

      alert("CSV Uploaded Successfully")

    } catch (err) {
      console.log(err.response?.data || err)
      alert("Upload Failed")
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="p-10 space-y-6">

        {/* USER DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle>Logged User</CardTitle>
          </CardHeader>

          <CardContent className="flex justify-between">
            <div>
              <p><b>Name :</b> {user?.name}</p>
              <p><b>School :</b> {user?.school}</p>
              <p><b>Department :</b> {user?.department}</p>
              <p><b>Designation:</b>{user?.desgination}</p>
              <p><b>Email :</b> {user?.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* GENERATE CERTIFICATE */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Certificate</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <Input placeholder="Student Name"
              onChange={(e) => setName(e.target.value)} />

            <select className="w-full border p-2"
              value={school}
              onChange={(e) => setSchool(e.target.value)}>

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
              onChange={(e) => setDepartment(e.target.value)}>

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
              onChange={(e) => setCourse(e.target.value)}
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

            <Input placeholder="Year"
              onChange={(e) => setYear(e.target.value)} />

            <Input placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} />

            <Button onClick={generate}>
              Generate
            </Button>

          </CardContent>
        </Card>

        {/* CSV UPLOAD */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Bulk CSV Upload</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <Input type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])} />

            <Button onClick={uploadCSV}>
              Upload
            </Button>

          </CardContent>
        </Card> */}

      </div>

    </div>
  )
}