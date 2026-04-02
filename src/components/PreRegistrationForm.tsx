import React, { useState } from 'react'

interface PreRegistrationFormProps {
  courseName: string
  showFeeNotice?: boolean
}

export default function PreRegistrationForm({
  courseName,
  showFeeNotice = false
}: PreRegistrationFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      interest: formData.get('interest'),
      courseName
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white p-8 border-4 border-boho-navy rounded-sm shadow-[8px_8px_0px_#4A6A8A] max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-boho-gold"></div>
      <h3 className="text-3xl font-bold text-boho-navy mt-2 mb-4 uppercase tracking-wide">
        Pre-register for {courseName}
      </h3>
      <p className="text-boho-navy/80 mb-8 font-sans font-medium">
        Join the waitlist for our upcoming cohort in Afton, WY.
        {showFeeNotice && (
          <span className="block mt-2 font-bold text-boho-gold tracking-wide">
            Note: An RSVP fee of $10 will be required to secure your spot once registration
            officially opens.
          </span>
        )}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-boho-navy mb-2 uppercase tracking-widest"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border-2 border-boho-navy rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors font-sans bg-boho-wheat/10"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-boho-navy mb-2 uppercase tracking-widest"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border-2 border-boho-navy rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors font-sans bg-boho-wheat/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-bold text-boho-navy mb-2 uppercase tracking-widest"
          >
            I am a...
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full px-4 py-3 border-2 border-boho-navy rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors font-sans bg-white"
          >
            <option value="">Select an option</option>
            <option value="student">Student / Young Professional</option>
            <option value="parent">Parent</option>
            <option value="employer">Employer / Contractor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="interest"
            className="block text-sm font-bold text-boho-navy mb-2 uppercase tracking-widest"
          >
            Why are you interested in this course?
          </label>
          <textarea
            id="interest"
            name="interest"
            rows={4}
            className="w-full px-4 py-3 border-2 border-boho-navy rounded-sm focus:ring-0 focus:border-boho-gold outline-none resize-none transition-colors font-sans bg-boho-wheat/10"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="w-full bg-boho-gold border-2 border-boho-navy text-boho-navy py-4 rounded-sm font-barlow text-xl tracking-wider uppercase font-bold hover:bg-transparent transition-colors disabled:opacity-70 shadow-[4px_4px_0px_#0A192F] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
        >
          {status === 'submitting'
            ? 'Submitting...'
            : status === 'success'
              ? 'Pre-registration Received!'
              : 'Join Waitlist'}
        </button>

        {status === 'success' && (
          <p className="text-boho-denim text-center mt-4 font-medium">
            Thank you. We take a disciplined approach to our growth—expect an update from us soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center mt-4 font-medium">
            Something went wrong. Please try again later.
          </p>
        )}
      </form>
    </div>
  )
}
