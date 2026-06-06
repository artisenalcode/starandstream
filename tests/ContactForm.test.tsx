import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import ContactForm from '../src/components/ContactForm'

describe('ContactForm', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
  })

  it('submits the form and shows success with Send Another button', async () => {
    const mockFetch = vi
      .spyOn(window, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello world' }
    })

    const buttons = screen.getAllByRole('button', { name: /Send Message/i })
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText(/Thank you for reaching out/i)).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' })
    )

    expect(screen.getByRole('button', { name: /Send Another Message/i })).toBeInTheDocument()
  })

  it('clicking Send Another Message resets to idle state', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    )

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello world' }
    })

    const buttons = screen.getAllByRole('button', { name: /Send Message/i })
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText(/Thank you for reaching out/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Send Another Message/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
    })
  })

  it('shows error when server returns non-OK', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
        status: 400
      })
    )

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'bad@email' }
    })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hi' }
    })

    const buttons = screen.getAllByRole('button', { name: /Send Message/i })
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })
})
