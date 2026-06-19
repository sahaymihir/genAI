import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useAuth from '../hooks/useAuth.js';

const ease = [0.22, 1, 0.36, 1];

const fieldClass =
	'h-11 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0';

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
		return (
			<main className="theme-interview grid min-h-screen place-items-center bg-background text-foreground">
				<p className="text-sm text-muted-foreground">Preparing your account…</p>
			</main>
		);
	}

	return (
		<main className="theme-interview min-h-screen bg-background text-foreground antialiased">
			<div className="mx-auto grid min-h-screen w-full max-w-sm place-items-center px-5 py-16">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease }}
					className="w-full"
				>
					<p className="text-sm text-muted-foreground">Get started</p>
					<h1 className="mt-3 text-4xl font-semibold tracking-tight">
						Create your account.
					</h1>
					<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
						Start building role-specific interview reports.
					</p>

					<form onSubmit={submitHandler} className="mt-10 flex flex-col gap-8">
						<div className="flex flex-col gap-3">
							<Label htmlFor="username" className="text-sm font-medium">
								Username
							</Label>
							<Input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								id="username"
								className={fieldClass}
								placeholder="John Doe"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="email" className="text-sm font-medium">
								Email
							</Label>
							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								id="email"
								className={fieldClass}
								placeholder="johndoe@gmail.com"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="password" className="text-sm font-medium">
								Password
							</Label>
							<Input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								id="password"
								className={fieldClass}
								placeholder="Password"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="confirmPassword" className="text-sm font-medium">
								Confirm password
							</Label>
							<Input
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								type="password"
								id="confirmPassword"
								className={fieldClass}
								placeholder="Confirm password"
							/>
						</div>
						<Button type="submit" size="lg" className="mt-1 h-11 w-full rounded-full">
							Create account
						</Button>
					</form>

					<p className="mt-8 text-sm text-muted-foreground">
						Already have an account?{' '}
						<Link
							to="/login"
							className="text-foreground underline-offset-4 hover:underline"
						>
							Sign in
						</Link>
					</p>
				</motion.div>
			</div>
		</main>
	);
};

export default Register;
