import { useTranslation } from 'react-i18next';
import SkillsCarousel from '../SkillsCarousel/SkillsCarousel';
import ServiceCard, { type ServiceKey } from '../ServiceCard/ServiceCard';
import './Services.css';

export default function Services() {
  const { t } = useTranslation();

  const services: ServiceKey[] = ['consulting', 'dataAnalysis', 'digitalSolutions'];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="services-title mb-2">{t('services-title')}</h2>
        <p className="services-subtitle mb-4">{t('services-subtitle')}</p>
      </div>

      <div className="services-fullwidth">
        <div className="container">
          <SkillsCarousel />
        </div>
      </div>

      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 g-lg-4">
          {services.map((k) => (
            <ServiceCard key={k} serviceKey={k} />
          ))}
        </div>
      </div>
    </section>
  );
}
