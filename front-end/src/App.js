import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import FileList from "./FileList";

function App() {
	return (
		<Container>
			<Routes>
				<Route path='/' element={<FileList />} />
			</Routes>
		</Container>
	);
}

export default App;
