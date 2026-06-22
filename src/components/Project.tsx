import React, { useState, useEffect, useRef } from "react";
import '../assets/styles/Project.scss';

import mahleImg from '../assets/images/mahle-project.jpg';
import dlrImg from '../assets/images/dlr-project.jpeg';
import metadataArch from '../assets/images/metadata-arch.png';
import youtubeArch from '../assets/images/youtube-arch.png';
import youtubeSidemen from '../assets/images/youtube-sidemen.png';
import deepemotionArch from '../assets/images/deepemotion-arch.png';
import spotifyDag from '../assets/images/spotify-dag.jpg';
import cricketEr from '../assets/images/cricket-er.png';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  github: string | null;
  isCompany: boolean;
}

const projects: Project[] = [
  {
    title: "TechPro AI Search Enhancement, MAHLE",
    description: "MAHLE's internal parts search was keyword-only and couldn't understand what engineers actually meant. I rebuilt it with hybrid AI search combining semantic and keyword matching, lifting relevance scores from 60% to 75% across 4,000 test cases.",
    tags: ["NLP", "Search", "LLM", "Vector Search"],
    image: mahleImg,
    github: null,
    isCompany: true,
  },
  {
    title: "Automated Test Case Generation, MAHLE",
    description: "Testing an AI search system needs realistic queries, not ones written by engineers who already know the answer. I built a pipeline that generated ~4,000 workshop-style search queries using vehicle metadata and real user personas, then wired in an LLM-as-judge to score quality automatically.",
    tags: ["LLM", "Evaluation", "Docker", "Pipeline"],
    image: mahleImg,
    github: null,
    isCompany: true,
  },
  {
    title: "OpenSearch RAG Pipeline, DLR",
    description: "DLR had 70,000 crawled web pages with no labels and no structure. I built a pipeline that discovered topics automatically, benchmarked 7 different methods, and used an LLM to clean up the final categories, turning raw crawl data into a searchable, classified corpus.",
    tags: ["RAG", "NLP", "Research"],
    image: dlrImg,
    github: null,
    isCompany: true,
  },
  {
    title: "DeepEmotion Lab",
    description: "Most emotion models collapse everything into 6 categories, which misses the nuance that matters in real text. I built a dual-stream model combining two RoBERTa variants to detect 28 emotion categories, achieving Macro F1 of 0.5407, outperforming standard baselines. Under review at IET Software.",
    tags: ["NLP", "Research", "ML"],
    image: deepemotionArch,
    github: "https://github.com/JamadadeHarshita/DeepEmotion-Lab",
    isCompany: false,
  },
  {
    title: "Metadata Extraction, LLM Approach",
    description: "German biographical transcripts had 136 fields of metadata buried in unstructured text. Extracting them by hand wasn't feasible. I built an LLM pipeline using TF-IDF cosine chunking to feed context cleanly, hitting 95.83% field-level accuracy with LLaMA 3.3 70B.",
    tags: ["NLP", "LLM", "Research"],
    image: metadataArch,
    github: "https://github.com/JamadadeHarshita/Metadata-Extraction-LLM-Approach-CaseStudy",
    isCompany: false,
  },
  {
    title: "Cross-Platform Music Trend Analytics",
    description: "Figuring out which artists are rising is hard when their data lives on Spotify, Deezer, and YouTube separately. I built a weekly Airflow pipeline that pulls from all three, unifies them under a common artist ID in BigQuery using dbt models, and surfaces genre trends on a Tableau dashboard.",
    tags: ["Data Engineering", "Cloud", "GCP"],
    image: spotifyDag,
    github: null,
    isCompany: false,
  },
  {
    title: "YouTube GCP Data Pipeline",
    description: "A Sidemen content manager needed one place to see how all 7 channels were performing: views, likes, comments, trends. I built a GCP pipeline that fetches data automatically, handles API rate limits with batching, processes it through Apache Beam into BigQuery, and surfaces insights in a Tableau dashboard.",
    tags: ["Data Engineering", "GCP", "Cloud"],
    image: youtubeArch,
    github: "https://github.com/JamadadeHarshita/YouTubeDataPipeline",
    isCompany: false,
  },
  {
    title: "The HushHush Recruiter",
    description: "Screening 9,000+ developer profiles by hand was the bottleneck for a hiring team. I built a platform that ranks candidates automatically using K-Means clustering and PCA, cutting manual HR effort by 90%.",
    tags: ["ML", "Flask", "Automation"],
    image: null,
    github: "https://github.com/JamadadeHarshita/TheHushHushRecruiter",
    isCompany: false,
  },
  {
    title: "Cricket Database, Distributed Data Engineering",
    description: "Cricket stats are scattered across dozens of sites with no way to query them together. Our team built a distributed system from scratch: a 4-node Hadoop cluster connected across student laptops via Tailscale VPN, a Python scraper pulling 1,000+ records from 3 websites, a 7-table relational database, and 7 business queries. We stress-tested it by killing a node mid-read to verify HDFS redundancy held.",
    tags: ["Data Engineering", "Hadoop", "SQL", "Python"],
    image: cricketEr,
    github: null,
    isCompany: false,
  },
  {
    title: "Lecture Summarization NLP",
    description: "Long lecture recordings are hard to review. There's no fast way to find what was covered or when. I built a modular pipeline that transcribes audio with Whisper, segments it into topics using Louvain clustering, labels each segment with KeyBERT, and writes teaching-style summaries with Zephyr-7B.",
    tags: ["NLP", "Audio", "LLM"],
    image: null,
    github: "https://github.com/JamadadeHarshita/NlpSpeechToText",
    isCompany: false,
  },
];

const allTags = ["All", "NLP", "LLM", "RAG", "ML", "Data Engineering", "Cloud", "Research"];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`project-row${visible ? ' row-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <span className="project-row-number">{String(index + 1).padStart(2, '0')}</span>

      {project.image ? (
        <div className="project-row-image">
          <img src={project.image} alt={project.title} />
        </div>
      ) : (
        <div className="project-row-placeholder">
          <span>{project.title.charAt(0)}</span>
        </div>
      )}

      <div className="project-row-content">
        <div className="project-row-top">
          <div className="project-row-meta">
            {project.isCompany && <span className="company-badge">Company Project</span>}
          </div>
          <h2 className="project-row-title">{project.title}</h2>
          <p className="project-row-desc">{project.description}</p>
        </div>
        <div className="project-row-bottom">
          <div className="project-row-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="bento-tag">{tag}</span>
            ))}
          </div>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="github-btn">
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Project() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? projects
    : projects.filter(p => p.tags.includes(activeTag));

  return (
    <div className="projects-container" id="projects">
      <h1>Projects.</h1>
      <div className="project-filters">
        {allTags.map(tag => (
          <button
            key={tag}
            className={"filter-btn" + (activeTag === tag ? " active" : "")}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="project-list">
        {filtered.map((project, index) => (
          <ProjectRow key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Project;
