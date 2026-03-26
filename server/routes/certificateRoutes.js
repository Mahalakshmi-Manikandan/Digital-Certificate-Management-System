const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
createSingle,
createBulk,
verifyCertificate,
getAllCertificates
} = require("../controllers/certificateController");

router.post("/single",auth,createSingle);

router.post("/bulk",auth,upload.single("file"),createBulk);

router.get("/verify/:id",verifyCertificate);

router.get("/all",auth,getAllCertificates);

module.exports = router;