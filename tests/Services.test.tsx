import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import Services from '../src/components/Services'

describe('Services', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the section heading', () => {
    render(<Services />)
    expect(screen.getByText('Products & Services')).toBeInTheDocument()
  })

  it('renders all four service cards by heading text', () => {
    render(<Services />)

    expect(screen.getByText('Credibility Dynamics')).toBeInTheDocument()
    expect(screen.getByText('Escalation Intelligence')).toBeInTheDocument()
    expect(screen.getByText('Work Ready Bootcamp')).toBeInTheDocument()
    expect(screen.getByText('Fractional VP Engineering')).toBeInTheDocument()
  })

  it('each card links to the correct URL', () => {
    render(<Services />)

    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))

    expect(hrefs).toContain('/courses/credibility-dynamics')
    expect(hrefs).toContain('/courses/escalation-intelligence')
    expect(hrefs).toContain('/courses/work-ready-bootcamp')
    expect(hrefs).toContain('/services/fractional-vp-engineering')
  })
})
