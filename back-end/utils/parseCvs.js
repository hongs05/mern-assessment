function parseCSV(data) {
	const lines = data.split("\n").slice(1); // Skip header
	return lines
		.map((line) => {
			const [file, text, number, hex] = line.split(",");
			if (!file || !text || !number || !hex) return null; // Skip invalid lines
			return { text, number: parseInt(number, 10), hex };
		})
		.filter(Boolean); // Remove null entries
}

module.exports = parseCSV;
