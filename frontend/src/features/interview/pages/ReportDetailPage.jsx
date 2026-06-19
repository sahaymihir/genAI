import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from '../Layouts/MainLayout';

// Header info per report (job title comes from the database). The questions,
// skill gaps and plan below are shared sample content for the UI.
const reportMeta = {
	'6a2860f6227505d11f959f24': {
		role: 'Software Engineer Intern',
		matchScore: 0.78,
		jobDescription:
			'Backend infrastructure role requiring AWS, RESTful APIs, NoSQL databases, scalable microservices, CI/CD, and Java or Node.js.',
	},
	'7b3971a7338616e22a060035': {
		role: 'Frontend Developer',
		matchScore: 0.86,
		jobDescription:
			'Web platform role focused on React, TypeScript, state management, accessibility, and design systems.',
	},
	'8c4a82b8449727f33b171146': {
		role: 'Data Analyst',
		matchScore: 0.64,
		jobDescription:
			'Growth analytics role covering SQL, dashboards, experimentation, and stakeholder reporting.',
	},
};

const reportBody = {
	technicalQuestions: [
		{
			question:
				'Describe your experience building a RESTful API with Java or Node.js on AWS.',
			intention:
				'Assess practical knowledge of API development on cloud platforms.',
			answer:
				'I have built RESTful APIs using Node.js and Java on AWS. In one project I used Lambda behind API Gateway with DynamoDB, IAM roles, custom domains, and CloudWatch monitoring.',
		},
		{
			question:
				'How do you ensure scalability and reliability in a serverless architecture using AWS services?',
			intention:
				'Evaluate understanding of design patterns for scalable serverless systems.',
			answer:
				'I design stateless functions, use event-driven triggers, rely on managed services such as DynamoDB, add retries, use dead-letter queues, and monitor with CloudWatch and X-Ray.',
		},
		{
			question:
				'Explain how you would implement CI/CD pipelines for a microservice deployment.',
			intention:
				'Gauge familiarity with continuous integration and delivery workflows.',
			answer:
				'I would run tests and static checks, build a Docker image, push it to ECR, deploy to staging, run integration checks, and then promote the same artifact to production.',
		},
		{
			question:
				'What considerations would you take into account when integrating a machine learning model into a backend service?',
			intention:
				'Assess awareness of challenges in ML model deployment and serving.',
			answer:
				'I would consider latency, scaling, versioning, endpoint security, encrypted artifacts, drift monitoring, request logging, and a fallback path if inference is unavailable.',
		},
	],
	behavioralQuestions: [
		{
			question:
				'Tell me about a time you worked on a cross-functional team to deliver under tight deadlines.',
			intention:
				'Assess teamwork, communication, and ability to handle pressure.',
			answer:
				'Use the internship duty-allocation system as the story. Focus on clarifying requirements, collaborating across stakeholders, owning the security module, and shipping a usable internal tool.',
		},
		{
			question:
				'Describe a situation where you had to troubleshoot a production issue.',
			intention: 'Evaluate problem-solving skills and systematic debugging.',
			answer:
				'Structure the answer around logs, reproduction, isolating the failing module, adding validation, redeploying, and confirming that the error rate returned to normal.',
		},
		{
			question:
				'Give an example of how you ensured code quality and maintainability.',
			intention: 'Determine commitment to best coding practices.',
			answer:
				'Use a project where you added linting, formatting, tests, clear module boundaries, and pull request review habits to keep the system maintainable.',
		},
	],
	skillGaps: [
		{
			skill: 'CI/CD pipeline design',
			severity: 'medium',
			description:
				'Practice explaining end-to-end deployment flow, artifact promotion, and rollback strategy.',
		},
		{
			skill: 'Microservices architecture',
			severity: 'low',
			description:
				'Prepare trade-offs around service boundaries, sync vs async communication, and observability.',
		},
		{
			skill: 'ML integration',
			severity: 'high',
			description:
				'Rehearse model serving, latency budgets, fallback behavior, and drift monitoring.',
		},
	],
	preparationPlan: [
		{
			day: 'Day 1',
			focus: 'AWS serverless fundamentals',
			tasks: [
				'Review Lambda, API Gateway, and DynamoDB request flows',
				'Prepare one serverless REST API architecture explanation',
				'Write down common reliability patterns',
			],
		},
		{
			day: 'Day 2',
			focus: 'CI/CD pipelines',
			tasks: [
				'Sketch build, test, package, deploy, and rollback stages',
				'Practice explaining Docker image promotion',
				'Review GitHub Actions or CodePipeline examples',
			],
		},
		{
			day: 'Day 3',
			focus: 'Microservices design',
			tasks: [
				'Compare synchronous and asynchronous service communication',
				'Review circuit breaker and retry patterns',
				'Prepare an architecture diagram verbally',
			],
		},
		{
			day: 'Day 4',
			focus: 'Behavioral stories',
			tasks: [
				'Write STAR answers for teamwork, debugging, and code quality',
				'Rehearse concise versions aloud',
				'Prepare one ownership story from each major project',
			],
		},
	],
};

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

	const meta = reportMeta[id] ?? Object.values(reportMeta)[0];
	const score = Math.round(meta.matchScore * 100);

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
								{meta.role}
							</h1>
						</div>
						<div className="shrink-0 text-right">
							<p className="text-sm text-muted-foreground">Match</p>
							<p className="mt-1 text-3xl font-semibold tabular-nums">{score}%</p>
						</div>
					</div>
					<p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
						{meta.jobDescription}
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
									<QuestionList questions={reportBody.technicalQuestions} />
								)}
								{active === 'behavioral' && (
									<QuestionList questions={reportBody.behavioralQuestions} />
								)}
								{active === 'roadmap' && (
									<Roadmap plan={reportBody.preparationPlan} />
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					<div className="mt-16 border-t border-border pt-10">
						<h2 className="text-sm font-medium">Skill gaps</h2>
						<div className="mt-6 divide-y divide-border">
							{reportBody.skillGaps.map((gap) => (
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
