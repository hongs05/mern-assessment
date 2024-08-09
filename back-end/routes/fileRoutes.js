const express = require("express");
const filesController = require("../controllers/fileController");

const router = express.Router();

router.get("/list", filesController.listFiles);
router.get("/data", filesController.getFileData);

module.exports = router;
