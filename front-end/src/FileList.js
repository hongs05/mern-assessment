import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function FileList() {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [fileName, setFileName] = useState(searchParams.get("fileName") || "");

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!searchParams) {
					const response = await axios.get("http://localhost:5000/files/data");
					setFiles(response.data);
				} else {
					const resp = await axios.get(
						`http://localhost:5000/files/data?${searchParams}`,
					);
					setFiles(resp.data);
				}
			} catch (err) {
				setError("Error fetching data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [searchParams]);

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchParams({ fileName });
	};

	return (
		<div>
			<h1 className='my-4'>Files</h1>

			<Form onSubmit={handleSearch} className='mb-5'>
				<Form.Group>
					<Form.Control
						type='text'
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						placeholder='Search by file name'
					/>
				</Form.Group>

				<Button type='submit' className='btn btn-primary mt-3'>
					Search
				</Button>
			</Form>
			{loading && <Spinner animation='border' />}
			{error && <Alert variant='danger'>{error}</Alert>}
			{!loading && !error && files.length > 0 && (
				<Table striped bordered hover>
					<thead>
						<tr
							style={{
								backgroundColor: "#f8d7da",
								color: "#000",
								fontWeight: "bold",
							}}>
							<th>File Name</th>
							<th>Text</th>
							<th>Number</th>
							<th>Hex</th>
						</tr>
					</thead>
					<tbody>
						{files.map((file) =>
							file.lines.length === 0 ? (
								<tr key={file.file}>
									<td>{file.file}</td>
									<td colSpan='3'>No data available</td>
								</tr>
							) : (
								file.lines.map((line, index) => (
									<tr key={index}>
										{index === 0 && (
											<td rowSpan={file.lines.length}>{file.file}</td>
										)}
										<td>{line.text}</td>
										<td>{line.number}</td>
										<td>{line.hex}</td>
									</tr>
								))
							),
						)}
					</tbody>
				</Table>
			)}
		</div>
	);
}

export default FileList;
