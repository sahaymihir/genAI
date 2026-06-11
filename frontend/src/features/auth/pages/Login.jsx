import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Brain, Dot, Loader2, Shield } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';

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
			<main className="grid min-h-screen place-items-center bg-off-black text-whitesmoke">
				<div className="flex items-center gap-2 text-sm text-white/70">
					<Loader2 className="size-4 animate-spin" />
					Loading workspace...
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-off-black text-whitesmoke">
			<div className="mx-auto grid min-h-screen w-full max-w-6xl items-center">

				<Card className="mx-auto w-full max-w-md border-white/10 bg-white/[0.04] text-whitesmoke shadow-2xl shadow-black/40 ring-white/10">
					<CardHeader className="gap-2 px-6 pt-6">
						<CardTitle className="text-2xl font-semibold text-white">
							Login
						</CardTitle>
					</CardHeader>
					<CardContent className="px-6 pb-6">
						<form onSubmit={handleSubmit} className="flex flex-col gap-5">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-white/80">
									Email
								</Label>
								<Input
									type="email"
									id="email"
									value={email}
									className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/35"
									placeholder="johndoe@gmail.com"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password" className="text-white/80">
									Password
								</Label>
								<Input
									type="password"
									id="password"
									value={password}
									className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/35"
									placeholder="Enter your password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
							<Button type="submit" size="lg" className="mt-1 h-10 w-full gap-2">
								Login
								<ArrowRight className="size-4" />
							</Button>
						</form>
						<p className="mt-6 text-center text-sm text-white/55">
							New here?{' '}
							<Link
								to="/register"
								className="font-medium text-indigo-200 hover:text-white"
							>
								Create an account
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default Login;
