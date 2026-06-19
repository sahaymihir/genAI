import { RouterProvider } from 'react-router';
import router from './appRoutes.jsx';
import { AuthProvider } from './features/auth/authContext.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { ReportProvider } from './features/interview/interviewContext.jsx';

const App = () => {
	return (
		<AuthProvider>
			<ReportProvider>
				<Toaster />
				<RouterProvider router={router} />
			</ReportProvider>
		</AuthProvider>
	);
};

export default App;
