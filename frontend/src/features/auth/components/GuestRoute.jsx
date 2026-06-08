import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const GuestRoute = ({ children }) => {
	const { loading, user } = useAuth();
	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (user) {
		return <Navigate to={'/'} />;
	}

	return children;
};

export default GuestRoute;
