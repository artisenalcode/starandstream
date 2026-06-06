import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import PreRegistrationForm from '../src/components/PreRegistrationForm'

describe('PreRegistrationForm', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders with course name and all fields', () => {
    render(<PreRegistrationForm courseName="Test Course" />)

    expect(screen.getByText(/Pre-register for Test Course/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('I am a...')).toBeInTheDocument()
    expect(screen.getByLabelText(/Why are you interested/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Join Waitlist/i })).toBeInTheDocument()
  })

  it('shows fee notice when showFeeNotice is true', () => {
    render(<PreRegistrationForm courseName="Test Course" showFeeNotice={true} />)

    expect(screen.getByText(/10/)).toBeInTheDocument()
  })

  it('does not show fee notice when showFeeNotice is false', () => {
    render(<PreRegistrationForm courseName="Test Course" showFeeNotice={false} />)

    expect(screen.queryByText(/RSVP fee/i)).not.toBeInTheDocument()
  })

  it('submits form and shows success with Register Another button', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    )

    render(<PreRegistrationForm courseName="Test Course" />)

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText('I am a...'), {
      target: { value: 'student' }
    })

    const buttons = screen.getAllByRole('button', { name: /Join Waitlist/i })
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText(/disciplined approach/i)).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /Register Another/i })).toBeInTheDocument()
  })

  it('clicking Register Another resets to idle state', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    )

    render(<PreRegistrationForm courseName="Test Course" />)

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText('I am a...'), {
      target: { value: 'student' }
    })

    const buttons = screen.getAllByRole('button', { name: /Join Waitlist/i })
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText(/disciplined approach/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Register Another/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Join Waitlist/i })).toBeInTheDocument()
    })
  })
})
