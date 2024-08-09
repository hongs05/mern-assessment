const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const { expect } = chai;

describe("Files API Routes", () => {
	describe("GET /files/list", () => {
		it("should return a list of files", (done) => {
			chai
				.request(app)
				.get("/files/list")
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array");
					done();
				});
		});
	});

	describe("GET /files/data", () => {
		it("should return file data when no fileName is provided", (done) => {
			chai
				.request(app)
				.get("/files/data")
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array");
					expect(res.body[0]).to.have.property("file");
					expect(res.body[0]).to.have.property("lines");
					done();
				});
		});

		it("should return file data for a specific file when fileName is provided", (done) => {
			chai
				.request(app)
				.get("/files/data")
				.query({ fileName: "test2.csv" })
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array");
					expect(res.body[0]).to.have.property("file", "test2.csv");
					expect(res.body[0]).to.have.property("lines");
					done();
				});
		});

		it("should handle the case where the file does not exist", (done) => {
			chai
				.request(app)
				.get("/files/data")
				.query({ fileName: "nonexistent.csv" })
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array").that.is.empty;
					done();
				});
		});
	});
});
