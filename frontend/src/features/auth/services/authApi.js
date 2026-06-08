import axios from 'axios';

const authApi = axios.create({
	baseURL: 'http://localhost:3000/api/auth',
	withCredentials: true,
});

const register = async ({ username, email, password, confirmPassword }) => {
	try {
		const response = await authApi.post('/register', {
			username,
			email,
			password,
			confirmPassword,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const login = async ({ email, password }) => {
	try {
		const response = await authApi.post('/login', {
			email,
			password,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const logout = async () => {
	try {
		const response = await authApi.post('/logout');
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const userProfile = async () => {
	try {
		const response = await authApi.get('/profile');
		return response.data;
	} catch (err) {
		console.log(err);
	}
};


export { register, login, logout, userProfile };
