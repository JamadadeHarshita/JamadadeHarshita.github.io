import React from 'react';
import '../assets/styles/Contact.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

function Contact() {
  return (
    <div id="contact">
      <div className="contact_wrapper">
        <span className="say-hi-pill">say hi 👋</span>
        <h1>Let's build something cool <span className="highlight">together</span></h1>
        <p>Got an interesting project, a question about RAG pipelines, or just want to talk NLP? My inbox (and DMs) are always open.</p>

        <div className="contact-buttons">
          <a href="https://www.linkedin.com/in/harshita-jamadade/" target="_blank" rel="noreferrer" className="contact-btn btn-linkedin">
            <LinkedInIcon fontSize="small" /> Message me on LinkedIn
          </a>
          <a href="mailto:harshitajamadade@gmail.com" className="contact-btn btn-email">
            <EmailIcon fontSize="small" /> Drop me an email
          </a>
          <a href="https://github.com/JamadadeHarshita" target="_blank" rel="noreferrer" className="contact-btn btn-github">
            <GitHubIcon fontSize="small" /> Check out my GitHub
          </a>
        </div>

        <p className="reply-probability">probability of a reply: <span>~0.95</span> 🤩</p>
      </div>
    </div>
  );
}

export default Contact;