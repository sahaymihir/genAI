import axios from 'axios';

const interviewApi = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
});

/**
 * @description Generate an interview report by sending a POST request to the backend API
 */
const generateInterviewReport = async ({
	jobDescription,
	selfDescription,
	resume,
}) => {
	const formData = new FormData();
	formData.append('jobDescription', jobDescription);
	formData.append('selfDescription', selfDescription);
	formData.append('resume', resume);

	const response = await interviewApi.post('/api/report/resume', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return response;
};

/**
 * @description Retrieve an interview report by its ID
 */
const getReportById = async (reportId) => {
	const response = await interviewApi.get(`/api/report/${reportId}`);
	return response.data;
};

/**
 * @description Retrieve all interview reports
 */
const getAllReports = async () => {
	const response = await interviewApi.get('/api/report');
	return response.data;
};

export { generateInterviewReport, getAllReports, getReportById };
