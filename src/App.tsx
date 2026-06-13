import { X } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import heroImage from './assets/empty-fridge-hero.png';
import { useSubmitVote, useVoteTotals, type SubmitVoteResult } from './voteBackend';
import { voteLocations } from './voteLocations';

const consentCopyVersion = 'vote-consent-v1';

export default function App() {
  const pathname = window.location.pathname;

  if (pathname === '/privacy') {
    return <PrivacyPage />;
  }

  return <CampaignHome />;
}

function CampaignHome() {
  const [isVoteOpen, setIsVoteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [locationId, setLocationId] = useState('');
  const [resultLocationId, setResultLocationId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | SubmitVoteResult['status']>(
    'idle',
  );
  const submitVote = useSubmitVote();
  const voteTotals = useVoteTotals();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isVoteOpen) {
      return;
    }

    emailInputRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsVoteOpen(false);
      }
    }

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isVoteOpen]);

  const selectedLocation = voteLocations.find(
    (location) => location.id === (resultLocationId || locationId),
  );

  async function handleVoteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError('');
    setSubmitState('submitting');

    try {
      const result = await submitVote({
        clientId: getVoteClientId(),
        consentCopyVersion,
        email,
        honeypot,
        locationId,
        userAgentHash: hashUserAgent(window.navigator.userAgent),
      });
      setResultLocationId(result.locationId);
      setSubmitState(result.status);
    } catch {
      setSubmitState('idle');
      setSubmitError('Glas trenutno ne može da se sačuva. Pokušaj ponovo za koji trenutak.');
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020504] text-white">
      <section className="relative isolate min-h-[92svh] overflow-hidden">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
          src={heroImage}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_38%,rgba(198,255,117,0.16),transparent_25%),linear-gradient(90deg,rgba(2,5,4,0.94)_0%,rgba(2,5,4,0.74)_42%,rgba(2,5,4,0.22)_100%)]" />
        <div className="mx-auto flex min-h-[92svh] w-full max-w-7xl items-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-12">
          <div className="max-w-3xl pb-5">
            <p className="mb-4 text-sm font-semibold uppercase text-[#d7fff5]">
              Sprite Zero u Srbiji
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Jedno mesto u frižideru je još prazno.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100 sm:text-xl">
              Izbor bez šećera već postoji u svakodnevnim trenucima. Nedostaje
              samo hladan lemon-lime ukus koji ljudi već traže.
            </p>
            <button
              className="mt-9 w-full rounded-md bg-[#dffb6a] px-6 py-4 text-base font-bold text-[#06110d] shadow-[0_0_42px_rgba(223,251,106,0.35)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#dffb6a] focus:ring-offset-2 focus:ring-offset-[#050908] sm:w-fit"
              onClick={() => setIsVoteOpen(true)}
              type="button"
            >
              Hoću Sprite Zero u Srbiji
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-zinc-400 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Javna, nezvanična kampanja za Sprite Zero u Srbiji.</p>
          <a
            className="font-semibold text-emerald-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2 focus:ring-offset-[#050908]"
            href="/privacy"
          >
            Privatnost
          </a>
        </div>
      </footer>

      {isVoteOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/70 px-4 py-4 backdrop-blur-md sm:items-center sm:justify-center"
          onClick={() => setIsVoteOpen(false)}
        >
          <section
            aria-labelledby="vote-dialog-title"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-lg border border-emerald-200/20 bg-[#07110f] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Zatvori"
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-200 transition hover:border-emerald-200/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
              onClick={() => setIsVoteOpen(false)}
              ref={closeButtonRef}
              type="button"
            >
              <X aria-hidden="true" size={18} strokeWidth={2.5} />
            </button>
            <p className="text-xs font-semibold uppercase text-emerald-200">
              Glas za Sprite Zero
            </p>
            <h2
              className="mt-4 pr-12 text-3xl font-black leading-tight text-white"
              id="vote-dialog-title"
            >
              Hoću Sprite Zero u Srbiji
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-200">
              Email i mesto će postati glas za Sprite Zero u Srbiji. Izaberi
              mesto iz kontrolisane liste da mapa kasnije ostane čista.
            </p>
            {submitState === 'counted' || submitState === 'already_counted' ? (
              <div
                className="mt-6 rounded-md border border-emerald-200/20 bg-white/[0.05] p-5"
                role="status"
              >
                <p className="text-lg font-black text-white">
                  {submitState === 'counted'
                    ? 'Tvoj glas je ubrojan.'
                    : 'Ovaj email je već ubrojan.'}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-200">
                  {selectedLocation?.label ?? 'Izabrano mesto'} je sada deo
                  signala potražnje za Sprite Zero u Srbiji.
                </p>
                <p className="mt-3 text-sm font-semibold text-emerald-200">
                  Ukupno glasova: {voteTotals.total}
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleVoteSubmit}>
                <div>
                  <label
                    className="block text-sm font-semibold text-zinc-100"
                    htmlFor="vote-email"
                  >
                    Email adresa
                  </label>
                  <input
                    autoComplete="email"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-200 focus:ring-2 focus:ring-emerald-200/30"
                    id="vote-email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="ti@example.com"
                    ref={emailInputRef}
                    required
                    type="email"
                    value={email}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-zinc-100"
                    htmlFor="vote-location"
                  >
                    Mesto
                  </label>
                  <select
                    className="mt-2 w-full rounded-md border border-white/10 bg-[#0d1915] px-4 py-3 text-base text-white outline-none transition focus:border-emerald-200 focus:ring-2 focus:ring-emerald-200/30"
                    id="vote-location"
                    onChange={(event) => setLocationId(event.target.value)}
                    required
                    value={locationId}
                  >
                    <option value="">Izaberi mesto</option>
                    {voteLocations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="sr-only" htmlFor="vote-website">
                  Ne popunjavaj ovo polje
                </label>
                <input
                  autoComplete="off"
                  className="sr-only"
                  id="vote-website"
                  name="website"
                  onChange={(event) => setHoneypot(event.target.value)}
                  tabIndex={-1}
                  value={honeypot}
                />

                <input name="consentCopyVersion" type="hidden" value={consentCopyVersion} />

                <p className="text-sm leading-6 text-zinc-300">
                  Slanjem emaila i mesta glasaš da Sprite Zero dođe u Srbiju.
                  Email koristimo za brojanje interesovanja i eventualno
                  obaveštenje o kampanji.{' '}
                  <a
                    className="font-semibold text-emerald-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    href="/privacy"
                  >
                    Privatnost
                  </a>
                </p>

                {submitError ? (
                  <p className="text-sm font-semibold text-red-200" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  className="w-full rounded-md bg-[#dffb6a] px-5 py-3 text-base font-bold text-[#06110d] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#dffb6a] focus:ring-offset-2 focus:ring-offset-[#07110f] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={submitState === 'submitting'}
                  type="submit"
                >
                  {submitState === 'submitting' ? 'Šalje se...' : 'Pošalji glas'}
                </button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </main>
  );
}

function getVoteClientId() {
  const storageKey = 'sprite-zero-vote-client-id';

  try {
    const existingClientId = window.localStorage.getItem(storageKey);

    if (existingClientId) {
      return existingClientId;
    }

    const clientId =
      window.crypto.randomUUID?.() ??
      `client-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(storageKey, clientId);
    return clientId;
  } catch {
    return undefined;
  }
}

function hashUserAgent(userAgent: string) {
  let hash = 5381;

  for (const character of userAgent) {
    hash = (hash * 33) ^ character.charCodeAt(0);
  }

  return `ua-${(hash >>> 0).toString(36)}`;
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050908] px-5 py-12 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-3xl">
        <a
          className="inline-flex rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-200/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2 focus:ring-offset-[#050908]"
          href="/"
        >
          Nazad na kampanju
        </a>
        <p className="mt-12 text-sm font-semibold uppercase text-emerald-200">
          Sprite Zero u Srbiji
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          Privatnost kampanje
        </h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-zinc-200">
          <p>
            Ovo je početna verzija Privacy Route stranice za javnu kampanju.
            Puna pravila stižu kada bude povezan glas za Sprite Zero u Srbiji.
          </p>
          <p>
            Planirani podaci za glasanje su email, izabrano mesto, vreme slanja
            i osnovni tehnički podaci za zaštitu od zloupotrebe. Javno će biti
            prikazani samo zbirni brojevi i interesovanje po mestu.
          </p>
          <p>
            Email adrese i pojedinačni identiteti ne pripadaju javnom prikazu
            kampanje.
          </p>
        </div>
      </section>
    </main>
  );
}
