import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './BookingCall.css';
import PageTitle from '../../components/PageTitle/PageTitle';

const CALENDLY_EVENT_URL = import.meta.env.VITE_CALENDLY_EVENT_URL as string | undefined;

function buildCalendlyUrl(base: string) {
  const url = new URL(base);

  url.searchParams.set('hide_event_type_details', '1');
  url.searchParams.set('primary_color', 'caa23a');
  url.searchParams.set('text_color', '141414');
  url.searchParams.set('background_color', 'ffffff');
  url.searchParams.set('utm_source', 'portfolio');
  url.searchParams.set('utm_medium', 'booking_page');

  return url.toString();
}

export default function BookingCall() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const calendlyUrl = CALENDLY_EVENT_URL ? buildCalendlyUrl(CALENDLY_EVENT_URL) : '';

  const goBack = () => navigate(-1);   // back in history [web:397]
  const goHome = () => navigate('/');  // always go to main page

  return (
    <section className="bookingCall">
      <PageTitle title="Book a call | Daniele Buson" />
      <Container>
        <div className="bookingCall-topBar">
          <div className="bookingCall-head">
            <h1 className="bookingCall-title">{t('booking-title')}</h1>
            <p className="bookingCall-subtitle">{t('booking-subtitle')}</p>
          </div>

          <div className="bookingCall-actions">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={goBack}>
              {t('booking-back')}
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={goHome}>
              {t('booking-home')}
            </button>
          </div>
        </div>

        {!CALENDLY_EVENT_URL ? (
          <div className="bookingCall-error">
            {t('booking-missingUrl')}
            <div className="bookingCall-hint">
              {t('booking-missingUrlHint')} <code>VITE_CALENDLY_EVENT_URL</code>
            </div>
          </div>
        ) : (
          <div className="bookingCall-embedCard">
            <iframe className="bookingCall-iframe" src={calendlyUrl} title={t('booking-iframeTitle')} />
          </div>
        )}
      </Container>
    </section>
  );
}
