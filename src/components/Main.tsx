import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {
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
          <img src="https://res.cloudinary.com/dblusbnss/image/upload/f_auto,q_auto/DSC_7163_g1mlkx" alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/JamadadeHarshita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/harshita-jamadade/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Harshita Jamadade</h1>
          <p>AI/NLP Engineer</p>
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