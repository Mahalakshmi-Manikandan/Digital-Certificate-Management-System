const db = require("../config/db");
const { generateCertificate } = require("../utils/pdfGenerator");
const { sendCertificate } = require("../utils/mailer");
const XLSX = require("xlsx");
const { v4: uuidv4 } = require("uuid");


// SINGLE CERTIFICATE
exports.createSingle = async (req,res)=>{

try{

const {name,school,department,course,year,email}=req.body;

if(!name || !course || !email){
return res.status(400).json({message:"Missing fields"});
}

const id = uuidv4();

const filePath = generateCertificate(
{name,school,department,course,year},
id
);

await db.query(
`INSERT INTO certificates
(user_id,student_name,school,department,course,year,email,certificate_id,pdf_path)
VALUES(?,?,?,?,?,?,?,?,?)`,
[
req.user ? req.user.id : null,
name,
school,
department,
course,
year,
email,
id,
filePath
]
);

// await sendCertificate(email,filePath);

res.json({
success:true,
url:`http://localhost:5000/uploads/${id}.pdf`
});

}catch(err){
  console.log("ERROR 👉", err);  
  res.status(500).json({error:"Certificate generation failed"});
}

};



// BULK CERTIFICATE
exports.createBulk = async (req,res)=>{

try{

if(!req.file){
return res.status(400).json({message:"CSV required"});
}

const workbook = XLSX.readFile(req.file.path);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const students = XLSX.utils.sheet_to_json(sheet);

let urls=[];

for(const s of students){

const id = uuidv4();

const filePath = generateCertificate(s,id);

await db.query(
`INSERT INTO certificates
(user_id,student_name,school,department,course,year,email,certificate_id,pdf_path)
VALUES(?,?,?,?,?,?,?,?,?)`,
[
req.user ? req.user.id : null,
s.name,
s.school,
s.department,
s.course,
s.year,
s.email,
id,
filePath
]
);

// await sendCertificate(s.email,filePath);

urls.push(`http://localhost:5000/uploads/${id}.pdf`);

}

res.json({success:true,urls});

}catch(err){

console.log(err);
res.status(500).json({error:"Bulk generation failed"});

}

};



// VERIFY
exports.verifyCertificate = async (req,res)=>{

try{

const [rows] = await db.query(
"SELECT * FROM certificates WHERE certificate_id=?",
[req.params.id]
);

if(rows.length===0){
return res.json({valid:false});
}

res.json({valid:true,data:rows[0]});

}catch(err){

res.status(500).json({error:"Verification failed"});

}

};



// ADMIN FILTER
exports.getAllCertificates = async (req,res)=>{

try{

let query = "SELECT * FROM certificates WHERE 1=1";
const params=[];

if(req.query.school){
query+=" AND school=?";
params.push(req.query.school);
}

if(req.query.department){
query+=" AND department=?";
params.push(req.query.department);
}

if(req.query.course){
query+=" AND course=?";
params.push(req.query.course);
}

if(req.query.year){
query+=" AND year=?";
params.push(req.query.year);
}

query+=" ORDER BY id DESC";

const [rows] = await db.query(query,params);

res.json(rows);

}catch(err){

res.status(500).json({error:"Fetch failed"});

}

};