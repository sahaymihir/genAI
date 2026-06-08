import { RouterProvider } from 'react-router';
import router from './appRoutes.jsx';
import { AuthProvider } from './features/auth/authContext.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
	return (
		<AuthProvider>
			<ToastContainer />
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

export default App;
