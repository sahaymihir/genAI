import { Link } from 'react-router';
import { motion } from 'framer-motion';
import MainLayout from '../Layouts/MainLayout';

// Reports a user has generated. Job title + id come from the database;
// kept here as sample UI data until wired to the API.
const reports = [
	{
		id: '6a2860f6227505d11f959f24',
		jobTitle: 'Software Engineer Intern',
		company: 'Backend Infrastructure',
		matchScore: 0.78,
		createdAt: 'Jun 8, 2026',
	},
	{
		id: '7b3971a7338616e22a060035',
		jobTitle: 'Frontend Developer',
		company: 'Web Platform',
		matchScore: 0.86,
		createdAt: 'Jun 5, 2026',
	},
	{
		id: '8c4a82b8449727f33b171146',
		jobTitle: 'Data Analyst',
		company: 'Growth Analytics',
		matchScore: 0.64,
		createdAt: 'May 29, 2026',
	},
];

const ease = [0.22, 1, 0.36, 1];

const container = {
	hidden: {},
	show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const ReportsPage = () => {
	return (
		<MainLayout>
			<section className="px-5 py-16 sm:px-8">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="mx-auto w-full max-w-3xl"
				>
					<motion.div variants={item} className="flex items-baseline gap-3">
						<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
							Reports
						</h1>
						<span className="text-sm text-muted-foreground">
							{reports.length}
						</span>
					</motion.div>
					<motion.p
						variants={item}
						className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
					>
						Everything you have generated so far. Open one to review the
						questions, skill gaps and plan.
					</motion.p>

					<div className="mt-12 border-t border-border">
						{reports.map((report) => {
							const score = Math.round(report.matchScore * 100);
							return (
								<motion.div key={report.id} variants={item}>
									<Link
										to={`/reports/${report.id}`}
										className="group flex items-center justify-between gap-6 border-b border-border py-6"
									>
										<div className="min-w-0">
											<h2 className="truncate text-lg font-medium transition-transform duration-300 ease-out group-hover:translate-x-1">
												{report.jobTitle}
											</h2>
											<p className="mt-1 text-sm text-muted-foreground">
												{report.company} · {report.createdAt}
											</p>
										</div>
										<div className="flex shrink-0 items-center gap-5">
											<span className="text-sm tabular-nums text-muted-foreground">
												{score}% match
											</span>
											<span
												aria-hidden
												className="text-muted-foreground transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-foreground"
											>
												→
											</span>
										</div>
									</Link>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</section>
		</MainLayout>
	);
};

export default ReportsPage;
