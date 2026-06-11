import axios from 'axios';

const interviewApi = axios.create({
	baseURL:    'https://localhost:3000',
	withCredentials: true,
});


