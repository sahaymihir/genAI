import { useState } from 'react';
import {
	BookOpenCheck,
	Brain,
	CalendarDays,
	CheckCircle2,
	Code2,
	FileQuestion,
	Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MainLayout from '../Layouts/MainLayout';

const generatedReport = {
	id: '6a2860f6227505d11f959f24',
	role: 'Software Engineer Intern',
	matchScore: 0.78,
	jobDescription:
		'Backend infrastructure role requiring AWS, RESTful APIs, NoSQL databases, scalable microservices, CI/CD, and Java or Node.js.',
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
			intention:
				'Evaluate problem-solving skills and systematic debugging.',
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

const reportSections = [
	{
		id: 'technical',
		label: 'Technical questions',
		icon: Code2,
	},
	{
		id: 'behavioral',
		label: 'Behavioral questions',
		icon: BookOpenCheck,
	},
	{
		id: 'roadmap',
		label: 'Road Map',
		icon: CalendarDays,
	},
];

const severityClass = {
	high: 'border-red-400/30 bg-red-500/10 text-red-100',
	medium: 'border-amber-400/30 bg-amber-500/10 text-amber-100',
	low: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100',
};

const QuestionPanel = ({ questions }) => (
	<div className="space-y-4">
		{questions.map((item, index) => (
			<article
				key={item.question}
				className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
			>
				<div className="mb-3 flex flex-wrap items-center gap-2">
					<Badge variant="secondary">Question {index + 1}</Badge>
					<span className="text-xs leading-5 text-white/45">{item.intention}</span>
				</div>
				<h3 className="text-base font-semibold leading-7 text-white">
					{item.question}
				</h3>
				<p className="mt-3 text-sm leading-6 text-white/60">{item.answer}</p>
			</article>
		))}
	</div>
);

const RoadmapPanel = ({ plan }) => (
	<div className="grid gap-4 xl:grid-cols-2">
		{plan.map((day) => (
			<article
				key={day.day}
				className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
			>
				<Badge className="mb-3">{day.day}</Badge>
				<h3 className="font-semibold text-white">{day.focus}</h3>
				<ul className="mt-4 space-y-3">
					{day.tasks.map((task) => (
						<li key={task} className="flex gap-2 text-sm leading-6 text-white/60">
							<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo-300" />
							<span>{task}</span>
						</li>
					))}
				</ul>
			</article>
		))}
	</div>
);

const ReportsPage = () => {
	const [activeSection, setActiveSection] = useState('technical');
	const score = Math.round(generatedReport.matchScore * 100);

	const activeMeta = reportSections.find(
		(section) => section.id === activeSection,
	);

	return (
		<MainLayout>
			<main className="px-4 py-8 sm:px-6 lg:px-8">
				<div className="mx-auto w-full max-w-7xl">
					<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<Badge variant="secondary" className="mb-3 gap-2">
								<Brain className="size-3.5" />
								Generated report
							</Badge>
							<h1 className="text-3xl font-semibold tracking-tight text-white">
								{generatedReport.role}
							</h1>
							<p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
								{generatedReport.jobDescription}
							</p>
						</div>
						<div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
							<p className="text-xs uppercase tracking-wide text-white/45">
								Match score
							</p>
							<p className="mt-1 text-3xl font-semibold text-white">{score}%</p>
						</div>
					</div>

					<section className="grid min-h-[680px] overflow-hidden rounded-3xl border border-white/25 bg-white/[0.025] shadow-2xl shadow-black/30 lg:grid-cols-[270px_minmax(0,1fr)_330px]">
						<aside className="border-b border-white/15 p-6 lg:border-b-0 lg:border-r">
							<p className="mb-8 text-xs uppercase tracking-[0.22em] text-white/35">
								Sections
							</p>
							<nav className="space-y-2">
								{reportSections.map((section) => {
									const Icon = section.icon;
									const isActive = activeSection === section.id;
									return (
										<button
											key={section.id}
											type="button"
											onClick={() => setActiveSection(section.id)}
											className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors ${
												isActive
													? 'bg-white/10 text-white'
													: 'text-white/60 hover:bg-white/[0.06] hover:text-white'
											}`}
										>
											<Icon className="size-4" />
											{section.label}
										</button>
									);
								})}
							</nav>
						</aside>

						<section className="min-h-[520px] border-b border-white/15 p-6 lg:border-b-0 lg:border-r">
							<div className="mb-6 flex items-start justify-between gap-4">
								<div>
									<p className="text-sm text-white/45">Main content</p>
									<h2 className="mt-2 text-2xl font-semibold text-white">
										{activeMeta.label}
									</h2>
								</div>
								<div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-200">
									<FileQuestion className="size-5" />
								</div>
							</div>

							{activeSection === 'technical' && (
								<QuestionPanel questions={generatedReport.technicalQuestions} />
							)}
							{activeSection === 'behavioral' && (
								<QuestionPanel questions={generatedReport.behavioralQuestions} />
							)}
							{activeSection === 'roadmap' && (
								<RoadmapPanel plan={generatedReport.preparationPlan} />
							)}
						</section>

						<aside className="p-6">
							<div className="mb-8 flex items-center justify-between gap-3">
								<div>
									<p className="text-xs uppercase tracking-[0.22em] text-white/35">
										Readiness
									</p>
									<h2 className="mt-2 text-xl font-semibold text-white">
										Skill Gaps
									</h2>
								</div>
								<div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-200">
									<Target className="size-5" />
								</div>
							</div>

							<div className="flex flex-wrap gap-3">
								{generatedReport.skillGaps.map((gap) => (
									<span
										key={gap.skill}
										className={`rounded-lg border px-3 py-2 text-sm font-medium ${
											severityClass[gap.severity]
										}`}
									>
										{gap.skill}
									</span>
								))}
							</div>

							<Separator className="my-7 bg-white/10" />

							<div className="space-y-4">
								{generatedReport.skillGaps.map((gap) => (
									<div key={gap.description}>
										<div className="mb-1 flex items-center justify-between gap-3">
											<p className="text-sm font-medium text-white">{gap.skill}</p>
											<span className="text-xs capitalize text-white/45">
												{gap.severity}
											</span>
										</div>
										<p className="text-sm leading-6 text-white/55">
											{gap.description}
										</p>
									</div>
								))}
							</div>
						</aside>
					</section>
				</div>
			</main>
		</MainLayout>
	);
};

export default ReportsPage;
