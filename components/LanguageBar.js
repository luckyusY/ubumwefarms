'use client';
import { useEffect, useState } from 'react';

// The site is written in English; Google Translate translates it in the browser.
const LANGUAGES = [
  { code: 'rw', label: 'Kinyarwanda', short: 'RW' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'sw', label: 'Kiswahili', short: 'SW' },
];

function currentLanguage() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i);
  return m ? m[1] : 'en';
}

// Google Translate keeps the chosen language in the "googtrans" cookie.
// It may be set on the bare host and on the parent domain, so clear and set both.
function setLanguageCookie(code) {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.split('.').slice(-2).join('.')}`];
  for (const d of domains) {
    const domain = d ? `; domain=${d}` : '';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
  }
  if (code !== 'en') {
    document.cookie = `googtrans=/en/${code}; path=/`;
  }
}

// Google Translate rewrites text nodes, which can confuse React when it later
// updates the page. Make removeChild/insertBefore tolerate those moved nodes.
function guardDomForTranslation() {
  if (window.__ufGuarded || typeof Node !== 'function') return;
  window.__ufGuarded = true;
  const remove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return remove.call(this, child);
  };
  const insert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return insert.call(this, node, null);
    return insert.call(this, node, ref);
  };
}

function loadGoogleTranslate() {
  if (document.getElementById('google-translate-script')) return;
  window.ufTranslateInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: LANGUAGES.map((l) => l.code).join(','), autoDisplay: false },
      'google_translate_element'
    );
  };
  const s = document.createElement('script');
  s.id = 'google-translate-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=ufTranslateInit';
  s.async = true;
  document.body.appendChild(s);
}

export default function LanguageBar() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const code = currentLanguage();
    setLang(code);
    // Only load Google's script when a translation is actually wanted.
    if (code !== 'en') {
      guardDomForTranslation();
      loadGoogleTranslate();
    }
  }, []);

  function choose(code) {
    if (code === lang) return;
    setLanguageCookie(code);
    window.location.reload();
  }

  return (
    <div className="langbar notranslate" translate="no">
      <div className="wrap">
        <span className="langbar-label">
          <svg viewBox="0 0 24 24" aria-hidden width="16" height="16">
            <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M2.5 12h19M12 2.5c3 3.2 3 15.8 0 19M12 2.5c-3 3.2-3 15.8 0 19" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="hide-xs">Language</span>
        </span>
        <div className="langbar-options" role="group" aria-label="Choose language">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              className={lang === l.code ? 'on' : ''}
              aria-pressed={lang === l.code}
              onClick={() => choose(l.code)}
            >
              <span className="long">{l.label}</span>
              <span className="short">{l.short}</span>
            </button>
          ))}
        </div>
      </div>
      <div id="google_translate_element" hidden />
    </div>
  );
}
