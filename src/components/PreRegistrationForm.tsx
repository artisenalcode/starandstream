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
    <div className="bg-boho-wheat/5 p-8 border border-boho-wheat/40 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold text-boho-navy mb-4 uppercase tracking-wide">
        Pre-register for {courseName}
      </h3>
      <p className="text-boho-navy/80 mb-8 font-sans">
        Join the waitlist for our upcoming cohort in Afton, WY.
        {showFeeNotice && (
          <span className="block mt-2 font-semibold text-boho-gold">
            Note: An RSVP fee of $10 will be required to secure your spot once registration
            officially opens.
          </span>
        )}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-boho-navy mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-boho-wheat rounded-sm focus:ring-boho-denim focus:border-boho-denim outline-none font-sans"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-boho-navy mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-boho-wheat rounded-sm focus:ring-boho-denim focus:border-boho-denim outline-none font-sans"
            />
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-boho-navy mb-2">
            I am a...
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full px-4 py-2 border border-boho-wheat rounded-sm focus:ring-boho-denim focus:border-boho-denim outline-none font-sans bg-white"
          >
            <option value="">Select an option</option>
            <option value="student">Student / Young Professional</option>
            <option value="parent">Parent</option>
            <option value="employer">Employer / Contractor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-boho-navy mb-2">
            Why are you interested in this course?
          </label>
          <textarea
            id="interest"
            name="interest"
            rows={4}
            className="w-full px-4 py-2 border border-boho-wheat rounded-sm focus:ring-boho-denim focus:border-boho-denim outline-none resize-none font-sans"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="w-full bg-boho-navy text-white py-4 rounded-sm font-barlow text-lg tracking-wider uppercase hover:bg-boho-gold transition-colors disabled:opacity-70"
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
