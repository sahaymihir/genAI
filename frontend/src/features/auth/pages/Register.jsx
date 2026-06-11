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
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import {
	ArrowRight,
	BrainCircuit,
	CheckCircle2,
	Loader2,
	Sparkles,
} from 'lucide-react';

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
			<main className="grid min-h-screen place-items-center bg-off-black text-whitesmoke">
				<div className="flex items-center gap-2 text-sm text-white/70">
					<Loader2 className="size-4 animate-spin" />
					Preparing your account...
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-off-black text-whitesmoke">
			<div className="mx-auto grid min-h-screen w-full max-w-6xl items-center ">
				<Card className="mx-auto w-full max-w-md border-white/10 bg-white/[0.04] text-whitesmoke shadow-2xl shadow-black/40 ring-white/10">
					<CardHeader className="gap-2 px-6 pt-6">
						<CardTitle className="text-2xl font-semibold text-white">
							Create your account
						</CardTitle>
						<CardDescription className="text-white/55">
							Start building role-specific interview reports.
						</CardDescription>
					</CardHeader>
					<CardContent className="px-6 pb-6">
						<form onSubmit={submitHandler} className="flex flex-col gap-4">
							<div className="space-y-2">
								<Label htmlFor="username" className="text-white/80">
									Username
								</Label>
								<Input
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
									}}
									type="text"
									id="username"
									className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/35"
									placeholder="John Doe"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email" className="text-white/80">
									Email
								</Label>
								<Input
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									type="email"
									id="email"
									className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/35"
									placeholder="johndoe@gmail.com"
								/>
							</div>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="password" className="text-white/80">
										Password
									</Label>
									<Input
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										type="password"
										id="password"
										className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/35"
										placeholder="Password"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword" className="text-white/80">
										Confirm Password
									</Label>
									<Input
										value={confirmPassword}
										onChange={(e) => {
											setConfirmPassword(e.target.value);
										}}
										type="password"
										id="confirmPassword"
										className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/35"
										placeholder="Confirm Password"
									/>
								</div>
							</div>
							<Button type="submit" size="lg" className="mt-2 h-10 w-full gap-2">
								Register
								<ArrowRight className="size-4" />
							</Button>
						</form>
						<p className="mt-6 text-center text-sm text-white/55">
							Already have an account?{' '}
							<Link
								to="/login"
								className="font-medium text-indigo-200 hover:text-white"
							>
								Login
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default Register;
