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

const Login = () => {
	const { loading, handleLogin } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleLogin({ email, password });
		navigate('/');
	};

	if (loading) {
		return (
			<main className="theme-interview grid min-h-screen place-items-center bg-background text-foreground">
				<p className="text-sm text-muted-foreground">Loading workspace…</p>
			</main>
		);
	}

	return (
		<main className="theme-interview min-h-screen bg-background text-foreground antialiased">
			<div className="mx-auto grid min-h-screen w-full max-w-sm place-items-center px-5">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease }}
					className="w-full"
				>
					<p className="text-sm text-muted-foreground">Welcome back</p>
					<h1 className="mt-3 text-4xl font-semibold tracking-tight">Sign in.</h1>

					<form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
						<div className="flex flex-col gap-3">
							<Label htmlFor="email" className="text-sm font-medium">
								Email
							</Label>
							<Input
								type="email"
								id="email"
								value={email}
								className={fieldClass}
								placeholder="johndoe@gmail.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="password" className="text-sm font-medium">
								Password
							</Label>
							<Input
								type="password"
								id="password"
								value={password}
								className={fieldClass}
								placeholder="Enter your password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button type="submit" size="lg" className="mt-1 h-11 w-full rounded-full">
							Sign in
						</Button>
					</form>

					<p className="mt-8 text-sm text-muted-foreground">
						New here?{' '}
						<Link
							to="/register"
							className="text-foreground underline-offset-4 hover:underline"
						>
							Create an account
						</Link>
					</p>
				</motion.div>
			</div>
		</main>
	);
};

export default Login;
