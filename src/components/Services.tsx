import React from 'react';

const services = [
  {
    title: 'Brand Identity',
    description: 'We craft authentic, memorable brand identities that reflect the spirit of your business.',
    icon: '🌾',
  },
  {
    title: 'Web Development',
    description: 'Modern, blazing-fast websites built with the latest technologies like Astro and React.',
    icon: '💻',
  },
  {
    title: 'Digital Strategy',
    description: 'Guiding your digital presence with strategic planning and meaningful design.',
    icon: '🧭',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-boho-sage/10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-boho-dark mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-boho-sage/20 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-boho-brown mb-4">{service.title}</h3>
              <p className="text-boho-dark/80 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
