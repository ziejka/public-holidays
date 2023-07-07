import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from "./App"

describe('App', () => {
  it('should get holidays from openAPI service', async () => {
    render(<App />)

    await waitFor(() => screen.getByText('Poland'))

    fireEvent.change(screen.getByLabelText('Country:'), { target: { value: "PL" } })
    fireEvent.click(screen.getByRole('button', { name: /Get holidays/ }))

    await waitFor(() => screen.getByRole('table'))

    expect(screen.getByRole('table')).toBeDefined()
  })
})