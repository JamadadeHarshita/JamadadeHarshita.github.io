import React from "react";
import Chip from '@mui/material/Chip';
import '../assets/styles/Achievements.scss';
import { useLang } from '../i18n/LangContext';

import tableauImg from '../assets/images/tableau.jpg';
import pathlyImg from '../assets/images/pathly.jpg';
import lithuaniaImg from '../assets/images/lithuania.jpg';

interface AchievementMeta {
  image: string | null;
  badge: string;
  badgeColor: string;
  titleKey: 'ach0_title' | 'ach1_title' | 'ach2_title' | 'ach3_title';
  subtitleKey: 'ach0_subtitle' | 'ach1_subtitle' | 'ach2_subtitle' | 'ach3_subtitle';
  date: string;
  descKey: 'ach0_desc' | 'ach1_desc' | 'ach2_desc' | 'ach3_desc';
  tags: string[];
  link: string | null;
  linkLabel: string | null;
}

const achievementsMeta: AchievementMeta[] = [
  { image: tableauImg,  badge: "Winner",     badgeColor: "#5000ca", titleKey: 'ach0_title', subtitleKey: 'ach0_subtitle', date: "February 2025", descKey: 'ach0_desc', tags: ["Tableau", "Data Viz", "Storytelling"],           link: "http://bit.ly/4bTkjZs",                           linkLabel: "View Dashboard" },
  { image: pathlyImg,   badge: "Runners-up", badgeColor: "#e91e63", titleKey: 'ach1_title', subtitleKey: 'ach1_subtitle', date: "April 2025",    descKey: 'ach1_desc', tags: ["GPT-4", "RAG", "FAISS", "Flask", "MongoDB"],    link: "https://github.com/bhanuprasanna2001/debug-thugs", linkLabel: "View on GitHub" },
  { image: lithuaniaImg,badge: "Winners",    badgeColor: "#5000ca", titleKey: 'ach2_title', subtitleKey: 'ach2_subtitle', date: "May 2025",      descKey: 'ach2_desc', tags: ["AI Ethics", "Copyright", "Creative Industries"], link: null,                                               linkLabel: null },
  { image: null,        badge: "Blog",       badgeColor: "#2196f3", titleKey: 'ach3_title', subtitleKey: 'ach3_subtitle', date: "Ongoing",       descKey: 'ach3_desc', tags: ["ML", "NLP", "LLMs", "Technical Writing"],        link: "https://hashnode.com/@jamadadeharshi",             linkLabel: "Read Blog" },
];

function Achievements() {
  const { t } = useLang();

  return (
    <div className="container" id="achievements">
      <div className="achievements-container">
        <h1>{t('achievements_heading')}</h1>
        <div className="achievements-grid">
          {achievementsMeta.map((item: AchievementMeta, index: number) => (
            <div className="achievement-card" key={index}>
              {item.image !== null && (
                <div className="achievement-image">
                  <img src={item.image} alt={t(item.titleKey)} />
                </div>
              )}
              <div className="achievement-content">
                <div className="achievement-header">
                  <span
                    className="achievement-badge"
                    style={{
                      background: item.badgeColor + "18",
                      color: item.badgeColor,
                      border: "1px solid " + item.badgeColor + "40",
                    }}
                  >
                    {item.badge}
                  </span>
                  <span className="achievement-date">{item.date}</span>
                </div>
                <h3>{t(item.titleKey)}</h3>
                <h4>{t(item.subtitleKey)}</h4>
                <p>{t(item.descKey)}</p>
                <div className="achievement-tags">
                  {item.tags.map((tag: string, i: number) => (
                    <Chip key={i} label={tag} className="chip" size="small" />
                  ))}
                </div>
                {item.link && item.linkLabel && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="achievement-link" style={{ borderColor: item.badgeColor, color: item.badgeColor }}>
                    {item.linkLabel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;