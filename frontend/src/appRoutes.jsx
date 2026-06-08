import { createBrowserRouter } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import HomePage from './features/auth/pages/HomePage';
import Protected from './features/auth/components/Protected';
import GuestRoute from './features/auth/components/GuestRoute';

const router = createBrowserRouter([
	{
		path: '/login',
		element: (
			<GuestRoute>
				<Login />
			</GuestRoute>
		),
	},
	{
		path: '/register',
		element: (
			<GuestRoute>
				<Register />
			</GuestRoute>
		),
	},
	{
		path: '/',
		element: (
			<Protected>
				<HomePage />
			</Protected>
		),
	},
]);

export default router;
