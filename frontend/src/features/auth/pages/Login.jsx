import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth.js';
import { toast } from 'react-toastify';

const Login = () => {
	const { loading, handleLogin } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleLogin({ email, password });
		toast.success('Logged in Successfully');
		navigate('/');
	};

	if (loading) {
		return <h1>Loading....</h1>;
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<Card className="w-full max-w-sm bg-black text-whitesmoke scale-150">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Login</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<Label htmlFor="email">Email</Label>
							<Input
								type="email"
								id="email"
								className="text-whitesmoke"
								placeholder="Enter email address"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<Label htmlFor="password">Password</Label>
							<Input
								type="password"
								id="password"
								className="text-whitesmoke"
								placeholder="Enter your password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-indigo-600 hover:bg-indigo-700"
						>
							Login
						</Button>
					</CardContent>
				</form>
				<p className="ml-5">
					Click{' '}
					<Link to={'/register'} className="text-red-500 hover:text-red-1000">
						here
					</Link>{' '}
					to register{' '}
				</p>
			</Card>
		</main>
	);
};

export default Login;
