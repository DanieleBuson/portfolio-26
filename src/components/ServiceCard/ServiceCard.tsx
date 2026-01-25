import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

export type ServiceKey = 'consulting' | 'dataAnalysis' | 'digitalSolutions';

type ServiceCardProps = {
  serviceKey: ServiceKey;
};

export default function ServiceCard({ serviceKey }: ServiceCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/booking');
  };

  const bullets = [1, 2, 3].map((n) => t(`services-card-${serviceKey}-bullet${n}`));

  return (
    <div className="col">
      <div className="service-card h-100">
        <div className="service-card-body">
          <div className="service-card-type">{t(`services-card-${serviceKey}-type`)}</div>
          <h3 className="service-card-title">{t(`services-card-${serviceKey}-title`)}</h3>
          <p className="service-card-desc">{t(`services-card-${serviceKey}-desc`)}</p>

          <ul className="service-card-list">
            {bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <a className="btn service-card-cta mt-auto" href="/booking" onClick={goToBooking}>
            {t('services-card-cta')}
          </a>
        </div>
      </div>
    </div>
  );
}
