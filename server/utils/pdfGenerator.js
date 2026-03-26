// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// exports.generateCertificate = (student, id) => {
//   const uploadsDir = path.join(__dirname, "../uploads");

//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
//   }

//   const filePath = path.join(uploadsDir, `${id}.pdf`);

//   const doc = new PDFDocument({
//     size: "A4",
//     layout: "landscape",
//     margin: 40,
//   });

//   doc.pipe(fs.createWriteStream(filePath));

//   // GOLD BORDER
//   doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
//     .lineWidth(6)
//     .stroke("#D4AF37");

//   // HEADER
//   const logo = path.join(__dirname, "../templates/college-logo.png");

//   if (fs.existsSync(logo)) {
//     doc.image(logo, 60, 40, { width: 60 });
//   }

//   doc
//     .fontSize(26)
//     .text("YOUR COLLEGE NAME", 0, 40, { align: "center" });

//   doc
//     .fontSize(14)
//     .text("DEGREE CERTIFICATION", { align: "center" });

//   // CERTIFICATE ID
//   doc
//     .fontSize(12)
//     .text(`Certificate No:\n${id}`, 650, 50, { align: "right" });

//   // TITLE
//   doc.moveDown(2);
//   doc
//     .fontSize(24)
//     .text("Certificate of Achievement", { align: "center" });

//   // BODY
//   doc.moveDown(2);
//   doc.fontSize(14).text("This certificate is proudly awarded to", {
//     align: "center",
//   });

//   doc.moveDown();
//   doc
//     .fontSize(34)
//     .fillColor("#b8860b")
//     .text(student.name, { align: "center" });

//   doc.moveDown();
//   doc
//     .fontSize(16)
//     .fillColor("black")
//     .text(
//       "in recognition of successfully completing the academic program",
//       { align: "center" }
//     );

//   doc.moveDown();
//   doc
//     .fontSize(22)
//     .text(student.course, { align: "center" });

//   doc.moveDown();
//   doc
//     .fontSize(14)
//     .text(`Department: ${student.department}`, { align: "center" });

//   doc.text(`Year: ${student.year}`, { align: "center" });

//   // SEAL
//   doc.circle(420, 350, 40).fill("#D4AF37");
//   doc
//     .fillColor("white")
//     .fontSize(10)
//     .text("OFFICIAL\nSEAL", 395, 340, { align: "center" });

//   // FOOTER
//   doc.moveDown(5);
//   doc
//     .fillColor("black")
//     .fontSize(14)
//     .text("Given at Chennai, India", { align: "center" });

//   doc.end();

//   return filePath;
// };


const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { getCertificateHTML } = require("../templates/certificateTemplate");

exports.generateCertificate = async (student, id) => {
  const uploadsDir = path.join(__dirname, "../uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, `${id}.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = getCertificateHTML(student, id);

  await page.setContent(html, { waitUntil: "load" });

  await page.pdf({
    path: filePath,
    format: "A4",
    landscape: true,
    printBackground: true, 
  });

  await browser.close();

  return filePath;
};