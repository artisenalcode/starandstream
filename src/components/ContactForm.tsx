import React, { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }

    try {
      const response = await fetch('/api/contact', {
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-boho-navy mb-4 uppercase tracking-wider">
          Stay Clear. Stay Functional. Start Today.
        </h2>
        <p className="text-center text-boho-navy/80 mb-12 font-sans text-lg">
          Inquire about Corporate Training, Engineering Consulting, or general questions below.{' '}
          <br />
          <em>(To pre-register for a course, please visit the specific course page.)</em>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-sm shadow-sm border-2 border-boho-wheat"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-boho-navy mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border-2 border-boho-wheat rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-boho-navy mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border-2 border-boho-wheat rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-boho-navy mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2 border-2 border-boho-wheat rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-boho-navy text-white py-4 rounded-sm font-barlow text-lg tracking-wider uppercase hover:bg-boho-gold transition-colors disabled:opacity-70 shadow-sm"
          >
            {status === 'submitting'
              ? 'Sending...'
              : status === 'success'
                ? 'Message Sent!'
                : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center mt-4 text-sm">
              Thank you for reaching out. We will get back to you shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-4 text-sm">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
