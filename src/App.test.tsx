import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';

const submitVote = vi.hoisted(() => vi.fn());
const track = vi.hoisted(() => vi.fn());
const voteTotals = vi.hoisted(() => ({
  current: {
    byLocation: [] as Array<{ count: number; locationId: string }>,
    isLoading: false,
    total: 0,
  },
}));

vi.mock('@vercel/analytics', () => ({
  track,
}));

vi.mock('./voteBackend', () => ({
  useSubmitVote: () => submitVote,
  useVoteTotals: () => voteTotals.current,
}));

describe('campaign shell', () => {
  const clipboardWriteText = vi.fn();
  const scrollIntoView = vi.fn();
  const nativeShare = vi.fn();

  function installClipboardMock() {
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardWriteText,
      },
    });
  }

  function setReducedMotionPreference(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        dispatchEvent: vi.fn(),
        matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
  }

  function getHeroPrimaryCta() {
    return within(screen.getByRole('banner', { name: /Sprite Zero u Srbiji/i })).getByRole(
      'button',
      {
        name: 'Hoću Sprite Zero u Srbiji',
      },
    );
  }

  beforeEach(() => {
    window.history.pushState({}, '', '/');
    submitVote.mockReset();
    track.mockReset();
    voteTotals.current = { byLocation: [], isLoading: false, total: 0 };
    clipboardWriteText.mockReset();
    nativeShare.mockReset();
    scrollIntoView.mockReset();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    installClipboardMock();
    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: undefined,
    });
    setReducedMotionPreference(false);
  });

  it('renders an emotion-first hero in Serbian Latin without leading with live numbers', () => {
    render(<App />);

    const hero = screen.getByRole('banner', { name: /Sprite Zero u Srbiji/i });

    expect(
      within(hero).getByRole('heading', {
        name: /Jedno mesto u frižideru je još prazno\./i,
      }),
    ).toBeInTheDocument();
    expect(
      within(hero).getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }),
    ).toBeInTheDocument();
    expect(within(hero).queryByText(/glasova|vote|votes|ukupno/i)).not.toBeInTheDocument();
  });

  it('presents the five-part cinematic story arc as named public sections', () => {
    render(<App />);

    const hero = screen.getByRole('banner', { name: /Sprite Zero u Srbiji/i });

    expect(
      within(hero).getByRole('heading', {
        name: /Jedno mesto u frižideru je još prazno\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Trenuci u Srbiji/i })).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: /Izbor bez šećera/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Mapa potražnje/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Coca-Cola Srbija/i })).toBeInTheDocument();
  });

  it('makes the Missing From The Fridge Story clear in concise hero copy', () => {
    render(<App />);

    const hero = screen.getByRole('banner', { name: /Sprite Zero u Srbiji/i });
    const absenceCopy = within(hero).getByText(/frižideru, na polici i u kafiću/i);

    expect(absenceCopy).toBeInTheDocument();
    expect(absenceCopy.textContent?.length).toBeLessThanOrEqual(190);
  });

  it('shows the required Serbian Moments in everyday Serbian copy', () => {
    render(<App />);

    const momentsSection = screen.getByRole('region', { name: /Trenuci u Srbiji/i });

    expect(within(momentsSection).getByText(/letnja gradska vrućina/i)).toBeInTheDocument();
    expect(within(momentsSection).getByText(/kasna hrana/i)).toBeInTheDocument();
    expect(within(momentsSection).getByText(/pauza za učenje ili posao/i)).toBeInTheDocument();
    expect(within(momentsSection).getByText(/sport ili šetnja pored reke/i)).toBeInTheDocument();
  });

  it('keeps the Availability Gap Note brief and separate from market-report copy', () => {
    render(<App />);

    const zeroSugarSection = screen.getByRole('region', { name: /Izbor bez šećera/i });
    const availabilityNote = within(zeroSugarSection).getByText(
      /Sprite Zero postoji na drugim tržištima\. U Srbiji ga još nema\./i,
    );

    expect(availabilityNote).toHaveAttribute('role', 'note');
    expect(availabilityNote.textContent).toHaveLength(62);
    expect(
      within(zeroSugarSection).queryByText(/istraživanje|segment|udeo tržišta|distribucija/i),
    ).not.toBeInTheDocument();
  });

  it('opts story beats into cinematic scroll reveal behavior when motion is allowed', () => {
    render(<App />);

    for (const sectionName of [
      /Trenuci u Srbiji/i,
      /Izbor bez šećera/i,
      /Mapa potražnje/i,
      /Coca-Cola Srbija/i,
    ]) {
      const storySection = screen.getByRole('region', { name: sectionName });

      expect(storySection).toHaveAttribute('data-cinematic-reveal', 'scroll');
      expect(storySection).toHaveAttribute('data-cinematic-motion', 'scroll');
    }
  });

  it('keeps the story readable while disabling video and scroll reveals for reduced motion', () => {
    setReducedMotionPreference(true);

    render(<App />);

    expect(document.querySelectorAll('video[autoplay]').length).toBe(0);
    expect(getHeroPrimaryCta()).toBeInTheDocument();

    for (const sectionName of [
      /Trenuci u Srbiji/i,
      /Izbor bez šećera/i,
      /Mapa potražnje/i,
      /Coca-Cola Srbija/i,
    ]) {
      const storySection = screen.getByRole('region', { name: sectionName });

      expect(storySection).toHaveAttribute('data-cinematic-motion', 'static');
    }
  });

  it('frames the Final Ask for Coca-Cola Serbia and keeps the primary CTA available there', async () => {
    const user = userEvent.setup();
    render(<App />);

    const finalAsk = screen.getByRole('region', { name: /Coca-Cola Srbija/i });

    expect(
      within(finalAsk).getByText(/donesite Sprite Zero tamo gde ga ljudi već traže/i),
    ).toBeInTheDocument();
    expect(within(finalAsk).queryByText(/žalba|obećavamo lansiranje|stigao je/i)).not.toBeInTheDocument();

    await user.click(within(finalAsk).getByRole('button', { name: 'Hoću Sprite Zero u Srbiji' }));

    expect(
      screen.getByRole('dialog', { name: /Hoću Sprite Zero u Srbiji/i }),
    ).toBeInTheDocument();
  });

  it('renders a polished real-data zero state for the Serbia Demand Map', () => {
    render(<App />);

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });

    expect(
      within(mapSection).getByRole('img', {
        name: /Stilizovana mapa Srbije sa Kosovom/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(mapSection).getByText(/Mapa čeka prve stvarne glasove/i),
    ).toBeInTheDocument();
    expect(within(mapSection).queryByText(/Beograd\s+12/i)).not.toBeInTheDocument();
    expect(within(mapSection).queryByText(/test@example\.com/i)).not.toBeInTheDocument();
  });

  it('does not show the zero state before aggregate totals finish loading', () => {
    voteTotals.current = { byLocation: [], isLoading: true, total: 0 };

    render(<App />);

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });

    expect(
      within(mapSection).getByText(/Mapa učitava stvarne glasove/i),
    ).toBeInTheDocument();
    expect(
      within(mapSection).queryByText(/Mapa čeka prve stvarne glasove/i),
    ).not.toBeInTheDocument();
  });

  it('renders city pins and count bubbles from Convex aggregate totals only', () => {
    voteTotals.current = {
      byLocation: [
        { count: 2, locationId: 'beograd' },
        { count: 1, locationId: 'zvecan' },
      ],
      isLoading: false,
      total: 3,
    };

    render(<App />);

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });

    expect(within(mapSection).getByText(/3 stvarna glasa/i)).toBeInTheDocument();
    expect(within(mapSection).getByLabelText(/Beograd, 2 glasa/i)).toBeInTheDocument();
    expect(within(mapSection).getByLabelText(/Zvečan, 1 glas/i)).toBeInTheDocument();
    expect(within(mapSection).queryByText(/test@example\.com|normalizedEmail/i)).not.toBeInTheDocument();
  });

  it('opens a focused vote entry placeholder from the primary CTA', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getHeroPrimaryCta());

    expect(track).toHaveBeenCalledWith('primary_cta_clicked', { source: 'hero' });
    expect(track).toHaveBeenCalledWith('vote_entry_opened', { source: 'hero' });
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

    await user.click(getHeroPrimaryCta());

    const emailInput = screen.getByLabelText(/Email adresa/i);
    const locationSelect = screen.getByLabelText(/Mesto/i);
    const honeypot = screen.getByLabelText(/Ne popunjavaj ovo polje/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');
    expect(locationSelect).toHaveDisplayValue('Izaberi mesto');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot).toHaveClass('sr-only');
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    const consentCopy = screen.getByText(
      /Slanjem emaila i mesta glasaš da Sprite Zero dođe u Srbiju/i,
    );

    expect(consentCopy).toBeInTheDocument();
    expect(within(consentCopy.closest('p') as HTMLElement).getByRole('link', {
      name: /Privatnost/i,
    })).toHaveAttribute('href', '/privacy');

    await user.type(emailInput, 'test@example.com');
    await user.selectOptions(locationSelect, 'beograd');

    expect(emailInput).toHaveValue('test@example.com');
    expect(locationSelect).toHaveValue('beograd');
  });

  it('searches the Serbian Location List while keeping location selection controlled', async () => {
    const user = userEvent.setup();
    submitVote.mockResolvedValueOnce({ locationId: 'zvecan', status: 'counted' });
    render(<App />);

    await user.click(getHeroPrimaryCta());

    await user.type(screen.getByLabelText(/Pretraga mesta/i), 'zvec');
    expect(screen.getByRole('option', { name: 'Zvečan' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Beograd' })).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/Mesto/i), 'zvecan');
    await user.type(screen.getByLabelText(/Email adresa/i), 'kosovo@example.com');
    await user.click(screen.getByRole('button', { name: /Pošalji glas/i }));

    expect(submitVote).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'kosovo@example.com',
        locationId: 'zvecan',
      }),
    );
    expect(await screen.findByText(/Tvoj glas je ubrojan/i)).toBeInTheDocument();
    expect(screen.getByText(/Zvečan je sada deo signala potražnje/i)).toBeInTheDocument();
  });

  it('submits a counted email-backed vote and shows the Counted Vote success state', async () => {
    const user = userEvent.setup();
    submitVote.mockResolvedValueOnce({ locationId: 'beograd', status: 'counted' });
    render(<App />);

    await user.click(getHeroPrimaryCta());
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
    expect(track).toHaveBeenCalledWith('vote_submitted', { source: 'vote_modal' });
    expect(track).toHaveBeenCalledWith('vote_counted', { status: 'counted' });
    expect(JSON.stringify(track.mock.calls)).not.toMatch(/Test@Example\.COM/i);
    expect(await screen.findByText(/Tvoj glas je ubrojan/i)).toBeInTheDocument();
    expect(screen.getByText(/Beograd je sada deo signala potražnje/i)).toBeInTheDocument();
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });
    expect(
      within(mapSection).getByLabelText(/Beograd, tvoj izabrani grad/i),
    ).toBeInTheDocument();
    expect(within(mapSection).getByText('+1')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows a friendly Already-Counted Vote state for duplicate emails', async () => {
    const user = userEvent.setup();
    submitVote.mockResolvedValueOnce({ locationId: 'novi-sad', status: 'already_counted' });
    render(<App />);

    await user.click(getHeroPrimaryCta());
    await user.type(screen.getByLabelText(/Email adresa/i), 'duplicate@example.com');
    await user.selectOptions(screen.getByLabelText(/Mesto/i), 'novi-sad');
    await user.click(screen.getByRole('button', { name: /Pošalji glas/i }));

    expect(await screen.findByText(/Ovaj email je već ubrojan/i)).toBeInTheDocument();
    expect(track).toHaveBeenCalledWith('vote_submitted', { source: 'vote_modal' });
    expect(track).toHaveBeenCalledWith('vote_already_counted', { status: 'already_counted' });
    expect(JSON.stringify(track.mock.calls)).not.toMatch(/duplicate@example\.com/i);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText(/Novi Sad je sada deo signala potražnje/i)).toBeInTheDocument();
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });
    expect(
      within(mapSection).getByLabelText(/Novi Sad, tvoj izabrani grad/i),
    ).toBeInTheDocument();
    expect(within(mapSection).getByText('+1')).toBeInTheDocument();
  });

  it('shows Share After Vote actions after a counted vote and copies a clean campaign link', async () => {
    const user = userEvent.setup();
    installClipboardMock();
    clipboardWriteText.mockResolvedValueOnce(undefined);
    submitVote.mockResolvedValueOnce({ locationId: 'beograd', status: 'counted' });
    render(<App />);

    await user.click(getHeroPrimaryCta());
    await user.type(screen.getByLabelText(/Email adresa/i), 'share@example.com');
    await user.selectOptions(screen.getByLabelText(/Mesto/i), 'beograd');
    await user.click(screen.getByRole('button', { name: /Pošalji glas/i }));

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });
    expect(await within(mapSection).findByText(/Podeli signal dalje/i)).toBeInTheDocument();
    expect(
      within(mapSection).getByText(/Dodaj još jedan glas za Sprite Zero u Srbiji/i),
    ).toBeInTheDocument();

    await user.click(within(mapSection).getByRole('button', { name: /Kopiraj link/i }));

    await waitFor(() =>
      expect(clipboardWriteText).toHaveBeenCalledWith('http://localhost:3000/'),
    );
    expect(track).toHaveBeenCalledWith('share_clicked', { method: 'copy_link' });
    expect(within(mapSection).getByText(/Link je kopiran/i)).toBeInTheDocument();
    expect(screen.queryByText(/share@example\.com/i)).not.toBeInTheDocument();
  });

  it('uses native share with prepared Serbian share text when available', async () => {
    const user = userEvent.setup();
    installClipboardMock();
    nativeShare.mockResolvedValueOnce(undefined);
    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: nativeShare,
    });
    submitVote.mockResolvedValueOnce({ locationId: 'novi-sad', status: 'already_counted' });
    render(<App />);

    await user.click(getHeroPrimaryCta());
    await user.type(screen.getByLabelText(/Email adresa/i), 'native@example.com');
    await user.selectOptions(screen.getByLabelText(/Mesto/i), 'novi-sad');
    await user.click(screen.getByRole('button', { name: /Pošalji glas/i }));

    const mapSection = screen.getByRole('region', { name: /Mapa potražnje/i });
    expect(await within(mapSection).findByText(/Podeli signal dalje/i)).toBeInTheDocument();

    await user.click(within(mapSection).getByRole('button', { name: /Podeli kampanju/i }));

    expect(nativeShare).toHaveBeenCalledWith({
      text: 'Hoću Sprite Zero u Srbiji. Dodaj svoj glas da pokažemo gde ga ljudi već traže.',
      title: 'Sprite Zero u Srbiji',
      url: 'http://localhost:3000/',
    });
    expect(track).toHaveBeenCalledWith('share_clicked', { method: 'native_share' });
    expect(clipboardWriteText).not.toHaveBeenCalled();
    expect(screen.queryByText(/native@example\.com/i)).not.toBeInTheDocument();
  });

  it('links to the privacy route from the campaign footer', () => {
    render(<App />);

    expect(
      screen.getByText(/Javna, nezvanična kampanja za Sprite Zero u Srbiji/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Privatnost/i })).toHaveAttribute(
      'href',
      '/privacy',
    );
    expect(screen.getAllByText(/nezvanična/i)).toHaveLength(1);
  });

  it('renders finished Serbian privacy content on the privacy route', () => {
    window.history.pushState({}, '', '/privacy');

    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Privatnost kampanje/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Šta prikupljamo/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Email adresu koju uneseš/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Izabrani grad ili opštinu iz kontrolisane liste/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/vreme slanja glasa i verziju saglasnosti/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/osnovne tehničke metapodatke za zaštitu od zloupotrebe/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/brojanje potražnje za Sprite Zero u Srbiji/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Javno se prikazuju samo ukupni broj glasova/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sirove email adrese i pojedinačni identiteti nisu javni/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/\[dopisati lični email vlasnika kampanje pre javne objave\]/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Nazad na kampanju/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
