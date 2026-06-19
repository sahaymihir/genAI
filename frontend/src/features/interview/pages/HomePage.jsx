import MainLayout from '../Layouts/MainLayout';
import PreparationForm from '../components/PreparationForm';
import useReport from '../hooks/useReport';
import { useNavigate } from 'react-router';

const HomePage = () => {
	const { loading, generateReport } = useReport();
	const navigate = useNavigate();

	const handleSubmit = async ({
		jobDescription,
		selfDescription,
		resumeFile,
	}) => {
		const data = await generateReport(
			jobDescription,
			selfDescription,
			resumeFile
		);
		if (data?._id) {
			navigate(`/reports/${data._id}`);
		}
	};

	return (
		<MainLayout>
			<PreparationForm onSubmit={handleSubmit} loading={loading} />
		</MainLayout>
	);
};

export default HomePage;
