const axios = require("axios");
const parseCSV = require("../utils/parseCvs");

const API_URL = "https://echo-serv.tbxnet.com/v1/secret";
const API_KEY = "Bearer aSuperSecretKey";

const fetchFiles = async () => {
	const response = await axios.get(`${API_URL}/files`, {
		headers: { Authorization: API_KEY },
	});
	return response.data.files;
};
const fetchFileData = async (fileName) => {
	const files = fileName ? [fileName] : await fetchFiles();
	const data = [];
	try {
		const fileRequests = files.map((file) =>
			axios
				.get(`${API_URL}/file/${file}`, {
					headers: { Authorization: API_KEY },
					timeout: 5000, // Set timeout for the request
				})
				.then((response) => {
					const fileData = parseCSV(response.data);
					data.push({ file, lines: fileData });
				})
				.catch((error) => {
					// Handle errors for individual file downloads
					//if in the future wants to diagnose a problem with logs libraries
					console.error(`Error fetching file ${file}:`, error.message);
				}),
		);

		// Wait for all file requests to complete
		//makes for reduce the time in the response
		await Promise.all(fileRequests);

		return data;
	} catch (error) {
		//improve logs using winston
		console.log(error);
	}
};
module.exports = {
	fetchFiles,
	fetchFileData,
};
