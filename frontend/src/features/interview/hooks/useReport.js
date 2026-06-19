import {
	generateInterviewReport,
	getReportById,
	getAllReports,
} from '../services/interviewApi.js';
import { useCallback,useContext } from 'react';
import { ReportContext } from '../interviewContext.jsx';

const useReport = () => {
	const context = useContext(ReportContext);
	if (!context) {
		throw new Error('useInterview must be used within an InterviewProvider');
	}
	const { loading, setLoading, report, setReport, reports, setReports } =
		context;

	const generateReport = async (
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
			return response.data;
		} catch (error) {
			console.log(error?.message?.data);
		} finally {
			setLoading(false);
		}
	};

	const getReport = useCallback(async (reportId) => {
		setLoading(true);
		try {
			const response = await getReportById(reportId);
			setReport(response.report[0]);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	},[setLoading, setReport]);

	const getReports = useCallback(async () => {
		setLoading(true);
		try {
			const response = await getAllReports();
			setReports(response.reports);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	},[setLoading, setReports]);

	return {
		loading,
		report,
		reports,
		generateReport,
		getReport,
		getReports,
	};
};

export default useReport;
