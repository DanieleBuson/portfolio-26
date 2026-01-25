import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Contacts.css';
import emailSvg from '../../assets/email.svg';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const API_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export default function Contacts() {
  const { t } = useTranslation();

  const [form, setForm] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []); // clear timeout on unmount [web:284]

  const scheduleClearBanner = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setSubmitState('idle');
      setErrorMsg('');
    }, 4500);
  };

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSubmitState('idle');
      setErrorMsg('');
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!API_ENDPOINT) {
      setSubmitState('error');
      setErrorMsg('Missing VITE_CONTACT_ENDPOINT');
      scheduleClearBanner();
      return;
    }

    try {
      setSubmitState('submitting');
      setErrorMsg('');

      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      // Read body safely (your Lambda returns JSON)
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // fetch() does not throw on HTTP errors, so we must check res.ok [web:283]
        const msg = data?.error || data?.message || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      setSubmitState('success');
      setForm(initialState);
      scheduleClearBanner();
    } catch (err) {
      setSubmitState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      scheduleClearBanner();
    }
  };

  return (
    <section id="contacts" className="contacts-section">
      <Container>
        <Row className="mb-3">
          <Col>
            <h2 className="contacts-title">{t('contacts-title')}</h2>
            <p className="contacts-subtitle">{t('contacts-subtitle')}</p>
          </Col>
        </Row>

        <Row className="g-4 align-items-stretch">
          <Col xs={12} lg={5}>
            <div className="contacts-visualCard">
              <img className="contacts-visualImg" src={emailSvg} alt={t('contacts-illustrationAlt')} />

              <div className="contacts-visualText">
                <div className="contacts-visualTitle">{t('contacts-visualTitle')}</div>
                <div className="contacts-visualDesc">{t('contacts-visualDesc')}</div>
              </div>
            </div>
          </Col>

          <Col xs={12} lg={7}>
            <form className="contacts-card" onSubmit={onSubmit}>
              {/* Success / Error banners using Bootstrap alerts [web:278] */}
              {submitState === 'success' ? (
                <div className="alert alert-success contacts-alert" role="status">
                  {t('contacts-form-sent')}
                </div>
              ) : null}

              {submitState === 'error' ? (
                <div className="alert alert-danger contacts-alert" role="alert">
                  {t('contacts-form-error')} {errorMsg ? `(${errorMsg})` : null}
                </div>
              ) : null}

              <div className="contacts-grid">
                <div className="contacts-field">
                  <label className="contacts-label" htmlFor="contact-name">
                    {t('contacts-form-name')}
                  </label>
                  <input
                    id="contact-name"
                    className="contacts-input"
                    value={form.name}
                    onChange={onChange('name')}
                    autoComplete="name"
                    placeholder={t('contacts-form-namePlaceholder')}
                    required
                    disabled={submitState === 'submitting'}
                  />
                </div>

                <div className="contacts-field">
                  <label className="contacts-label" htmlFor="contact-email">
                    {t('contacts-form-email')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="contacts-input"
                    value={form.email}
                    onChange={onChange('email')}
                    autoComplete="email"
                    placeholder={t('contacts-form-emailPlaceholder')}
                    required
                    disabled={submitState === 'submitting'}
                  />
                </div>

                <div className="contacts-field contacts-fieldFull">
                  <label className="contacts-label" htmlFor="contact-subject">
                    {t('contacts-form-subject')}
                  </label>
                  <input
                    id="contact-subject"
                    className="contacts-input"
                    value={form.subject}
                    onChange={onChange('subject')}
                    placeholder={t('contacts-form-subjectPlaceholder')}
                    disabled={submitState === 'submitting'}
                  />
                </div>

                <div className="contacts-field contacts-fieldFull">
                  <label className="contacts-label" htmlFor="contact-message">
                    {t('contacts-form-message')}
                  </label>
                  <textarea
                    id="contact-message"
                    className="contacts-textarea"
                    value={form.message}
                    onChange={onChange('message')}
                    rows={6}
                    placeholder={t('contacts-form-messagePlaceholder')}
                    required
                    disabled={submitState === 'submitting'}
                  />
                </div>
              </div>

              <div className="contacts-actions">
                <button
                  type="submit"
                  className="btn contacts-submit"
                  disabled={submitState === 'submitting'}
                >
                  {submitState === 'submitting' ? t('contacts-form-sending') : t('contacts-form-submit')}
                </button>
              </div>

              <div className="contacts-privacy">{t('contacts-form-privacy')}</div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
