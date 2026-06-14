import { Check, Copy, Share2, X } from 'lucide-react';
import { type FormEvent, type RefObject, useEffect, useRef, useState } from 'react';
import {
  trackPrimaryCtaClicked,
  trackShareClicked,
  trackVoteAlreadyCounted,
  trackVoteCounted,
  trackVoteEntryOpened,
  trackVoteSubmitted,
} from './analytics';
import heroImage from './assets/empty-fridge-hero-generated-v1.png';
import heroVideo from './assets/empty-fridge-hero-loop-dev-v1.mp4';
import finalDemandSignalImage from './assets/final-demand-signal-generated-v1.png';
import finalDemandSignalVideo from './assets/final-demand-signal-loop-dev-v1.mp4';
import serbianMomentsImage from './assets/serbian-moments-generated-v1.png';
import serbianMomentsVideo from './assets/serbian-moments-loop-dev-v1.mp4';
import { getDemandMapPins, getMapPinPosition } from './demandMap';
import { serbiaDemandMapPath } from './serbiaMapShape';
import { useSubmitVote, useVoteTotals, type SubmitVoteResult, type VoteTotals } from './voteBackend';
import { searchVoteLocations, voteLocations } from './voteLocations';

const consentCopyVersion = 'vote-consent-v1';
const campaignShareTitle = 'Sprite Zero u Srbiji';
const campaignShareText =
  'Hoću Sprite Zero u Srbiji. Dodaj svoj glas da pokažemo gde ga ljudi već traže.';

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
  const [locationSearch, setLocationSearch] = useState('');
  const [resultLocationId, setResultLocationId] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | SubmitVoteResult['status']>(
    'idle',
  );
  const submitVote = useSubmitVote();
  const voteTotals = useVoteTotals();
  const shouldReduceMotion = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const demandMapRef = useRef<HTMLElement>(null);
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
  const filteredLocationOptions = searchVoteLocations(locationSearch);
  const selectedFormLocation = voteLocations.find((location) => location.id === locationId);
  const locationOptions =
    selectedFormLocation &&
    !filteredLocationOptions.some((location) => location.id === selectedFormLocation.id)
      ? [selectedFormLocation, ...filteredLocationOptions]
      : filteredLocationOptions;

  async function handleVoteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError('');
    setSubmitState('submitting');
    trackVoteSubmitted('vote_modal');

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

      if (result.status === 'counted' || result.status === 'already_counted') {
        if (result.status === 'counted') {
          trackVoteCounted();
        } else {
          trackVoteAlreadyCounted();
        }

        setShareFeedback('');
        setIsVoteOpen(false);
        window.setTimeout(() => {
          demandMapRef.current?.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start',
          });
        }, 0);
      }
    } catch {
      setSubmitState('idle');
      setSubmitError('Glas trenutno ne može da se sačuva. Pokušaj ponovo za koji trenutak.');
    }
  }

  async function writeCampaignLinkToClipboard() {
    await window.navigator.clipboard?.writeText(getCampaignShareUrl());
    setShareFeedback('Link je kopiran.');
  }

  async function copyCampaignLink() {
    trackShareClicked('copy_link');
    await writeCampaignLinkToClipboard();
  }

  async function shareCampaign() {
    if (window.navigator.share) {
      trackShareClicked('native_share');

      try {
        await window.navigator.share(getCampaignSharePayload());
        setShareFeedback('Hvala što deliš kampanju.');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        await writeCampaignLinkToClipboard();
      }

      return;
    }

    await copyCampaignLink();
  }

  function openVoteFromHero() {
    trackPrimaryCtaClicked('hero');
    trackVoteEntryOpened('hero');
    setIsVoteOpen(true);
  }

  function openVoteFromFinalAsk() {
    trackPrimaryCtaClicked('final_ask');
    trackVoteEntryOpened('final_ask');
    setIsVoteOpen(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020504] text-white">
      <header
        aria-label="Sprite Zero u Srbiji"
        className="relative isolate min-h-[92svh] overflow-hidden"
      >
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
          src={heroImage}
        />
        {shouldReduceMotion ? null : (
          <video
            aria-hidden="true"
            autoPlay
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
            loop
            muted
            playsInline
            poster={heroImage}
            preload="metadata"
            src={heroVideo}
          />
        )}
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
              Zero izbor je već tu. Sprite Zero još nije: prazno mesto u
              frižideru, na polici i u kafiću čeka hladan lemon-lime ukus bez
              šećera.
            </p>
            <button
              className="mt-9 w-full rounded-md bg-[#dffb6a] px-6 py-4 text-base font-bold text-[#06110d] shadow-[0_0_42px_rgba(223,251,106,0.35)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#dffb6a] focus:ring-offset-2 focus:ring-offset-[#050908] sm:w-fit"
              onClick={openVoteFromHero}
              type="button"
            >
              Hoću Sprite Zero u Srbiji
            </button>
          </div>
        </div>
      </header>

      <CinematicStorySection
        body="Letnja gradska vrućina, kasna hrana posle izlaska, pauza za učenje ili posao, sport ili šetnja pored reke: svuda postoji isti prazan prostor za hladan lemon-lime ukus bez šećera."
        eyebrow="Srpski trenuci"
        imageSrc={serbianMomentsImage}
        mediaPosition="object-[72%_center] sm:object-[44%_center]"
        sectionId="serbian-moments-title"
        shouldReduceMotion={shouldReduceMotion}
        title="Trenuci u Srbiji"
        videoSrc={serbianMomentsVideo}
      />

      <ZeroSugarChoiceSection shouldReduceMotion={shouldReduceMotion} />

      <DemandMapSection
        highlightedLocationId={resultLocationId}
        onCopyCampaignLink={copyCampaignLink}
        onShareCampaign={shareCampaign}
        sectionRef={demandMapRef}
        shareFeedback={shareFeedback}
        shouldReduceMotion={shouldReduceMotion}
        voteStatus={
          submitState === 'counted' || submitState === 'already_counted' ? submitState : null
        }
        voteTotals={voteTotals}
      />

      <CinematicStorySection
        align="right"
        body="Coca-Cola Srbija, donesite Sprite Zero tamo gde ga ljudi već traže."
        ctaLabel="Hoću Sprite Zero u Srbiji"
        eyebrow="Finalni poziv"
        imageSrc={finalDemandSignalImage}
        mediaPosition="object-[62%_center] sm:object-[45%_center]"
        onCtaClick={openVoteFromFinalAsk}
        sectionId="final-ask-title"
        shouldReduceMotion={shouldReduceMotion}
        title="Coca-Cola Srbija"
        videoSrc={finalDemandSignalVideo}
      />

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
                    htmlFor="vote-location-search"
                  >
                    Pretraga mesta
                  </label>
                  <input
                    autoComplete="off"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-200 focus:ring-2 focus:ring-emerald-200/30"
                    id="vote-location-search"
                    onChange={(event) => setLocationSearch(event.target.value)}
                    placeholder="npr. Niš, Zvečan, Prizren"
                    type="search"
                    value={locationSearch}
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
                    {locationOptions.length > 0 ? (
                      locationOptions.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.label}
                        </option>
                      ))
                    ) : (
                      <option disabled value="">
                        Nema rezultata
                      </option>
                    )}
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

