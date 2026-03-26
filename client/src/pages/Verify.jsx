import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Verify() {

  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const verify = async () => {

    try {

      const res = await API.get(`/certificates/verify/${id}`);

      if (res.data.valid) {
        setData(res.data.data);
      } else {
        alert("Invalid Certificate");
        setData(null);
      }

    } catch (err) {
      console.log(err);
      alert("Verification Failed");
    }

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="p-10 space-y-4">

        <h2 className="text-xl font-bold">
          Verify Certificate
        </h2>

        <Input
          placeholder="Enter Certificate ID"
          onChange={(e) => setId(e.target.value)}
        />

        <Button onClick={verify}>
          Verify
        </Button>

        {data && (

          <div className="bg-white p-4 shadow mt-4 space-y-1">

            <p><b>Name:</b> {data.student_name}</p>
            <p><b>Department:</b> {data.department}</p>
            <p><b>Course:</b> {data.course}</p>
            <p><b>Year:</b> {data.year}</p>
            <p><b>Email:</b> {data.email}</p>
            <p><b>Certificate ID:</b> {data.certificate_id}</p>

          </div>

        )}

      </div>

    </div>

  );

}