import React from 'react';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
	const { loading, handleLogout, user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleLogout();
	};

	if (loading) {
		return (
			<>
				<h1>Loading...</h1>
			</>
		);
	}

	return (
		<div className="relative flex items-center justify-center min-h-screen">
			<button
				onClick={handleSubmit}
				className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
			>
				Logout
			</button>
			<h1 className="text-2xl">{`Welcome ${user.username}`}</h1>
		</div>
	);
};

export default HomePage;
