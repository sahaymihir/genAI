import { useState } from 'react';
import {
	ArrowRight,
	Briefcase,
	CheckCircle2,
	FileText,
	Loader2,
	Lock,
	Upload,
	User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

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
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			].includes(file.type)
		) {
			setFormData({ ...formData, resume: file });
		} else {
			alert('Please upload a PDF or DOCX file');
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
			alert('Please upload your resume');
			return;
		}

		if (!formData.jobDescription.trim()) {
			alert('Please provide a job description');
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
		<section id="prepare" className="px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto grid w-full max-w-7xl ">
				<Card className="shadow-sm">
					<CardContent className="pt-5">
						<form onSubmit={handleSubmit} className="flex flex-col gap-6">
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<FileText className="size-4 text-primary" />
									<Label className="text-base font-semibold">Resume</Label>
									<span className="text-sm text-destructive">*</span>
								</div>
								<label className="block cursor-pointer rounded-xl border border-dashed bg-muted/30 p-6 transition-colors hover:border-primary/60 hover:bg-muted/50">
									<input
										type="file"
										accept=".pdf,.docx"
										onChange={handleResumeChange}
										disabled={isSubmitting}
										className="sr-only"
										aria-label="Upload resume"
									/>
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
										<div className="flex items-center gap-4">
											<div className="flex size-12 items-center justify-center rounded-lg bg-card text-primary shadow-sm">
												<Upload className="size-5" />
											</div>
											<div>
												<p className="font-medium text-foreground">
													{formData.resume
														? formData.resume.name
														: 'Upload resume file'}
												</p>
												<p className="mt-1 text-sm text-muted-foreground">
													PDF or DOCX, max 10MB
												</p>
											</div>
										</div>
										<span className="text-sm font-medium text-primary">
											Choose file
										</span>
									</div>
								</label>
							</div>

							<div className="grid gap-6 lg:grid-cols-2">
								<div className="space-y-3">
									<div className="flex items-center gap-2">
										<User className="size-4 text-primary" />
										<Label
											htmlFor="description"
											className="text-base font-semibold"
										>
											Self description
										</Label>
										<span className="text-sm text-muted-foreground">
											Optional
										</span>
									</div>
									<Textarea
										id="description"
										value={formData.description}
										onChange={handleDescriptionChange}
										disabled={isSubmitting}
										placeholder="Add your background, strengths, and interview goals."
										className="min-h-44 resize-none bg-background"
									/>
									<p className="text-right text-xs text-muted-foreground">
										{formData.description.length}/500 characters
									</p>
								</div>

								<div className="space-y-3">
									<div className="flex items-center gap-2">
										<Briefcase className="size-4 text-primary" />
										<Label
											htmlFor="jobDescription"
											className="text-base font-semibold"
										>
											Target job description
										</Label>
										<span className="text-sm text-destructive">*</span>
									</div>
									<Textarea
										id="jobDescription"
										value={formData.jobDescription}
										onChange={handleJobDescriptionChange}
										disabled={isSubmitting}
										placeholder="Paste the role, responsibilities, requirements, and key skills."
										className="min-h-44 resize-none bg-background"
									/>
								</div>
							</div>

							<div className="flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-end">
								<Button
									type="submit"
									disabled={isSubmitting}
									size="lg"
									className="gap-2"
								>
									{isSuccess ? (
										<>
											<CheckCircle2 className="size-5" />
											Generating report
										</>
									) : isSubmitting ? (
										<>
											<Loader2 className="size-5 animate-spin" />
											Preparing
										</>
									) : (
										<>
											Start preparation
											<ArrowRight className="size-5" />
										</>
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default PreparationForm;
