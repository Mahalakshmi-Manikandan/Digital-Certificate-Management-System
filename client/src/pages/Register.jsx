import { useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    school: "",
    department: "",
    course: "",
    designation: "",
    email: "",
    password: ""
  })

  const register = async () => {
    try {
      await API.post("/auth/register", form)
      alert("Registered Successfully")
    } catch (err) {
      console.error(err)
      alert("Registration Failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <Card className="w-96">

        <CardContent className="space-y-4 p-6">

          <h2 className="text-xl font-bold">
            Register
          </h2>

          {/* Name */}
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* School */}
          <select
            className="w-full border p-2"
            value={form.school}
            onChange={(e) =>
              setForm({ ...form, school: e.target.value })
            }
          >
            <option value="">Select School</option>
            <option>School of Arts and Science</option>
            <option>School of Engineering and Technology</option>
            <option>School of Computational Engineering</option>
            <option>School of Business</option>
            <option>School of Agriculture</option>
            <option>School of Physiotherapy</option>
          </select>

          {/* Department */}
          <select
            className="w-full border p-2"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          >
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

          {/* Course */}
          {/* <select
            className="w-full border p-2"
            value={form.course}
            onChange={(e) =>
              setForm({ ...form, course: e.target.value })
            }
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
          </select> */}

          {/* Designation */}
          <Input
            placeholder="Designation"
            value={form.designation}
            onChange={(e) =>
              setForm({ ...form, designation: e.target.value })
            }
          />

          {/* Email */}
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button
            className="w-full"
            onClick={register}
          >
            Register
          </Button>

          <p>
            Already have account ?
            <Link to="/" className="text-blue-600 ml-1">
              Login
            </Link>
          </p>

        </CardContent>

      </Card>

    </div>
  )
}