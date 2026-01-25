import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  const phoneITDisplay = '+39 3342152571';
  const phoneCHDisplay = '+41 762397883';
  const email = 'busond5@gmail.com';

  const whatsappLink = 'https://wa.me/41762397883';

  const linkedinLink = 'https://www.linkedin.com/in/daniele-buson-325471168/';

  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <div className="siteFooter-title">Daniele Buson</div>
            <p className="siteFooter-text">{t('footer-aboutLine1')}</p>
            <p className="siteFooter-text">{t('footer-aboutLine2')}</p>
          </Col>

          {/* 2) Contacts */}
          <Col xs={12} md={4}>
            <div className="siteFooter-heading">{t('footer-contactsTitle')}</div>

            <a className="siteFooter-link" href={`tel:${phoneITDisplay.replace(/\s/g, '')}`}>
              {t('footer-phoneIt')}: {phoneITDisplay}
            </a>
            <a className="siteFooter-link" href={`tel:${phoneCHDisplay.replace(/\s/g, '')}`}>
              {t('footer-phoneCh')}: {phoneCHDisplay}
            </a>
            <a className="siteFooter-link" href={`mailto:${email}`}>
              {email}
            </a>
          </Col>

          {/* 3) Social */}
          <Col xs={12} md={4}>
            <div className="siteFooter-heading">{t('footer-socialTitle')}</div>

            <div className="siteFooter-socialRow">
              <a
                className="siteFooter-iconBtn"
                href={linkedinLink}
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer-linkedin')}
                title={t('footer-linkedin')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>

                <span className="siteFooter-iconLabel">{t('footer-linkedin')}</span>
              </a>

              <a
                className="siteFooter-iconBtn"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer-whatsapp')}
                title={t('footer-whatsapp')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  {/* Bootstrap Icons: whatsapp [web:352] */}
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.201-1.102a7.9 7.9 0 0 0 3.79.965h.003c4.368 0 7.927-3.558 7.93-7.93a7.898 7.898 0 0 0-2.323-5.607zm-5.607 12.184h-.002a6.57 6.57 0 0 1-3.349-.914l-.24-.144-2.49.654.664-2.432-.156-.251a6.56 6.56 0 0 1-1.007-3.495c.003-3.626 2.957-6.58 6.586-6.58a6.533 6.533 0 0 1 4.657 1.93 6.58 6.58 0 0 1 1.93 4.659c-.003 3.626-2.957 6.58-6.593 6.58zm3.61-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.776-.114.133-.232.148-.43.05-.197-.099-.835-.308-1.59-.985-.586-.522-.982-1.17-1.096-1.367-.114-.197-.012-.303.087-.402.089-.088.197-.232.296-.346.099-.114.133-.197.197-.33.065-.133.033-.248-.016-.346-.05-.099-.445-1.076-.61-1.47-.16-.385-.323-.332-.445-.338l-.38-.007a.73.73 0 0 0-.529.248c-.182.197-.693.677-.693 1.65 0 .973.709 1.913.808 2.045.099.133 1.394 2.129 3.377 2.988.472.204.84.326 1.129.418.474.15.904.129 1.246.08.38-.057 1.17-.48 1.335-.943.165-.463.165-.86.114-.943-.05-.084-.182-.133-.38-.232z" />
                </svg>

                <span className="siteFooter-iconLabel">{t('footer-whatsapp')}</span>
              </a>
            </div>

            <div className="siteFooter-note">{t('footer-whatsappNote')}</div>
          </Col>
        </Row>

        <div className="siteFooter-bottom">
          <span className="siteFooter-copy">© {year} Daniele Buson</span>
        </div>
      </Container>
    </footer>
  );
}
