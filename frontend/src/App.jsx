import { RouterProvider } from 'react-router';
import router from './appRoutes.jsx';
import { AuthProvider } from './features/auth/authContext.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
	return (
		<AuthProvider>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				closeOnClick
				pauseOnHover
				theme="dark"
			/>
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

export default App;
