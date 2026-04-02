import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-boho-navy mb-4 uppercase tracking-wider">Stay Clear. Stay Functional. Start Today.</h2>
        <p className="text-center text-boho-navy/80 mb-12 font-sans text-lg">
          Inquire about Corporate Training, Engineering Consulting, or general questions below. <br/>
          <em>(To pre-register for a course, please visit the specific course page.)</em>
        </p>

        <form onSubmit={handleSubmit} className="bg-boho-wheat/5 p-8 border border-boho-wheat/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-boho-navy mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-boho-denim focus:border-boho-denim outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-boho-navy mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-boho-denim focus:border-boho-denim outline-none transition-colors"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-boho-navy mb-2">Message</label>
            <textarea 
              id="message" 
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-boho-denim focus:border-boho-denim outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-boho-navy text-white py-4 rounded-sm font-barlow text-lg tracking-wider uppercase hover:bg-boho-gold transition-colors disabled:opacity-70"
          >
            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
          </button>
          
          {status === 'success' && (
            <p className="text-green-600 text-center mt-4 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
          )}
        </form>
      </div>
    </section>
  );
}
