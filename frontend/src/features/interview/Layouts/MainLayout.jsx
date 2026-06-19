import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../../auth/hooks/useAuth';

const ease = [0.22, 1, 0.36, 1];

const navItems = [
	{ to: '/', label: 'Home', end: true },
	{ to: '/reports', label: 'Reports', end: false },
];

const NavItem = ({ to, label, end }) => (
	<NavLink to={to} end={end} className="relative px-1 py-2 text-sm">
		{({ isActive }) => (
			<>
				<span
					className={
						isActive
							? 'text-foreground'
							: 'text-muted-foreground transition-colors hover:text-foreground'
					}
				>
					{label}
				</span>
				{isActive && (
					<motion.span
						layoutId="nav-underline"
						className="absolute -bottom-px left-0 right-0 h-px bg-foreground"
						transition={{ type: 'spring', stiffness: 400, damping: 32 }}
					/>
				)}
			</>
		)}
	</NavLink>
);

const UserMenu = ({ username, onLogout }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				{username}
				<motion.span
					aria-hidden
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2, ease }}
					className="text-xs"
				>
					⌄
				</motion.span>
			</button>

			<AnimatePresence>
				{open && (
					<>
						<div
							className="fixed inset-0 z-10"
							onClick={() => setOpen(false)}
						/>
						<motion.div
							initial={{ opacity: 0, y: -4, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -4, scale: 0.98 }}
							transition={{ duration: 0.16, ease }}
							className="absolute right-0 top-full z-20 mt-2 w-40 origin-top-right overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-xl shadow-black/40"
						>
							<button
								type="button"
								onClick={onLogout}
								className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								Sign out
							</button>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

const MainLayout = ({ children }) => {
	const { handleLogout, user } = useAuth();
	const navigate = useNavigate();

	const logout = async () => {
		await handleLogout();
		navigate('/login');
	};

	return (
		<div className="theme-interview min-h-screen bg-background text-foreground antialiased">
			<header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
				<div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-6 px-5 sm:px-8">
					<Link to="/" className="text-sm font-semibold tracking-tight">
						GenAI<span className="text-muted-foreground">.prep</span>
					</Link>

					<nav className="flex items-center gap-6">
						{navItems.map((item) => (
							<NavItem key={item.to} {...item} />
						))}
					</nav>

					<UserMenu username={user?.username || 'Account'} onLogout={logout} />
				</div>
			</header>
			{children}
		</div>
	);
};

export default MainLayout;
