import React from "react";
import Chip from '@mui/material/Chip';
import '../assets/styles/Achievements.scss';

import tableauImg from '../assets/images/tableau.jpg';
import pathlyImg from '../assets/images/pathly.jpg';
import lithuaniaImg from '../assets/images/lithuania.jpg';

interface Achievement {
  image: string | null;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tags: string[];
  link: string | null;
  linkLabel: string | null;
}

const achievements: Achievement[] = [
  {
    image: tableauImg,
    badge: "Winner",
    badgeColor: "#5000ca",
    title: "IronViz Challenge",
    subtitle: "Best Data Storytelling",
    date: "February 2025",
    description: "Ranked #1 for data storytelling at the college IronViz Challenge. Built an interactive Tableau dashboard analysing IMDb ratings across TV revivals.",
    tags: ["Tableau", "Data Viz", "Storytelling"],
    link: "http://bit.ly/4bTkjZs",
    linkLabel: "View Dashboard",
  },
  {
    image: pathlyImg,
    badge: "Runners-up",
    badgeColor: "#e91e63",
    title: "Q-Hack: Pathly",
    subtitle: "Le Wagon Challenge",
    date: "April 2025",
    description: "Built Pathly at Q-Hack Summit, an AI-powered learning assistant that converts 50 days of skill reflections into personalised course recommendations using GPT-4 and RAG/FAISS.",
    tags: ["GPT-4", "RAG", "FAISS", "Flask", "MongoDB"],
    link: "https://github.com/bhanuprasanna2001/debug-thugs",
    linkLabel: "View on GitHub",
  },
  {
    image: lithuaniaImg,
    badge: "Winners",
    badgeColor: "#5000ca",
    title: "Blended Intensive Programme",
    subtitle: "Vilniaus Kolegija, Lithuania",
    date: "May 2025",
    description: "Represented SRH Heidelberg at an international BIP. Won the AI & Copyright in the Creative Industries challenge by ArtTech Agency Lithuania.",
    tags: ["AI Ethics", "Copyright", "Creative Industries"],
    link: null,
    linkLabel: null,
  },
  {
    image: null,
    badge: "Blog",
    badgeColor: "#2196f3",
    title: "Technical Blogging",
    subtitle: "HashNode",
    date: "Ongoing",
    description: "Publishing ML and NLP educational content on HashNode, covering LLMs, embeddings, retrieval systems, and applied AI engineering.",
    tags: ["ML", "NLP", "LLMs", "Technical Writing"],
    link: "https://hashnode.com/@jamadadeharshi",
    linkLabel: "Read Blog",
  },
];

function renderLink(item: Achievement) {
  if (item.link === null || item.linkLabel === null) {
    return null;
  }
  return React.createElement(
    'a',
    {
      href: item.link,
      target: '_blank',
      rel: 'noreferrer',
      className: 'achievement-link',
      style: { borderColor: item.badgeColor, color: item.badgeColor },
    },
    item.linkLabel
  );
}

function Achievements() {
  return (
    <div className="container" id="achievements">
      <div className="achievements-container">
        <h1>Achievements.</h1>
        <div className="achievements-grid">
          {achievements.map((item: Achievement, index: number) => (
            <div className="achievement-card" key={index}>
              {item.image !== null && (
                <div className="achievement-image">
                  <img src={item.image} alt={item.title} />
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
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.description}</p>
                <div className="achievement-tags">
                  {item.tags.map((tag: string, i: number) => (
                    <Chip key={i} label={tag} className="chip" size="small" />
                  ))}
                </div>
                {renderLink(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;