const fileService = require("../services/fileServices");

const listFiles = async (req, res) => {
	try {
		const files = await fileService.fetchFiles();
		res.json(files);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch files list" });
	}
};

const getFileData = async (req, res) => {
	try {
		const { fileName } = req.query;
		const data = await fileService.fetchFileData(fileName);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch data" });
	}
};

module.exports = {
	listFiles,
	getFileData,
};
