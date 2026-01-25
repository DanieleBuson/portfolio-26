import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import me from "../../assets/me.png";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToContacts = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/booking');
  };

  return (
    <section id="home" className="home-section">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <p className="home-kicker mb-2">{t('home-kicker')}</p>
            <h1 className="home-title mb-3">{t('home-title')}</h1>

            <p className="home-description mb-3">{t('home-description')}</p>

            <div className="home-cta d-flex flex-column flex-sm-row gap-2">
              <a href="#contacts" className="btn home-btn-primary" onClick={scrollToContacts}>
                {t('home-ctaContact')}
              </a>
              <a href="/booking" className="btn home-btn-secondary" onClick={goToBooking}>
                {t('home-ctaSecondary')}
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="home-photo-wrap ms-lg-auto">
              <img
                src={me}
                alt={t('home-photoAlt')}
                className="home-photo img-fluid"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
