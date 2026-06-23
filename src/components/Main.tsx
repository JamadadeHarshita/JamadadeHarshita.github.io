import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import harshiImg from '../assets/images/harshi.jpg';
import { useLang } from '../i18n/LangContext';

function Main() {
  const { t } = useLang();
  return (
    <div className="container">
      <div className="about-section">
        <div className="entity-chips">
          <span className="entity-chip chip-1">RAG</span>
          <span className="entity-chip chip-2">Topic Modelling</span>
          <span className="entity-chip chip-3">Hybrid Retrieval</span>
          <span className="entity-chip chip-4">Embeddings</span>
          <span className="entity-chip chip-5">LLM Fine-tuning</span>
          <span className="entity-chip chip-6">NER</span>
        </div>
        <div className="image-wrapper">
          <img src={harshiImg} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/JamadadeHarshita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/harshita-jamadade/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Harshita Jamadade</h1>
          <p>{t('hero_title')}</p>
          <p className="hero-bio">{t('hero_bio')}</p>
          <div className="mobile_social_icons">
            <a href="https://github.com/JamadadeHarshita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/harshita-jamadade/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;