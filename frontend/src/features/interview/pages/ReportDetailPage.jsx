import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from '../Layouts/MainLayout';
import useReport from '../hooks/useReport';

const tabs = [
	{ id: 'technical', label: 'Technical' },
	{ id: 'behavioral', label: 'Behavioral' },
	{ id: 'roadmap', label: 'Road map' },
];

const severityDot = {
	high: 'bg-[var(--chart-5)]',
	medium: 'bg-[var(--chart-4)]',
	low: 'bg-[var(--chart-3)]',
};

const ease = [0.22, 1, 0.36, 1];
const fade = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -8 },
	transition: { duration: 0.28, ease },
};

const QuestionList = ({ questions }) => (
	<div className="divide-y divide-border">
		{questions.map((item, index) => (
			<article key={item.question} className="py-6 first:pt-0">
				<div className="flex items-baseline gap-3">
					<span className="text-sm tabular-nums text-muted-foreground">
						{String(index + 1).padStart(2, '0')}
					</span>
					<div>
						<h3 className="text-base font-medium leading-7">{item.question}</h3>
						<p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
							{item.intention}
						</p>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
							{item.answer}
						</p>
					</div>
				</div>
			</article>
		))}
	</div>
);

const Roadmap = ({ plan }) => (
	<div className="divide-y divide-border">
		{plan.map((day) => (
			<article key={day.day} className="py-6 first:pt-0">
				<div className="flex items-baseline gap-3">
					<span className="w-12 shrink-0 text-sm text-muted-foreground">
						{day.day}
					</span>
					<div>
						<h3 className="text-base font-medium">{day.focus}</h3>
						<ul className="mt-3 space-y-2">
							{day.tasks.map((task) => (
								<li
									key={task}
									className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
								>
									<span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
									{task}
								</li>
							))}
						</ul>
					</div>
				</div>
			</article>
		))}
	</div>
);

const ReportDetailPage = () => {
	const { id } = useParams();
	const [active, setActive] = useState('technical');
	const { report, loading, getReportById } = useReport();

	useEffect(() => {
		getReportById(id);
	}, [id, getReportById]);

	if (loading || !report) {
		return (
			<MainLayout>
				<main className="px-5 py-16 sm:px-8">
					<p className="text-sm text-muted-foreground">Loading report…</p>
				</main>
			</MainLayout>
		);
	}
	const score = Math.round(report.matchScore * 100);

	return (
		<MainLayout>
			<main className="px-5 py-16 sm:px-8">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease }}
					className="mx-auto w-full max-w-3xl"
				>
					<Link
						to="/reports"
						className="text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						← Reports
					</Link>

					<div className="mt-8 flex items-start justify-between gap-6">
						<div>
							<p className="text-sm text-muted-foreground">Report</p>
							<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
								{report.jobTitle}
							</h1>
						</div>
						<div className="shrink-0 text-right">
							<p className="text-sm text-muted-foreground">Match</p>
							<p className="mt-1 text-3xl font-semibold tabular-nums">{score}%</p>
						</div>
					</div>
					<p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
						{report.jobDescription}
					</p>

					<div className="mt-12 flex gap-7 border-b border-border">
						{tabs.map((tab) => {
							const isActive = active === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActive(tab.id)}
									className="relative -mb-px pb-3 text-sm"
								>
									<span
										className={
											isActive
												? 'text-foreground'
												: 'text-muted-foreground transition-colors hover:text-foreground'
										}
									>
										{tab.label}
									</span>
									{isActive && (
										<motion.span
											layoutId="tab-underline"
											className="absolute -bottom-px left-0 right-0 h-px bg-foreground"
											transition={{ type: 'spring', stiffness: 400, damping: 32 }}
										/>
									)}
								</button>
							);
						})}
					</div>

					<div className="mt-8 min-h-[320px]">
						<AnimatePresence mode="wait">
							<motion.div key={active} {...fade}>
								{active === 'technical' && (
									<QuestionList questions={report.technicalQuestions} />
								)}
								{active === 'behavioral' && (
									<QuestionList questions={report.behavioralQuestions} />
								)}
								{active === 'roadmap' && (
									<Roadmap plan={report.preparationPlan} />
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					<div className="mt-16 border-t border-border pt-10">
						<h2 className="text-sm font-medium">Skill gaps</h2>
						<div className="mt-6 divide-y divide-border">
							{report.skillGaps.map((gap) => (
								<div key={gap.skill} className="py-5 first:pt-0">
									<div className="flex items-center gap-2.5">
										<span
											className={`size-1.5 rounded-full ${severityDot[gap.severity]}`}
										/>
										<p className="text-base font-medium">{gap.skill}</p>
										<span className="text-xs capitalize text-muted-foreground">
											{gap.severity}
										</span>
									</div>
									<p className="mt-2 pl-4 text-sm leading-relaxed text-muted-foreground">
										{gap.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</main>
		</MainLayout>
	);
};

export default ReportDetailPage;
