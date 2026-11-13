import { CatIcon, LeafIcon } from '@/components/Icons';

const INK = '#1d2f24';

// Hand-drawn style decorations. All are decorative, so hidden from screen readers.
export function Carrot(props) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden {...props}>
      <path d="M60 52c-9-20-30-30-40-22 4 14 20 24 40 22z" fill="#3f8355" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 52c9-22 32-30 42-20-5 14-22 23-42 20z" fill="#3f8355" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 52c-4-22 2-40 12-44 8 12 2 32-12 44z" fill="#57a36d" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M36 62c8-12 40-12 48 0 8 14-10 70-24 90-14-20-32-76-24-90z" fill="#e0661f" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 84h14M62 102h14M50 118h12" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Sprig(props) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden {...props}>
      <path d="M14 106C40 80 70 50 104 16" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M40 80c-18 2-28-8-30-22 16-2 28 6 30 22z" fill="#ecc35b" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M62 58c-16 0-26-12-24-26 16 0 26 10 24 26z" fill="#57a36d" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M52 70c4 16 18 22 30 18-2-16-14-24-30-18z" fill="#3f8355" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M78 44c2 14 14 20 26 16-2-14-12-20-26-16z" fill="#ecc35b" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

function Paw({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} fill={INK}>
      <ellipse cx="0" cy="6" rx="9" ry="7" />
      <ellipse cx="-10" cy="-6" rx="3.6" ry="5" />
      <ellipse cx="-3" cy="-11" rx="3.6" ry="5" />
      <ellipse cx="5" cy="-11" rx="3.6" ry="5" />
      <ellipse cx="11" cy="-5" rx="3.6" ry="5" />
    </g>
  );
}

export function Paws(props) {
  return (
    <svg viewBox="0 0 160 70" aria-hidden {...props}>
      <Paw x={22} y={46} r={62} />
      <Paw x={62} y={24} r={74} />
      <Paw x={100} y={46} r={62} />
      <Paw x={138} y={24} r={74} />
    </svg>
  );
}

const WORDS = [
  ['rabbits', 'Healthy rabbits'],
  [null, 'Farm raised'],
  ['chickens', 'Chickens'],
  [null, 'Fair prices'],
  ['goats', 'Goats'],
  [null, 'Pay when you receive'],
  ['pigs', 'Pigs'],
  [null, 'We call you back'],
];

// Slow moving strip under the hero. The list is doubled so the loop is seamless.
export function Ticker() {
  const row = (hidden) => (
    <div className="ticker-row" aria-hidden={hidden || undefined}>
      {WORDS.map(([slug, text]) => (
        <span key={text}>
          {slug ? <CatIcon slug={slug} /> : <LeafIcon aria-hidden />} {text}
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
