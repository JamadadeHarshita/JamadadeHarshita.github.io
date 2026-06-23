import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/JamadadeHarshita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/harshita-jamadade/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
      </div>
      <div className="footer-note">
        <p>liked the site & the bot? <a href="mailto:harshitajamadade@gmail.com">say hello</a></p>
        <p className="footer-made">made with iced americanos &amp; <a href="https://open.spotify.com/playlist/5OECX575kqRFm00pX5HLlg?si=83a0dcedd4b842f7" target="_blank" rel="noreferrer">this playlist</a> ☕</p>
      </div>
    </footer>
  );
}

export default Footer;