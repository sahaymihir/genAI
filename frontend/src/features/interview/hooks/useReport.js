import {
	generateInterviewReport,
	getReportById,
	getAllReports,
} from '../services/interviewApi.js';
import { useContext } from 'react';
import { ReportContext } from '../interviewContext.jsx';

const useReport = () => {
	const context = useContext(ReportContext);
	if (!context) {
		throw new Error('useInterview must be used within an InterviewProvider');
	}
	const { loading, setLoading, report, setReport, reports, setReports } =
		context;

	const generateInterviewReport = async (
		jobDescription,
		selfDescription,
		resumeFile
	) => {
		setLoading(true);
		try {
			const response = await generateInterviewReport({
				jobDescription,
				selfDescription,
				resumeFile,
			});
			setReport(response.data);
		} catch (error) {
			console.log(error?.message?.data);
		} finally {
			setLoading(false);
		}
	};

	const getReportById = async (reportId) => {
		setLoading(true);
		try {
			const response = await getReportById(reportId);
			setReport(response.report);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getAllReports = async () => {
		setLoading(true);
		try {
			const response = await getAllReports();
			setReports(response.reports);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		report,
		reports,
		generateInterviewReport,
		getReportById,
		getAllReports,
	};
};

export default useReport;
