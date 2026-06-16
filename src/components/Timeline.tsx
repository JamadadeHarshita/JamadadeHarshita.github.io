import React, { useRef, useEffect, useState } from "react";
import '../assets/styles/Timeline.scss';

import mahleLogo from '../assets/images/mahle.png';
import dlrLogo from '../assets/images/dlr.jpg';
import fernLogo from '../assets/images/fernuni.jpg';
import kleLogo from '../assets/images/kle.png';
import srhLogo from '../assets/images/srh.png';

const timelineData = [
  {
    date: "Sep 2025 – Feb 2026",
    title: "AI Engineer Intern",
    org: "MAHLE, Stuttgart",
    detail: "Hybrid Search, Vector Search, Elasticsearch, DeepEval, Docker",
    logo: mahleLogo,
    type: "work",
  },
  {
    date: "Jun – Sep 2025",
    title: "AI/NLP Research Intern",
    org: "DLR, Jena",
    detail: "RAG Pipeline, BERTopic, FASTopic, OpenSearch, LLM Labelling",
    logo: dlrLogo,
    type: "work",
  },
  {
    date: "Nov 2024 – Mar 2025",
    title: "NLP Research Collaborator",
    org: "FernUniversität Hagen",
    detail: "LLM Benchmarking, Metadata Extraction, TF-IDF Chunking",
    logo: fernLogo,
    type: "work",
  },
  {
    date: "Apr 2024 – Apr 2026",
    title: "M.Sc. Applied Data Science",
    org: "SRH Hochschule, Heidelberg",
    detail: "GPA 1.9 · Thesis: Fine-Grained Emotion Detection",
    logo: srhLogo,
    type: "education",
  },
  {
    date: "Aug – Sep 2022",
    title: "Data Science Intern",
    org: "Varcons Technology, India",
    detail: "Sentiment Analysis, NLP, Naive Bayes, Random Forest",
    logo: null,
    type: "work",
  },
  {
    date: "2019 – 2023",
    title: "B.E. Computer Science",
    org: "KLE College, India",
    detail: "GPA 8.02/10",
    logo: kleLogo,
    type: "education",
  },
];

function TimelineItem({ item, index, visible }: { item: any, index: number, visible: boolean }) {
  const isAbove = index % 2 === 0;
  const isWork = item.type === "work";

  const card = (
    <div className="timeline-card">
      {item.logo
        ? <img src={item.logo} alt={item.org} className="card-logo" />
        : <div className="card-logo-placeholder">💼</div>
      }
      <div className="card-date">{item.date}</div>
      <div className="card-title">{item.title}</div>
      <div className="card-org">{item.org}</div>
      <div className="card-detail">{item.detail}</div>
    </div>
  );

  return (
    <div className={`timeline-item ${visible ? 'visible' : ''}`}>
      <div className="card-top">
        {isAbove ? card : <div className="card-spacer" />}
      </div>
      <div className="connector" />
      <div className={`timeline-dot ${isWork ? 'dot-work' : 'dot-edu'}`} />
      <div className="connector" />
      <div className="card-bottom">
        {!isAbove ? card : <div className="card-spacer" />}
      </div>
    </div>
  );
}

function Timeline() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(timelineData.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History.</h1>
        <div className="horizontal-timeline">
          <div className="timeline-line" />
          {timelineData.map((item, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              style={{ flex: 1 }}
            >
              <TimelineItem item={item} index={i} visible={visibleItems[i]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;