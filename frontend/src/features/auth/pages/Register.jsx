import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import { toast } from 'react-toastify';

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { loading, handleRegister } = useAuth();

	const submitHandler = async (e) => {
		e.preventDefault();
		await handleRegister({ username, email, password, confirmPassword });
		navigate('/');
	};
	if (loading) {
		return <h1>Loading...</h1>;
	}
	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<Card className="w-full max-w-sm bg-black text-whitesmoke scale-150">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Sign Up</CardTitle>
				</CardHeader>
				<form onSubmit={submitHandler}>
					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<Label htmlFor="username">Username</Label>
							<Input
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								type="text"
								id="username"
								placeholder="Enter username"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<Label htmlFor="email">Email</Label>
							<Input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								id="email"
								placeholder="Enter email address"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<Label htmlFor="password" className="text-whitesmoke">
								Password
							</Label>
							<Input
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="password"
								id="password"
								placeholder="Enter your password"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
								type="password"
								id="confirmPassword"
								placeholder="Confirm your password"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-indigo-600 hover:bg-indigo-700"
						>
							Register
						</Button>
					</CardContent>
				</form>
				<p className="ml-5">
					Already have an account?{' '}
					<Link to={'/login'} className="text-red-500">
						Login
					</Link>
				</p>
			</Card>
		</main>
	);
};

export default Register;
