import { Scale, ShieldAlert, Mountain, Settings } from 'lucide-react'
import React from 'react'

const services = [
  {
    title: 'Credibility Dynamics',
    description:
      'Focuses on what happens when credibility becomes distorted and how to bring evaluation back to evidence. Maintain professional credibility when facing dismissal or skepticism.',
    icon: <Scale className="w-10 h-10 text-boho-gold" />,
    link: '/courses/credibility-dynamics'
  },
  {
    title: 'Escalation Intelligence',
    description:
      'Anger management for real-world conflict. Understand the "Escalation Cycle" to stay functional and strategic even when emotions are intense, and interrupt the spiral before it takes over.',
    icon: <ShieldAlert className="w-10 h-10 text-boho-gold" />,
    link: '/courses/escalation-intelligence'
  },
  {
    title: 'Work Ready Bootcamp',
    description:
      'A comprehensive curriculum focused on professionalization and accountability. Gain the resilience and skills needed to excel in high-pressure environments.',
    icon: <Mountain className="w-10 h-10 text-boho-gold" />,
    link: '/courses/work-ready-bootcamp'
  },
  {
    title: 'Fractional VP Engineering',
    description:
      'Strategic technical leadership for growing startups or established firms. Bridging the gap between business goals and scalable code with "code geek" precision.',
    icon: <Settings className="w-10 h-10 text-boho-gold" />,
    link: '/services/fractional-vp-engineering'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white border-y border-boho-wheat/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-boho-navy mb-16 uppercase tracking-wider">
          Products & Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const CardWrapper = service.link ? 'a' : 'div'
            return (
              <CardWrapper
                key={index}
                href={service.link}
                className="bg-white p-8 rounded-sm border-2 border-boho-wheat hover:border-boho-gold transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col group relative block"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-boho-wheat/20 rounded-bl-full -z-10 group-hover:bg-boho-gold/10 transition-colors"></div>
                <div className="mb-6 bg-boho-navy/5 inline-flex p-4 rounded-full w-max">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-boho-navy mb-3 uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-boho-navy/80 leading-relaxed font-sans flex-grow">
                  {service.description}
                </p>
                {service.link && (
                  <span className="inline-block mt-6 text-boho-gold font-bold tracking-widest uppercase group-hover:text-boho-navy transition-colors">
                    Learn More &rarr;
                  </span>
                )}
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
