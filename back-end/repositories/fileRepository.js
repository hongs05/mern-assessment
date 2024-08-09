const axios = require("axios");
const API_URL = "https://echo-serv.tbxnet.com/v1/secret";
const API_KEY = "Bearer aSuperSecretKey";
class FileRepository {
	async fetchAllFiles() {
		try {
			const response = await axios.get(`${API_URL}/files`, {
				headers: { Authorization: API_KEY },
			});
			return response.data;
		} catch (error) {
			return error;
		}
	}

	async fetchFileData(fileName) {
		try {
			const files = fileName
				? [fileName]
				: (
						await axios.get(`${API_URL}/files`, {
							headers: { Authorization: API_KEY },
						})
				  ).data.files;

			const data = [];

			for (const file of files) {
				try {
					const fileResponse = await axios.get(`${API_URL}/file/${file}`, {
						headers: { Authorization: API_KEY },
					});
					const fileData = parseCSV(fileResponse.data);
					data.push({ file, lines: fileData });
				} catch (error) {
					// Handle errors for individual file downloads
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new FileRepository();
