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
          className="bg-white p-8 rounded-sm shadow-[8px_8px_0px_#4A6A8A] border-4 border-boho-navy relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-boho-gold"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-boho-navy mb-2 uppercase tracking-widest"
              >
                Name
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
                Email
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

          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-bold text-boho-navy mb-2 uppercase tracking-widest"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 border-2 border-boho-navy rounded-sm focus:ring-0 focus:border-boho-gold outline-none transition-colors resize-none font-sans bg-boho-wheat/10"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-boho-gold border-2 border-boho-navy text-boho-navy py-4 rounded-sm font-barlow text-xl tracking-wider uppercase font-bold hover:bg-transparent transition-colors disabled:opacity-70 shadow-[4px_4px_0px_#0A192F] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
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
