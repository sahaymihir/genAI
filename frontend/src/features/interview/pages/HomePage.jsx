import MainLayout from '../Layouts/MainLayout';
import PreparationForm from '../components/PreparationForm';
import useReport from '../hooks/useReport';

const HomePage = () => {
	const { loading, generateInterviewReport } = useReport();  
	return (
		<MainLayout>
			<PreparationForm />
		</MainLayout>
	);
};

export default HomePage;
