import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SkillsCarousel.css';
import angular from "../../assets/skills/angular.png";
import aws from "../../assets/skills/aws.png";
import azure from "../../assets/skills/azure.png";
import django from "../../assets/skills/django.png";
import flask from "../../assets/skills/flask.png";
import googleCloud from "../../assets/skills/google-cloud.png";
import java from "../../assets/skills/java.png";
import javascript from "../../assets/skills/javascript.png";
import mariadb from "../../assets/skills/mariadb.png";
import mistral from "../../assets/skills/mistral.png";
import mongodb from "../../assets/skills/mongodb.png";
import mysql from "../../assets/skills/mysql.png";
import openai from "../../assets/skills/openai.png";
import postgresql from "../../assets/skills/postgresql.png";
import python from "../../assets/skills/python.png";
import r from "../../assets/skills/r.png";
import react from "../../assets/skills/react.png";
import shiny from "../../assets/skills/shiny.png";
import snowflake from "../../assets/skills/snowflake.png";
import sqlite from "../../assets/skills/sqlite.png";
import typescript from "../../assets/skills/typescript.png";
import vercel from "../../assets/skills/vercel.png";

type SkillCategory = 'all' | 'database' | 'frameworks' | 'languages' | 'cloud' | 'AI api';

type SkillCard = {
  id: string;
  imgSrc: string;
  altKey: string;
  categories: SkillCategory[];
};

export default function SkillsCarousel() {
  const { t } = useTranslation();
  const [active, setActive] = useState<SkillCategory>('all');
  const trackRef = useRef<HTMLDivElement | null>(null);

  const cards: SkillCard[] = [
    // DATABASE
    { id: 'postgresql', imgSrc: postgresql, altKey: 'services-skill-postgresql', categories: ['database'] },
    { id: 'mysql', imgSrc: mysql, altKey: 'services-skill-mysql', categories: ['database'] },
    { id: 'mariadb', imgSrc: mariadb, altKey: 'services-skill-mariadb', categories: ['database'] },
    { id: 'sqlite', imgSrc: sqlite, altKey: 'services-skill-sqlite', categories: ['database'] },
    { id: 'mongodb', imgSrc: mongodb, altKey: 'services-skill-mongodb', categories: ['database'] },
    { id: 'snowflake', imgSrc: snowflake, altKey: 'services-skill-snowflake', categories: ['database'] },

    // FRAMEWORKS
    { id: 'react', imgSrc: react, altKey: 'services-skill-react', categories: ['frameworks'] },
    { id: 'angular', imgSrc: angular, altKey: 'services-skill-angular', categories: ['frameworks'] },
    { id: 'django', imgSrc: django, altKey: 'services-skill-django', categories: ['frameworks'] },
    { id: 'flask', imgSrc: flask, altKey: 'services-skill-flask', categories: ['frameworks'] },
    { id: 'shiny', imgSrc: shiny, altKey: 'services-skill-shiny', categories: ['frameworks'] },

    // LANGUAGES
    { id: 'python', imgSrc: python, altKey: 'services-skill-python', categories: ['languages'] },
    { id: 'typescript', imgSrc: typescript, altKey: 'services-skill-typescript', categories: ['languages'] },
    { id: 'javascript', imgSrc: javascript, altKey: 'services-skill-javascript', categories: ['languages'] },
    { id: 'java', imgSrc: java, altKey: 'services-skill-java', categories: ['languages'] },
    { id: 'r', imgSrc: r, altKey: 'services-skill-r', categories: ['languages'] },

    // CLOUD
    { id: 'aws', imgSrc: aws, altKey: 'services-skill-aws', categories: ['cloud'] },
    { id: 'azure', imgSrc: azure, altKey: 'services-skill-azure', categories: ['cloud'] },
    { id: 'googleCloud', imgSrc: googleCloud, altKey: 'services-skill-googleCloud', categories: ['cloud'] },
    { id: 'vercel', imgSrc: vercel, altKey: 'services-skill-vercel', categories: ['cloud'] },

    // AI API
    { id: 'openai', imgSrc: openai, altKey: 'services-skill-openai', categories: ['AI api'] },
    { id: 'mistral', imgSrc: mistral, altKey: 'services-skill-mistral', categories: ['AI api'] }
  ];

  const filtered = useMemo(() => {
    if (active === 'all') return cards;
    return cards.filter(c => c.categories.includes(active));
  }, [active]);

  const scrollByCards = (direction: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.skills-card');
    const step = (card?.offsetWidth ?? 120) + 12; 
    el.scrollBy({ left: direction === 'next' ? step * 3 : -step * 3, behavior: 'smooth' });
  };

  const filters: { key: SkillCategory; labelKey: string }[] = [
    { key: 'all', labelKey: 'services-filter-all' },
    { key: 'database', labelKey: 'services-filter-database' },
    { key: 'frameworks', labelKey: 'services-filter-frameworks' },
    { key: 'languages', labelKey: 'services-filter-languages' },
    { key: 'cloud', labelKey: 'services-filter-cloud' },
    { key: 'AI api', labelKey: 'services-filter-aiApi' }
  ];

  return (
    <div className="skills-carousel">
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <div className="d-flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              type="button"
              className={`btn btn-sm skills-filter-btn ${active === f.key ? 'is-active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm skills-nav-btn" onClick={() => scrollByCards('prev')}>
            {t('services-carousel-prev')}
          </button>
          <button type="button" className="btn btn-sm skills-nav-btn" onClick={() => scrollByCards('next')}>
            {t('services-carousel-next')}
          </button>
        </div>
      </div>

      <div ref={trackRef} className="skills-track" aria-label={t('services-carousel-aria')}>
        {filtered.map(card => (
          <div key={card.id} className="skills-card" title={t(card.altKey)}>
            <img className="skills-card-img" src={card.imgSrc} alt={t(card.altKey)} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
