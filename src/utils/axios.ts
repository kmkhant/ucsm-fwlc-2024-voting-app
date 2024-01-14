import axios from "axios";

const instance = axios.create({
	// baseURL: "http://localhost:3000/api",
	baseURL: "http://172.20.10.11:3000/api",
});

export default instance;
