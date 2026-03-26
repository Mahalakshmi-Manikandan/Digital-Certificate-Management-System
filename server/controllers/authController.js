const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async(req,res)=>{

const {name,qualification,designation,department,email,password}=req.body;

const hashed = await bcrypt.hash(password,10);

await db.query(
`INSERT INTO users
(name,qualification,designation,department,email,password)
VALUES(?,?,?,?,?,?)`,
[name,qualification,designation,department,email,hashed]
);

res.json({message:"Registered successfully"});

};

exports.login = async(req,res)=>{

const {email,password}=req.body;

const [user] = await db.query(
"SELECT * FROM users WHERE email=?",
[email]
);

if(user.length===0)
return res.status(400).json({message:"User not found"});

const valid = await bcrypt.compare(password,user[0].password);

if(!valid)
return res.status(400).json({message:"Wrong password"});

const token = jwt.sign(
{id:user[0].id},
process.env.JWT_SECRET
);

res.json({token,user:user[0]});

};