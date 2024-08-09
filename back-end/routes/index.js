const express = require("express");
const filesRoutes = require("./fileRoutes");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("API is working");
});

router.use("/files", filesRoutes);

module.exports = router;
