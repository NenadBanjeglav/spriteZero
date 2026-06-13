import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';

const submitVote = vi.hoisted(() => vi.fn());

vi.mock('./voteBackend', () => ({
  useSubmitVote: () => submitVote,
  useVoteTotals: () => ({ byLocation: [], total: 0 }),
}));

describe('campaign shell', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    submitVote.mockReset();
  });

  it('renders an emotion-first hero in Serbian Latin without leading with live numbers', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /Jedno mesto u frižideru je još prazno\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/glasova|vote|votes|ukupno/i)).not.toBeInTheDocument();
  });

  it('opens a focused vote entry placeholder from the primary CTA', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }));

    expect(
      screen.getByRole('dialog', { name: /Hoću Sprite Zero u Srbiji/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/email i mesto će postati glas za Sprite Zero u Srbiji/i),
    ).toBeInTheDocument();
  });

  it('shows the accessible email-backed vote form without a required consent checkbox', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }));

    const emailInput = screen.getByLabelText(/Email adresa/i);
    const locationSelect = screen.getByLabelText(/Mesto/i);
    const honeypot = screen.getByLabelText(/Ne popunjavaj ovo polje/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');
    expect(locationSelect).toHaveDisplayValue('Izaberi mesto');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot).toHaveClass('sr-only');
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(
      screen.getByText(/Slanjem emaila i mesta glasaš da Sprite Zero dođe u Srbiju/i),
    ).toBeInTheDocument();

    await user.type(emailInput, 'test@example.com');
    await user.selectOptions(locationSelect, 'beograd');

    expect(emailInput).toHaveValue('test@example.com');
    expect(locationSelect).toHaveValue('beograd');
  });

  it('submits a counted email-backed vote and shows the Counted Vote success state', async () => {
    const user = userEvent.setup();
    submitVote.mockResolvedValueOnce({ locationId: 'beograd', status: 'counted' });
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }));
    await user.type(screen.getByLabelText(/Email adresa/i), 'Test@Example.COM');
    await user.selectOptions(screen.getByLabelText(/Mesto/i), 'beograd');
    await user.click(screen.getByRole('button', { name: /Pošalji glas/i }));

    expect(submitVote).toHaveBeenCalledWith(
      expect.objectContaining({
        consentCopyVersion: 'vote-consent-v1',
        email: 'Test@Example.COM',
        honeypot: '',
        locationId: 'beograd',
      }),
    );
    expect(await screen.findByText(/Tvoj glas je ubrojan/i)).toBeInTheDocument();
    expect(screen.getByText(/Beograd je sada deo signala potražnje/i)).toBeInTheDocument();
  });

  it('shows a friendly Already-Counted Vote state for duplicate emails', async () => {
    const user = userEvent.setup();
    submitVote.mockResolvedValueOnce({ locationId: 'novi-sad', status: 'already_counted' });
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }));
    await user.type(screen.getByLabelText(/Email adresa/i), 'duplicate@example.com');
    await user.selectOptions(screen.getByLabelText(/Mesto/i), 'novi-sad');
    await user.click(screen.getByRole('button', { name: /Pošalji glas/i }));

    expect(await screen.findByText(/Ovaj email je već ubrojan/i)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText(/Novi Sad je sada deo signala potražnje/i)).toBeInTheDocument();
  });

  it('links to the privacy route from the campaign footer', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /Privatnost/i })).toHaveAttribute(
      'href',
      '/privacy',
    );
  });

  it('renders placeholder privacy content on the privacy route', () => {
    window.history.pushState({}, '', '/privacy');

    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Privatnost kampanje/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/email, izabrano mesto, vreme slanja/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Nazad na kampanju/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
