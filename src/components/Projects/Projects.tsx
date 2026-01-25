import { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Projects.css';

import ctg from '../../assets/projects/ctg.png';
import education from '../../assets/projects/education.png';
import markovitz from '../../assets/projects/markovitz.png';
import swissTeam from '../../assets/projects/swiss-team.png';
import websiteIcon from '../../assets/projects/website-icon.avif';

type CategoryKey = 'university' | 'freelance' | 'research';

type ProjectItem = {
  id: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  iconSrc: string;
  href?: string;
  download?: boolean;
};

export default function Projects() {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<CategoryKey>('university');

  const projectsByCategory: Record<CategoryKey, ProjectItem[]> = useMemo(
    () => ({
      university: [
        {
          id: 'sport-analytics',
          titleKey: 'projects-items-sportAnalytics-title',
          descKey: 'projects-items-sportAnalytics-desc',
          tags: ['Data', 'Sports'],
          iconSrc: swissTeam,
          href: '/reports/sport_data_analytics_report.html'
        },
        {
          id: 'foetal-health',
          titleKey: 'projects-items-foetalHealth-title',
          descKey: 'projects-items-foetalHealth-desc',
          tags: ['ML', 'Healthcare'],
          iconSrc: ctg,
          href: '/reports/foetalhealthCTG.html'
        },
        {
          id: 'frontier-optim',
          titleKey: 'projects-items-frontier-title',
          descKey: 'projects-items-frontier-desc',
          tags: ['Finance', 'Optimization'],
          iconSrc: markovitz,
          href: '/reports/PorftolioAnalysis.html'
        }
      ],
      freelance: [
        // {
        //   id: 'mylumio',
        //   titleKey: 'projects-items-mylumio-title',
        //   descKey: 'projects-items-mylumio-desc',
        //   tags: ['Web', 'Product'],
        //   iconSrc: websiteIcon,
        //   href: 'https://mylumio.io/'
        // },
        {
          id: 'osteopata',
          titleKey: 'projects-items-osteopata-title',
          descKey: 'projects-items-osteopata-desc',
          tags: ['Website', 'Design'],
          iconSrc: websiteIcon,
          href: 'https://emanuele-fontana-osteopata.vercel.app/'
        }
      ],
      research: [
        {
          id: 'digital-ethics-framework',
          titleKey: 'projects-items-framework-title',
          descKey: 'projects-items-framework-desc',
          tags: ['Digital ethics', 'Public services'],
          iconSrc: education,
          href: 'https://ieeexplore.ieee.org/abstract/document/10702098'
        },
        {
          id: 'public-services-ethics',
          titleKey: 'projects-items-evaluation-title',
          descKey: 'projects-items-evaluation-desc',
          tags: ['Digital ethics', 'Evaluation'],
          iconSrc: education,
          href: 'https://proceedings.open.tudelft.nl/DGO2025/article/view/1033'
        }
      ]
    }),
    []
  );

  const filters = useMemo(
    () => [
      { key: 'university' as const, labelKey: 'projects-categories-university' },
      { key: 'freelance' as const, labelKey: 'projects-categories-freelance' },
      { key: 'research' as const, labelKey: 'projects-categories-research' }
    ],
    []
  );

  const activeProjects = projectsByCategory[activeKey];

  return (
    <section id="projects" className="projects-section">
      <Container>
        <Row className="mb-3">
          <Col>
            <h2 className="projects-title">{t('projects-title')}</h2>
            <p className="projects-subtitle">{t('projects-subtitle')}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="projects-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`btn btn-sm projects-filter-btn ${activeKey === f.key ? 'is-active' : ''}`}
                onClick={() => setActiveKey(f.key)}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </Col>
        </Row>

        <Row>
          <Col className="projects-cards">
            {activeProjects.map((p) => (
              <ProjectCardRow
                key={p.id}
                title={t(p.titleKey)}
                description={t(p.descKey)}
                tags={p.tags}
                iconSrc={p.iconSrc}
                href={p.href}
                download={p.download}
                openHint={t('projects-openInNewTab')}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function ProjectCardRow({
  title,
  description,
  tags,
  iconSrc,
  href,
  download,
  openHint
}: {
  title: string;
  description: string;
  tags: string[];
  iconSrc: string;
  href?: string;
  download?: boolean;
  openHint: string;
}) {
  const Body = (
    <div className="projects-cardRowInner">
      <img className="projects-icon" src={iconSrc} alt={title} width={80} height={80} />

      <div className="projects-cardContent">
        <div className="projects-cardHeader">
          <span className="projects-itemTitle">{title}</span>
          <div className="projects-tags">
            {tags.map((tag) => (
              <span className="projects-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="projects-desc">{description}</div>

        {href ? <div className="projects-linkHint">{openHint}</div> : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        className="projects-cardRow"
        href={href}
        target="_blank"
        rel="noreferrer"
        download={download ? '' : undefined}
      >
        {Body}
      </a>
    );
  }

  return <div className="projects-cardRow">{Body}</div>;
}
