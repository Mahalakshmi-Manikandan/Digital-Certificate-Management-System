const fs = require("fs");
const path = require("path");

// Convert image to base64 once
const logoPath = path.join(__dirname, "college-logo.png");
const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
const logoSrc = `data:image/png;base64,${logoBase64}`;

exports.getCertificateHTML = (student, id) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const year = student.year || today.getFullYear();

  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f3f4f6;
        padding: 20px;
      }

      .outer {
        display: flex;
        justify-content: center;
      }

      .border-box {
        padding: 6px;
        border-radius: 12px;
        background: linear-gradient(to right, #b45309, #facc15, #b45309);
      }

      .container {
        position: relative;
        width: 1000px;
        height: 650px;
        background: #fff;
        border-radius: 12px;
        padding: 40px;
        overflow: hidden;
        text-align: center;
      }

      .watermark {
        position: absolute;
        opacity: 0.08;
        width: 420px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      /* FIXED HEADER */
      .header {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        align-items: center;
      }

      .logo {
        height: 60px;
      }

      .college-title {
        text-align: center;
      }

      .college-name {
        font-size: 32px;
        font-weight: bold;
        color: #1f2937;
      }

      .subtitle {
        font-size: 12px;
        letter-spacing: 3px;
        color: #6b7280;
      }

      .cert-id {
        text-align: right;
        font-size: 12px;
      }

      .cert-id b {
        font-size: 14px;
      }

      .title {
        margin-top: 20px;
        font-size: 26px;
        font-weight: bold;
      }

      .line {
        width: 120px;
        height: 2px;
        background: gold;
        margin: 8px auto;
      }

      .body {
        margin-top: 40px;
        font-size: 18px;
        color: #374151;
        line-height: 1.6;
      }

      .name {
        font-size: 42px;
        color: #b45309;
        font-weight: bold;
        margin-top: 15px;
      }

      .course {
        font-size: 22px;
        font-weight: 600;
        margin-top: 10px;
      }

      .desc {
        font-size: 14px;
        color: #6b7280;
        margin-top: 15px;
      }

      .date {
        margin-top: 20px;
        font-weight: 500;
      }

      .seal-container {
        position: absolute;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
      }

      .seal {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: linear-gradient(to bottom right, #eab308, #fde047, #ca8a04);
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px solid #a16207;
        color: white;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
      }

      .signatures {
        display: flex;
        justify-content: space-between;
        margin-top: 80px;
        padding: 0 60px;
      }

      .sign {
        text-align: center;
      }

      .line-sign {
        width: 150px;
        border-top: 1px solid #000;
        margin-top: 40px;
      }

      .sign p {
        margin-top: 5px;
        font-weight: 600;
      }
    </style>
  </head>

  <body>

    <div class="outer">
      <div class="border-box">

        <div class="container">

          <!-- Watermark -->
          <img src="${logoSrc}" class="watermark"/>

          <!-- Header -->
          <div class="header">

            <img src="${logoSrc}" class="logo"/>

            <div class="college-title">
              <div class="college-name">Takshashila University</div>
              <div class="subtitle">DEGREE CERTIFICATION</div>
            </div>

            <div class="cert-id">
              <div>Certificate No</div>
              <b>${id}</b>
            </div>

          </div>

          <div class="title">Certificate of Achievement</div>
          <div class="line"></div>

          <div class="body">

            <p><i>This certificate is proudly awarded to</i></p>

            <div class="name">${student.name}</div>

            <p>in recognition of successfully completing the academic program in the Duration of  <b>${year}</b> </p>

            <div class="course">${student.course}</div>

            <p>With all the Rights, Honors, and Privileges pertaining to that degree.</p>

            <p class="desc">
              Your hard work, dedication, and commitment to academic excellence
              have enabled you to achieve this milestone.
            </p>

            <p class="date">
              Given at <b>Ongur, Tindivanam</b>, this <b>${day}</b> day of 
              <b>${month}</b>.
            </p>

          </div>

          <!-- Seal -->
          <div class="seal-container">
            <div class="seal">OFFICIAL<br/>SEAL</div>
          </div>

          <!-- Signatures -->
          <div class="signatures">

            <div class="sign">
              <div class="line-sign"></div>
              <p>Chancellor / President</p>
            </div>

            <div class="sign">
              <div class="line-sign"></div>
              <p>Dean / Registrar</p>
            </div>

          </div>

        </div>

      </div>
    </div>

  </body>
  </html>
  `;
};