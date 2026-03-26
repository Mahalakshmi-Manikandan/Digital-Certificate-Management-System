import React from "react";

export default function CertificatePreview({
  name,
  course,
  year,
  certificateId,
  collegeName = "Takshashila University",
  city = "Ongur,Tindivanam",
  date,
}) {

  const today = new Date();
  const day = date || today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const fullYear = year || today.getFullYear();

  return (

    <div className="flex justify-center mt-10 bg-gray-100 p-6">

      {/* 🔥 Outer Gold Border */}
      <div className="p-[6px] rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 shadow-2xl">

        {/* 🔥 Inner Card */}
        <div className="relative w-[1000px] h-[650px] bg-white rounded-xl p-10 overflow-hidden">

          {/* 🔵 Watermark */}
          <img
            src="/college-logo.png"
            alt="watermark"
            className="absolute opacity-10 w-[420px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />

          {/* 🔵 Header */}
          <div className="flex justify-between items-center">

            {/* Logo */}
            <img
              src="/college-logo.png"
              alt="logo"
              className="h-16"
            />

            {/* College Name */}
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-wide text-gray-800">
                {collegeName}
              </h1>
              <p className="text-sm tracking-widest text-gray-500">
                DEGREE CERTIFICATION
              </p>
            </div>

            {/* Certificate ID */}
            <div className="text-right text-sm">
              <p className="font-semibold text-gray-600">Certificate No</p>
              <p className="font-bold text-gray-800">
                {certificateId || "AUTO-ID"}
              </p>
            </div>

          </div>

          {/*  Title */}
          <div className="text-center mt-6">
            <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-wide">
              Certificate of Achievement
            </h2>
            <div className="w-32 h-[2px] bg-yellow-500 mx-auto mt-2"></div>
          </div>

          {/*  Body */}
          <div className="mt-10 text-center px-12 leading-relaxed text-lg text-gray-700">

            <p className="italic">This certificate is proudly awarded to</p>

            <h2 className="text-5xl font-bold text-yellow-700 mt-4 tracking-wide">
              {name || "Recipient Name"}
            </h2>

            <p className="mt-6">
              in recognition of successfully completing the academic program
            </p>

            <h3 className="text-2xl font-semibold mt-3 text-gray-900">
              {course || "Degree Program"}
            </h3>

            <p className="mt-5">
              With all the Rights, Honors, and Privileges pertaining to that degree.
            </p>

            <p className="mt-5 px-6 text-[15px] text-gray-600">
              Your hard work, dedication, and commitment to academic excellence
              have enabled you to achieve this milestone. We wish you continued
              success in all your future endeavors.
            </p>

            <p className="mt-6 font-medium">
              Given at <b>{city}</b>, this <b>{day}</b> day of{" "}
              <b>{month}</b>, <b>{fullYear}</b>.
            </p>

          </div>

          {/*  Seal (Gold Badge) */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg border-4 border-yellow-700">
              <span className="text-xs font-bold text-center text-white">
                OFFICIAL<br />SEAL
              </span>
            </div>

          </div>

          {/* 🔥 Signatures */}
          <div className="flex justify-between mt-16 px-20">

            <div className="text-center">
              <div className="h-12"></div>
              <hr className="w-48 border-gray-700" />
              <p className="mt-2 font-semibold text-gray-700">
                Chancellor / President
              </p>
            </div>

            <div className="text-center">
              <div className="h-12"></div>
              <hr className="w-48 border-gray-700" />
              <p className="mt-2 font-semibold text-gray-700">
                Dean / Registrar
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}