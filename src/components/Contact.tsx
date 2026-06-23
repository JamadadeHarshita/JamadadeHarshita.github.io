import React from 'react';
import '../assets/styles/Contact.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useLang } from '../i18n/LangContext';

function Contact() {
  const { t } = useLang();
  return (
    <div id="contact">
      <div className="contact_wrapper">
        <span className="say-hi-pill">{t('contact_pill')}</span>
        <h1>{t('contact_heading')} <span className="highlight">{t('contact_heading_highlight')}</span></h1>
        <p>{t('contact_body')}</p>

        <div className="contact-buttons">
          <a href="https://www.linkedin.com/in/harshita-jamadade/" target="_blank" rel="noreferrer" className="contact-btn btn-linkedin">
            <LinkedInIcon fontSize="small" /> {t('contact_linkedin')}
          </a>
          <a href="mailto:harshitajamadade@gmail.com" className="contact-btn btn-email">
            <EmailIcon fontSize="small" /> {t('contact_email')}
          </a>
          <a href="https://github.com/JamadadeHarshita" target="_blank" rel="noreferrer" className="contact-btn btn-github">
            <GitHubIcon fontSize="small" /> {t('contact_github')}
          </a>
        </div>

        <p className="reply-probability">{t('contact_reply')} <span>~0.95</span> 🤩</p>
      </div>
    </div>
  );
}

export default Contact;