type CinematicStorySectionProps = {
  align?: 'left' | 'right';
  body: string;
  ctaLabel?: string;
  eyebrow: string;
  imageSrc: string;
  mediaPosition: string;
  onCtaClick?: () => void;
  sectionId: string;
  shouldReduceMotion: boolean;
  title: string;
  videoSrc: string;
};

function CinematicStorySection({
  align = 'left',
  body,
  ctaLabel,
  eyebrow,
  imageSrc,
  mediaPosition,
  onCtaClick,
  sectionId,
  shouldReduceMotion,
  title,
  videoSrc,
}: CinematicStorySectionProps) {
  const alignmentClass = align === 'right' ? 'justify-end text-right' : 'justify-start';
  const copyToneClass = align === 'right' ? 'items-end' : 'items-start';
  const overlayClass =
    align === 'right'
      ? 'bg-[linear-gradient(270deg,rgba(2,5,4,0.92)_0%,rgba(2,5,4,0.68)_42%,rgba(2,5,4,0.12)_100%)]'
      : 'bg-[linear-gradient(90deg,rgba(2,5,4,0.92)_0%,rgba(2,5,4,0.68)_42%,rgba(2,5,4,0.12)_100%)]';

  return (
    <section
      aria-labelledby={sectionId}
      className="relative isolate min-h-[84svh] overflow-hidden px-5 py-20 sm:px-8 lg:px-12"
      data-cinematic-motion={shouldReduceMotion ? 'static' : 'scroll'}
      data-cinematic-reveal="scroll"
    >
      <img
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 -z-20 h-full w-full object-cover ${mediaPosition}`}
        src={imageSrc}
      />
      {shouldReduceMotion ? null : (
        <video
          aria-hidden="true"
          autoPlay
          className={`absolute inset-0 -z-20 h-full w-full object-cover ${mediaPosition}`}
          loop
          muted
          playsInline
          poster={imageSrc}
          preload="metadata"
          src={videoSrc}
        />
      )}
      <div className={`absolute inset-0 -z-10 ${overlayClass}`} />
      <div
        className={`mx-auto flex min-h-[calc(84svh-10rem)] max-w-7xl items-end ${alignmentClass}`}
      >
        <div className={`flex max-w-2xl flex-col ${copyToneClass}`}>
          <p className="text-sm font-semibold uppercase text-[#dffb6a]">{eyebrow}</p>
          <h2
            className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
            id={sectionId}
          >
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-100 sm:text-lg">{body}</p>
          {ctaLabel && onCtaClick ? (
            <button
              className="mt-8 w-full rounded-md bg-[#dffb6a] px-6 py-4 text-base font-bold text-[#06110d] shadow-[0_0_42px_rgba(223,251,106,0.28)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#dffb6a] focus:ring-offset-2 focus:ring-offset-[#050908] sm:w-fit"
              onClick={onCtaClick}
              type="button"
            >
              {ctaLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ZeroSugarChoiceSection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <section
      aria-labelledby="zero-sugar-choice-title"
      className="relative isolate overflow-hidden bg-[#06110d] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      data-cinematic-motion={shouldReduceMotion ? 'static' : 'scroll'}
      data-cinematic-reveal="scroll"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_28%,rgba(223,251,106,0.16),transparent_28%),radial-gradient(circle_at_74%_62%,rgba(101,255,209,0.12),transparent_30%),linear-gradient(135deg,rgba(2,5,4,0.98),rgba(6,17,13,0.9))]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[#dffb6a]">
            Izbor bez šećera
          </p>
          <h2
            className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl"
            id="zero-sugar-choice-title"
          >
            Izbor bez šećera
          </h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-8 text-zinc-100 sm:text-lg lg:justify-self-end">
          <p>Srbija već zna taj izbor: hladno, gazirano, jasno, bez šećera.</p>
          <p
            className="inline-flex rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold leading-6 text-emerald-100"
            role="note"
          >
            Sprite Zero postoji na drugim tržištima. U Srbiji ga još nema.
          </p>
        </div>
      </div>
    </section>
  );
}

type DemandMapSectionProps = {
  highlightedLocationId: string;
  onCopyCampaignLink: () => void;
  onShareCampaign: () => void;
  sectionRef: RefObject<HTMLElement | null>;
  shareFeedback: string;
  shouldReduceMotion: boolean;
  voteStatus: Extract<SubmitVoteResult['status'], 'already_counted' | 'counted'> | null;
  voteTotals: VoteTotals;
};

function DemandMapSection({
  highlightedLocationId,
  onCopyCampaignLink,
  onShareCampaign,
  sectionRef,
  shareFeedback,
  shouldReduceMotion,
  voteStatus,
  voteTotals,
}: DemandMapSectionProps) {
  const demandPins = getDemandMapPins(voteTotals.byLocation);
  const isLoadingTotals = voteTotals.isLoading;
  const hasRealVotes = !isLoadingTotals && voteTotals.total > 0 && demandPins.length > 0;
  const highlightedLocation = highlightedLocationId
    ? voteLocations.find((location) => location.id === highlightedLocationId)
    : undefined;
  const highlightedPosition = highlightedLocation
    ? getMapPinPosition(highlightedLocation)
    : undefined;

  return (
    <section
      aria-labelledby="demand-map-title"
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#04110e] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      data-cinematic-motion={shouldReduceMotion ? 'static' : 'scroll'}
      data-cinematic-reveal="scroll"
      ref={sectionRef}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(223,251,106,0.13),transparent_28%),radial-gradient(circle_at_80%_58%,rgba(70,203,160,0.13),transparent_30%),linear-gradient(180deg,rgba(2,5,4,0.2),rgba(2,5,4,0.82))]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-200">
            Srbija Demand Map
          </p>
          <h2
            className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl"
            id="demand-map-title"
          >
            Mapa potražnje
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-200 sm:text-lg">
            Svaki pin dolazi iz stvarnog sačuvanog glasa. Javno se prikazuju
            samo zbirni brojevi po mestu, bez email adresa i pojedinačnih
            identiteta.
          </p>

          {voteStatus && highlightedLocation ? (
            <div
              className="mt-7 rounded-md border border-[#dffb6a]/35 bg-[#dffb6a]/10 p-5 shadow-[0_0_42px_rgba(223,251,106,0.12)]"
              role="status"
            >
              <p className="text-lg font-black text-white">
                {voteStatus === 'counted'
                  ? 'Tvoj glas je ubrojan.'
                  : 'Ovaj email je već ubrojan.'}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-200">
                {highlightedLocation.label} je sada deo signala potražnje za
                Sprite Zero u Srbiji.
              </p>
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-sm font-black uppercase text-[#dffb6a]">
                  Podeli signal dalje
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  Dodaj još jedan glas za Sprite Zero u Srbiji tako što ćeš
                  poslati kampanju nekome ko ga isto traži.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#dffb6a] px-4 py-3 text-sm font-black text-[#06110d] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#dffb6a] focus:ring-offset-2 focus:ring-offset-[#102019]"
                    onClick={onShareCampaign}
                    type="button"
                  >
                    <Share2 aria-hidden="true" size={18} strokeWidth={2.5} />
                    Podeli kampanju
                  </button>
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-black text-white transition hover:border-[#dffb6a]/70 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#dffb6a] focus:ring-offset-2 focus:ring-offset-[#102019]"
                    onClick={onCopyCampaignLink}
                    type="button"
                  >
                    <Copy aria-hidden="true" size={18} strokeWidth={2.5} />
                    Kopiraj link
                  </button>
                </div>
                {shareFeedback ? (
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-100">
                    <Check aria-hidden="true" size={16} strokeWidth={2.5} />
                    {shareFeedback}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-7 rounded-md border border-white/10 bg-white/[0.04] p-5">
            {isLoadingTotals ? (
              <>
                <p className="text-2xl font-black text-white">
                  Mapa učitava stvarne glasove.
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Čeka se javni Convex agregat pre prikaza pinova ili praznog
                  stanja.
                </p>
              </>
            ) : hasRealVotes ? (
              <>
                <p className="text-3xl font-black text-[#dffb6a]">
                  {formatTotalVoteCount(voteTotals.total)}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Zbir dolazi direktno iz Convex agregata za javni prikaz.
                </p>
                <ol className="mt-5 space-y-3" aria-label="Mesta sa glasovima">
                  {demandPins.slice(0, 5).map((pin) => (
                    <li
                      className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-sm"
                      key={pin.location.id}
                    >
                      <span className="font-semibold text-white">{pin.location.label}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 font-black text-emerald-100">
                        {formatPinVoteCount(pin.count)}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <>
                <p className="text-2xl font-black text-white">
                  Mapa čeka prve stvarne glasove.
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Nema seed podataka ni lažnog zamaha. Kada se glas sačuva,
                  mesto dobija pin i broj iz agregata.
                </p>
              </>
            )}
          </div>
        </div>

        <div
          aria-label="Stilizovana mapa Srbije sa Kosovom"
          className="relative mx-auto aspect-[5/6] w-full max-w-[560px]"
          role="img"
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full drop-shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            viewBox="0 0 100 120"
          >
            <defs>
              <radialGradient id="serbia-map-backlight" cx="54%" cy="46%" r="58%">
                <stop offset="0" stopColor="#dffb6a" stopOpacity="0.3" />
                <stop offset="0.48" stopColor="#2ee6a8" stopOpacity="0.16" />
                <stop offset="1" stopColor="#03110d" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="serbia-map-fill" x1="15" x2="88" y1="10" y2="110">
                <stop offset="0" stopColor="#65ffd1" stopOpacity="0.36" />
                <stop offset="0.52" stopColor="#dffb6a" stopOpacity="0.22" />
                <stop offset="1" stopColor="#8df7ff" stopOpacity="0.18" />
              </linearGradient>
              <pattern id="serbia-map-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M8 0H0V8" fill="none" stroke="#ffffff" strokeOpacity="0.04" />
              </pattern>
              <filter id="serbia-map-glow" x="-35%" y="-25%" width="170%" height="150%">
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feColorMatrix
                  in="blur"
                  result="glow"
                  type="matrix"
                  values="0 0 0 0 0.74 0 0 0 0 1 0 0 0 0 0.42 0 0 0 0.55 0"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect fill="url(#serbia-map-backlight)" height="120" width="100" />
            <path
              d={serbiaDemandMapPath}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.14"
              strokeWidth="7"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={serbiaDemandMapPath}
              fill="#071b15"
              stroke="#dffb6a"
              strokeLinejoin="round"
              strokeWidth="2.2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={serbiaDemandMapPath}
              fill="url(#serbia-map-fill)"
              filter="url(#serbia-map-glow)"
              stroke="#dffb6a"
              strokeLinejoin="round"
              strokeOpacity="0.9"
              strokeWidth="1.1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={serbiaDemandMapPath}
              fill="url(#serbia-map-grid)"
              opacity="0.75"
            />
          </svg>

          <div className="absolute inset-[7%_8%]" role="list" aria-label="Pinovi potražnje">
            {demandPins.map((pin) => (
              <div
                aria-label={`${pin.location.label}, ${formatPinVoteCount(pin.count)}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
                key={pin.location.id}
                role="listitem"
                style={{
                  left: `${pin.position.left}%`,
                  top: `${pin.position.top}%`,
                }}
              >
                <span className="grid size-8 place-items-center rounded-full border border-[#dffb6a]/70 bg-[#dffb6a] text-xs font-black text-[#06110d] shadow-[0_0_28px_rgba(223,251,106,0.5)]">
                  {pin.count}
                </span>
                <span className="hidden rounded-full border border-white/10 bg-[#06110d]/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur sm:inline-flex">
                  {pin.location.label}
                </span>
              </div>
            ))}

            {highlightedLocation && highlightedPosition ? (
              <div
                aria-label={`${highlightedLocation.label}, tvoj izabrani grad`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${highlightedPosition.left}%`,
                  top: `${highlightedPosition.top}%`,
                }}
              >
                <span className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dffb6a]/70 bg-[#dffb6a]/20 animate-[demandPulse_1500ms_ease-out_2]" />
                <span className="relative grid size-4 place-items-center rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.62)]" />
                <span className="absolute -right-8 -top-9 rounded-full bg-[#dffb6a] px-2 py-1 text-xs font-black text-[#06110d] shadow-[0_0_28px_rgba(223,251,106,0.5)] animate-[voteFloat_1600ms_ease-out_1]">
                  +1
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
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

function getCampaignSharePayload() {
  return {
    text: campaignShareText,
    title: campaignShareTitle,
    url: getCampaignShareUrl(),
  };
}

function getCampaignShareUrl() {
  return new URL('/', window.location.origin).toString();
}

function formatTotalVoteCount(count: number) {
  if (count === 1) {
    return '1 stvarni glas';
  }

  if (count > 1 && count < 5) {
    return `${count} stvarna glasa`;
  }

  return `${count} stvarnih glasova`;
}

function formatPinVoteCount(count: number) {
  if (count === 1) {
    return '1 glas';
  }

  if (count > 1 && count < 5) {
    return `${count} glasa`;
  }

  return `${count} glasova`;
}

function hashUserAgent(userAgent: string) {
  let hash = 5381;

  for (const character of userAgent) {
    hash = (hash * 33) ^ character.charCodeAt(0);
  }

  return `ua-${(hash >>> 0).toString(36)}`;
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function usePrefersReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    if (!mediaQuery) {
      return;
    }

    function updateMotionPreference() {
      setShouldReduceMotion(mediaQuery.matches);
    }

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  return shouldReduceMotion;
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050908] px-5 py-12 text-white sm:px-8 lg:px-12">
      <article className="mx-auto max-w-3xl">
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
        <div className="mt-8 space-y-8 text-base leading-8 text-zinc-200">
          <p>
            Sprite Zero u Srbiji je javna, nezvanična kampanja koja meri
            interesovanje za Sprite Zero u Srbiji. Ova stranica objašnjava
            šta se prikuplja kada pošalješ glas i kako se ti podaci koriste.
          </p>

          <section aria-labelledby="privacy-collected-data">
            <h2
              className="text-2xl font-black leading-tight text-white"
              id="privacy-collected-data"
            >
              Šta prikupljamo
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                Email adresu koju uneseš, uključujući normalizovanu verziju za
                prepoznavanje već ubrojanih glasova.
              </li>
              <li>Izabrani grad ili opštinu iz kontrolisane liste.</li>
              <li>Vreme slanja glasa i verziju saglasnosti prikazane uz formu.</li>
              <li>
                Osnovne tehničke metapodatke za zaštitu od zloupotrebe, ako su
                dostupni: privremeni identifikator pregledača, hash korisničkog
                agenta, pokušaje slanja i honeypot signal.
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacy-purpose">
            <h2 className="text-2xl font-black leading-tight text-white" id="privacy-purpose">
              Zašto koristimo podatke
            </h2>
            <p className="mt-4">
              Podaci se koriste za brojanje potražnje za Sprite Zero u Srbiji,
              sprečavanje duplih ili zloupotrebljenih glasova i moguće
              obaveštenje povezano sa ovom kampanjom. Ne koristimo ih za
              odvojenu newsletter prijavu niti za prodaju podataka.
            </p>
          </section>

          <section aria-labelledby="privacy-public-display">
            <h2
              className="text-2xl font-black leading-tight text-white"
              id="privacy-public-display"
            >
              Šta je javno
            </h2>
            <p className="mt-4">
              Javno se prikazuju samo ukupni broj glasova i zbirni brojevi po
              gradu ili opštini. Email adrese, pojedinačni identiteti,
              pojedinačna vremena slanja i tehnički metapodaci nisu deo javnog
              prikaza kampanje.
            </p>
          </section>

          <section aria-labelledby="privacy-private-data">
            <h2
              className="text-2xl font-black leading-tight text-white"
              id="privacy-private-data"
            >
              Šta ostaje privatno
            </h2>
            <p className="mt-4">
              Sirove email adrese i pojedinačni identiteti nisu javni. Čuvaju
              se samo koliko je potrebno da se glas prepozna, ukloni na zahtev
              ili zaštiti od zloupotrebe.
            </p>
          </section>

          <section aria-labelledby="privacy-delete-contact">
            <h2
              className="text-2xl font-black leading-tight text-white"
              id="privacy-delete-contact"
            >
              Brisanje i kontakt
            </h2>
            <p className="mt-4">
              Za zahtev za brisanje pošalji email adresu kojom si glasao/la
              privremenom ljudskom kontaktu vlasnika kampanje:{' '}
              <span className="font-semibold text-emerald-100">
                [dopisati lični email vlasnika kampanje pre javne objave]
              </span>
              . Zahtev se koristi samo da se pronađe i ukloni tvoj glas iz
              privatne baze i iz zbirnih brojeva.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
