import { Link, NavLink, useNavigate } from 'react-router';
import { Brain, FileText, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuth from '../../auth/hooks/useAuth';

const MainLayout = ({ children }) => {
	const { handleLogout, user } = useAuth();
	const navigate = useNavigate();

	const logout = async () => {
		await handleLogout();
		navigate('/login');
	};

	const navClass = ({ isActive }) =>
		`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${
			isActive
				? 'bg-primary text-primary-foreground'
				: 'text-white/55 hover:bg-white/10 hover:text-white'
		}`;

	return (
		<div className="theme-interview min-h-screen bg-off-black text-whitesmoke antialiased">
			<header className="sticky top-0 z-20 border-b border-white/10 bg-off-black/90 backdrop-blur">
				<div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
					<div className="flex items-center justify-between gap-4">
						<Link to="/" className="flex items-center gap-3">
							<div>
								<p className="text-sm font-semibold leading-none text-foreground">
									GenAI Project
								</p>
							</div>
						</Link>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={logout}
							className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 lg:hidden"
						>
							<LogOut className="size-4" />
							Logout
						</Button>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
						<nav className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-1">
							<NavLink to="/" className={navClass}>
								<Home className="size-4" />
								Home
							</NavLink>
							<NavLink to="/reports" className={navClass}>
								<FileText className="size-4" />
								Reports
							</NavLink>
						</nav>
						<div className="hidden items-center gap-3 lg:flex">
							<div className="text-right">
								<p className="text-sm font-medium text-foreground">
									{user?.username || 'Candidate'}
								</p>
								<p className="text-xs text-muted-foreground">Signed in</p>
							</div>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={logout}
								className="gap-2 border-white/10 bg-red-600 text-white hover:bg-red-600"
							>
								<LogOut className="size-4" />
								Logout
							</Button>
						</div>
					</div>
				</div>
			</header>
			{children}
		</div>
	);
};

export default MainLayout;
