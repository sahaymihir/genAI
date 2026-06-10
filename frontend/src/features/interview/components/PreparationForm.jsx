import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Briefcase, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const PreparationForm = () => {
  const [formData, setFormData] = useState({
    resume: null,
    description: '',
    jobDescription: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0]
    if (file && ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setFormData({ ...formData, resume: file })
    } else {
      alert('Please upload a PDF or DOCX file')
      e.target.value = ''
    }
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value.slice(0, 500)
    setFormData({ ...formData, description: value })
  }

  const handleJobDescriptionChange = (e) => {
    setFormData({ ...formData, jobDescription: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.resume) {
      alert('Please upload your resume')
      return
    }

    if (!formData.jobDescription.trim()) {
      alert('Please provide a job description')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ resume: null, description: '', jobDescription: '' })
      }, 2000)
    }, 1500)
  }

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-6 sm:px-8 bg-muted/30">
      <div className="mx-auto max-w-2xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Start Your Preparation
          </h2>
          <p className="text-lg text-muted-foreground">
            Provide your details and we&apos;ll generate a personalized interview plan
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-border">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Interview Details</CardTitle>
              <CardDescription>Fill in your information to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Resume Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-primary flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <label className="text-lg font-semibold text-foreground">
                        Upload Your Resume
                      </label>
                      <span className="text-sm text-destructive">*</span>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleResumeChange}
                      disabled={isSubmitting}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      aria-label="Upload resume"
                    />
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-card">
                      <Upload className="size-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        {formData.resume ? formData.resume.name : 'Drop your resume here'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF or DOCX, max 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description textarea */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="size-5 text-primary flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <label htmlFor="description" className="text-lg font-semibold text-foreground">
                        Your Self Description
                      </label>
                      <span className="text-sm text-muted-foreground">(Optional)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleDescriptionChange}
                      disabled={isSubmitting}
                      placeholder="Tell us about yourself, your background, key skills, and what makes you unique. This helps us tailor the interview prep..."
                      className="h-32 resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.description.length}/500 characters
                    </p>
                  </div>
                </div>

                {/* Job Description textarea */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="size-5 text-primary flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <label htmlFor="jobDescription" className="text-lg font-semibold text-foreground">
                        Target Job Description
                      </label>
                      <span className="text-sm text-destructive">*</span>
                    </div>
                  </div>

                  <Textarea
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleJobDescriptionChange}
                    disabled={isSubmitting}
                    placeholder="Paste the job description here. Include the role, responsibilities, requirements, and any specific skills they're looking for..."
                    className="h-40 resize-none"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full gap-2"
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 className="size-5" />
                      All set! Generating your prep plan...
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Preparing your session...
                    </>
                  ) : (
                    <>
                      Start Interview Preparation
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </Button>

                {/* Security note */}
                <p className="text-center text-xs text-muted-foreground">
                  Your data is encrypted and secure. We never share your information.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
export default PreparationForm;