import axios from 'axios';

const authApi = axios.create({
	baseURL: 'http://localhost:3000/api/auth',
	withCredentials: true,
});

const register = async ({ username, email, password, confirmPassword }) => {
	const response = await authApi.post('/register', {
		username,
		email,
		password,
		confirmPassword,
	});
	return response.data;
};

const login = async ({ email, password }) => {
	const response = await authApi.post('/login', {
		email,
		password,
	});
	return response.data;
};

const logout = async () => {
	const response = await authApi.post('/logout');
	return response.data;
};

const userProfile = async () => {
	const response = await authApi.get('/profile');
	return response.data;
};

export { register, login, logout, userProfile };
