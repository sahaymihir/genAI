import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import MainLayout from '../Layouts/MainLayout';
import useReport from '../hooks/useReport';

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
	const { reports, loading, getReports } = useReport();

	useEffect(() => {
		getReports();
	}, [getReports]);

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
						{loading && (
							<p className="py-6 text-sm text-muted-foreground">Loading…</p>
						)}
						{!loading && reports.length === 0 && (
							<p className="py-6 text-sm text-muted-foreground">No reports yet.</p>
						)}
						{reports.map((report) => {
							const score = Math.round(report.matchScore);
							const date = new Date(report.createdAt).toLocaleDateString('en-US', {
								month: 'short', day: 'numeric', year: 'numeric',
							});
							return (
								<motion.div key={report._id} variants={item}>
									<Link
										to={`/reports/${report._id}`}
										className="group flex items-center justify-between gap-6 border-b border-border py-6"
									>
										<div className="min-w-0">
											<h2 className="truncate text-lg font-medium transition-transform duration-300 ease-out group-hover:translate-x-1">
												{report.jobTitle}
											</h2>
											<p className="mt-1 text-sm text-muted-foreground">
												{date}
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