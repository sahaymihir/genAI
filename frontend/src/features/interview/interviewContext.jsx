import { createContext, useState } from 'react';

const ReportContext = createContext();

const ReportProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [report, setReport] = useState(null);
	const [reports, setReports] = useState([]);
	return (
		<ReportContext.Provider
			value={{ loading, setLoading, report, setReport, reports, setReports }}
		>
			{children}
		</ReportContext.Provider>
	);
};

export { ReportContext, ReportProvider };
