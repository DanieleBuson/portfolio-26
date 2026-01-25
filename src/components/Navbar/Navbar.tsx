import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logoDB from "../../assets/logo-db.png";
import logoCavallo from "../../assets/logo-cavallo.png";
import "./Navbar.css"

interface NavbarProps {
  onScrollTo: (section: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<'en' | 'it'>('en');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light' | null) || 'light';
    const savedLang = (localStorage.getItem('lang') as 'en' | 'it') || 'en';

    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme);
    setTheme(savedTheme);

    i18n.changeLanguage(savedLang);
    setLang(savedLang);
  }, [i18n]);

  const toggleTheme = () => {
    const newTheme: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeLang = (newLang: 'en' | 'it') => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-custom">
      <div className="container">
        <a className="navbar-brand logo-coin-container" href="/" onClick={handleLogoClick}>
          <span className="logo-coin" aria-hidden="true">
            <img src={logoDB} alt="" className="logo-face logo-front" />
            <img src={logoCavallo} alt="" className="logo-face logo-back" />
          </span>
          <span className="brand-text ms-2">{t('navbar-siteName')}</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#home" onClick={(e) => { e.preventDefault(); onScrollTo('home'); }}>{t('navbar-home')}</a></li>
            <li className="nav-item"><a className="nav-link" href="#services" onClick={(e) => { e.preventDefault(); onScrollTo('services'); }}>{t('navbar-services')}</a></li>
            <li className="nav-item"><a className="nav-link" href="#projects" onClick={(e) => { e.preventDefault(); onScrollTo('projects'); }}>{t('navbar-projects')}</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacts" onClick={(e) => { e.preventDefault(); onScrollTo('contacts'); }}>{t('navbar-contacts')}</a></li>
          </ul>

          <ul className="navbar-nav py-2 py-lg-0">
            <li className="nav-item dropdown  me-2 mb-2 mb-lg-0">
              <select
                className="form-select form-select-sm lang-select"
                value={lang}
                onChange={(e) => changeLang(e.target.value as 'en' | 'it')}
              >
                <option value="en">{t('navbar-en')}</option>
                <option value="it">{t('navbar-it')}</option>
              </select>
            </li>
            <li className="nav-item  me-2 mb-2 mb-lg-0">
              <button className="btn btn-sm theme-toggle" onClick={toggleTheme} title="Toggle theme">
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zM16 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 16 8zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707L12.95 2.343a.5.5 0 0 1 .707 0zM4.464 11.536a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.464a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278z"/>
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
