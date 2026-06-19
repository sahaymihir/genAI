import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ease = [0.22, 1, 0.36, 1];

const container = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const PreparationForm = () => {
	const [formData, setFormData] = useState({
		resume: null,
		description: '',
		jobDescription: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleResumeChange = (e) => {
		const file = e.target.files?.[0];
		if (
			file &&
			[
				'application/pdf',
			].includes(file.type)
		) {
			setFormData({ ...formData, resume: file });
		} else {
			toast.error('Unsupported file', {
				description: 'Please upload a PDF file.',
			});
			e.target.value = '';
		}
	};

	const handleDescriptionChange = (e) => {
		const value = e.target.value.slice(0, 500);
		setFormData({ ...formData, description: value });
	};

	const handleJobDescriptionChange = (e) => {
		setFormData({ ...formData, jobDescription: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.resume) {
			toast.error('Resume required', {
				description: 'Please upload your resume to continue.',
			});
			return;
		}

		if (!formData.jobDescription.trim()) {
			toast.error('Job description required', {
				description: 'Add the role you are targeting to continue.',
			});
			return;
		}

		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(false);
				setFormData({ resume: null, description: '', jobDescription: '' });
			}, 2000);
		}, 1500);
	};

	return (
		<section className="px-5 py-16 sm:px-8">
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="mx-auto w-full max-w-2xl"
			>
				<motion.p
					variants={item}
					className="text-sm tracking-wide text-muted-foreground"
				>
					New report
				</motion.p>
				<motion.h1
					variants={item}
					className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
				>
					Prepare for an interview.
				</motion.h1>
				<motion.p
					variants={item}
					className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
				>
					Upload your resume and the role you are targeting. We turn it into a
					focused set of questions and a short plan.
				</motion.p>

				<motion.form
					variants={item}
					onSubmit={handleSubmit}
					className="mt-12 flex flex-col gap-10"
				>
					<div className="flex flex-col gap-3">
						<div className="flex items-baseline justify-between">
							<Label className="text-sm font-medium">Resume</Label>
							<span className="text-xs text-muted-foreground">PDF</span>
						</div>
						<label className="group flex cursor-pointer items-center justify-between border-b border-border pb-3 transition-colors hover:border-foreground">
							<input
								type="file"
								accept=".pdf"
								onChange={handleResumeChange}
								disabled={isSubmitting}
								className="sr-only"
								aria-label="Upload resume"
							/>
							<span
								className={
									formData.resume
										? 'text-sm text-foreground'
										: 'text-sm text-muted-foreground'
								}
							>
								{formData.resume ? formData.resume.name : 'Choose a file…'}
							</span>
							<span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
								{formData.resume ? 'Replace' : 'Browse'}
							</span>
						</label>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex items-baseline justify-between">
							<Label htmlFor="jobDescription" className="text-sm font-medium">
								Target job description
							</Label>
							<span className="text-xs text-muted-foreground">Required</span>
						</div>
						<Textarea
							id="jobDescription"
							value={formData.jobDescription}
							onChange={handleJobDescriptionChange}
							disabled={isSubmitting}
							placeholder="Paste the role, responsibilities and key skills."
							className="min-h-32 resize-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex items-baseline justify-between">
							<Label htmlFor="description" className="text-sm font-medium">
								About you
							</Label>
							<span className="text-xs text-muted-foreground">Optional</span>
						</div>
						<Textarea
							id="description"
							value={formData.description}
							onChange={handleDescriptionChange}
							disabled={isSubmitting}
							placeholder="Background, strengths and what you want to focus on."
							className="min-h-24 resize-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
						/>
						<span className="text-right text-xs text-muted-foreground">
							{formData.description.length}/500
						</span>
					</div>

					<div className="flex items-center justify-end">
						<Button
							type="submit"
							disabled={isSubmitting}
							size="lg"
							className="rounded-full px-7"
						>
							{isSuccess
								? 'Generating…'
								: isSubmitting
									? 'Preparing…'
									: 'Generate report'}
						</Button>
					</div>
				</motion.form>
			</motion.div>
		</section>
	);
};

export default PreparationForm;
