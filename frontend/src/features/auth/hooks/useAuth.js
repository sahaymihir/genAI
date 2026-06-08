import { useContext } from 'react';
import { AuthContext } from '../authContext';
import { login, logout, register } from '../services/authApi.js';
import { userProfile } from '../services/authApi.js';
import { useEffect } from 'react';

const useAuth = () => {
	const context = useContext(AuthContext);
	const { user, setUser, loading, setLoading } = context;

	const handleLogin = async ({ email, password }) => {
		setLoading(true);
		try {
			const data = await login({ email, password });
			setUser(data.user);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async ({
		username,
		email,
		password,
		confirmPassword,
	}) => {
		setLoading(true);
		try {
			const data = await register({
				username,
				email,
				password,
				confirmPassword,
			});
			setUser(data.user);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		setLoading(true);
		try {
			await logout();
			setUser(null);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const getAndSetUser = async () => {
			try {
				const data = await userProfile();
				setUser(data.user);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getAndSetUser();
	}, []);

	return { user, loading, handleLogin, handleLogout, handleRegister };
};

export default useAuth;
