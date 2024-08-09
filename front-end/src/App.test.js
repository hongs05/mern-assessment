jest.mock("axios");

const React = require("react");
const {
	render,
	screen,
	waitFor,
	fireEvent,
} = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const axios = require("axios");
const FileList = require("./FileList");
jest.mock("axios");

describe("FileList Component", () => {
	test("renders loading spinner initially", () => {
		render(<FileList />);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	test("renders error message on fetch error", async () => {
		axios.get.mockRejectedValueOnce(new Error("Error fetching data"));

		render(<FileList />);
		await waitFor(() => screen.getByRole("alert"));

		expect(screen.getByRole("alert")).toHaveTextContent("Error fetching data");
	});

	test("renders file data in table on successful fetch", async () => {
		const mockData = [
			{
				file: "test1.csv",
				lines: [{ text: "sample text", number: 12345, hex: "abc123" }],
			},
		];

		axios.get.mockResolvedValueOnce({ data: mockData });

		render(<FileList />);
		await waitFor(() => screen.getByText("test1.csv"));

		expect(screen.getByText("test1.csv")).toBeInTheDocument();
		expect(screen.getByText("sample text")).toBeInTheDocument();
		expect(screen.getByText("12345")).toBeInTheDocument();
		expect(screen.getByText("abc123")).toBeInTheDocument();
	});

	test('renders "No data available" when there are no lines', async () => {
		const mockData = [
			{
				file: "test2.csv",
				lines: [],
			},
		];

		axios.get.mockResolvedValueOnce({ data: mockData });

		render(<FileList />);
		await waitFor(() => screen.getByText("No data available"));

		expect(screen.getByText("No data available")).toBeInTheDocument();
	});

	test("updates the fileName state on search input change", () => {
		render(<FileList />);

		const searchInput = screen.getByPlaceholderText("Search by file name");
		fireEvent.change(searchInput, { target: { value: "test3.csv" } });

		expect(searchInput.value).toBe("test3.csv");
	});

	test("calls setSearchParams with the correct fileName on search", () => {
		render(<FileList />);

		const searchInput = screen.getByPlaceholderText("Search by file name");
		const searchButton = screen.getByText("Search");

		fireEvent.change(searchInput, { target: { value: "test3.csv" } });
		fireEvent.click(searchButton);

		expect(window.location.search).toContain("fileName=test3.csv");
	});
});
