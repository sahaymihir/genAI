import MainLayout from '../Layouts/MainLayout';
import Hero from '../components/Hero';
import PreparationForm from '../components/PreparationForm';

const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <PreparationForm />
        </MainLayout>
    );
};

export default HomePage;