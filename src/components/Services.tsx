import React from 'react';

const services = [
  {
    title: 'Credibility Dynamics',
    description: 'Focuses on what happens when credibility becomes distorted and how to bring evaluation back to evidence. Maintain professional credibility when facing dismissal or skepticism.',
    icon: '⚖️',
    link: '/courses/credibility-dynamics'
  },
  {
    title: 'Escalation Intelligence',
    description: 'Anger management for real-world conflict. Understand the "Escalation Cycle" to stay functional and strategic even when emotions are intense, and interrupt the spiral before it takes over.',
    icon: '🛡️',
    link: '/courses/escalation-intelligence'
  },
  {
    title: 'Work Ready Bootcamp',
    description: 'A comprehensive curriculum focused on professionalization and accountability. Gain the resilience and skills needed to excel in high-pressure environments.',
    icon: '⛰️',
    link: '/courses/work-ready-bootcamp'
  },
  {
    title: 'Fractional VP Engineering',
    description: 'Strategic technical leadership for growing startups or established firms. Bridging the gap between business goals and scalable code with "code geek" precision.',
    icon: '⚙️',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white border-y border-boho-sand/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-boho-dark mb-16 uppercase tracking-wider">Products & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-boho-sand/5 p-8 rounded-lg shadow-sm border border-boho-sand/40 hover:border-boho-clay/50 transition-colors flex flex-col">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-boho-dark mb-3 uppercase tracking-wide">{service.title}</h3>
              <p className="text-boho-dark/80 leading-relaxed font-sans flex-grow">{service.description}</p>
              {service.link && (
                <a href={service.link} className="inline-block mt-6 text-boho-clay font-bold tracking-widest uppercase hover:text-boho-dark transition-colors">
                  Learn More &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
