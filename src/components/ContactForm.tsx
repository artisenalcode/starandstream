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
    <section id="contact" className="py-24 bg-boho-sand/10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-boho-dark mb-8">Get In Touch</h2>
        <p className="text-center text-boho-dark/80 mb-12">
          Ready to start your next project? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-boho-sage/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-boho-dark mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-boho-sage focus:border-boho-sage outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-boho-dark mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-boho-sage focus:border-boho-sage outline-none transition-colors"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-boho-dark mb-2">Message</label>
            <textarea 
              id="message" 
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-boho-sage focus:border-boho-sage outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting' || status === 'success'}
            className="w-full bg-boho-clay text-white py-3 rounded-md font-medium hover:bg-boho-clay/90 transition-colors disabled:opacity-70"
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
