import { motion } from 'framer-motion';
import { Sparkles, Brain, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
	return (
		<section className="relative overflow-hidden bg-background pt-16 sm:pt-24 lg:pt-32">
			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 size-80 bg-primary/5 rounded-full blur-3xl opacity-40" />
				<div className="absolute top-1/2 -left-40 size-80 bg-primary/10 rounded-full blur-3xl opacity-30" />
			</div>

			<div className="relative mx-auto max-w-4xl px-6 sm:px-8 text-center">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8 inline-block"
				>
					<Badge variant="secondary" className="gap-2">
						<Sparkles className="size-4" />
						AI-Powered Interview Prep
					</Badge>
				</motion.div>

				{/* Main heading */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
				>
					Master Your Next <span className="text-primary">Interview</span> with
					AI
				</motion.h1>

				{/* Subheading */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-balance text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
				>
					Get personalized interview guidance tailored to your resume and target
					role. Practice with AI-driven scenarios, receive instant feedback, and
					walk into your interview with confidence.
				</motion.p>

				{/* Feature highlights */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
				>
					<div className="flex flex-col items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<Brain className="size-5 text-primary" />
						</div>
						<p className="text-sm font-medium text-foreground">AI-Powered</p>
						<p className="text-xs text-muted-foreground">Advanced analysis</p>
					</div>

					<div className="flex flex-col items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<Target className="size-5 text-primary" />
						</div>
						<p className="text-sm font-medium text-foreground">Personalized</p>
						<p className="text-xs text-muted-foreground">Role-specific prep</p>
					</div>

					<div className="flex flex-col items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<Sparkles className="size-5 text-primary" />
						</div>
						<p className="text-sm font-medium text-foreground">
							Instant Feedback
						</p>
						<p className="text-xs text-muted-foreground">Real-time guidance</p>
					</div>
				</motion.div>

				{/* CTA hint */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-center text-sm text-muted-foreground"
				>
					Get started in 30 seconds
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;