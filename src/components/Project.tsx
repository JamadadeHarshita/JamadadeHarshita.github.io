import React, { useState } from "react";
import '../assets/styles/Project.scss';

import mahleImg from '../assets/images/mahle-project.jpg';
import dlrImg from '../assets/images/dlr-project.jpeg';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  github: string | null;
  isCompany: boolean;
  featured: false;
}

const projects: Project[] = [
  {
    title: "TechPro AI Search Enhancement — MAHLE",
    description: "Upgraded MAHLE's TechPro Power Search from BM25 to a hybrid AI system using Elasticsearch, ANN vector search, Jina Embeddings, and RRF. Improved G-Eval relevance from 60% to 75% across 4,000 benchmarked test cases.",
    tags: ["NLP", "Search", "LLM", "Vector Search"],
    image: mahleImg,
    github: null,
    isCompany: true,
    featured: false,
  },
  {
    title: "Automated Test Case Generation — MAHLE",
    description: "Built an independent end-to-end LLM pipeline generating ~4,000 realistic workshop-style search queries using vehicle metadata, user personas, and historical search behaviour. Integrated DeepEval G-Eval as LLM-as-a-judge. Containerised with Docker and PostgreSQL.",
    tags: ["LLM", "Evaluation", "Docker", "Pipeline"],
    image: null,
    github: null,
    isCompany: true,
    featured: false,
  },
  {
    title: "OpenSearch RAG Pipeline — DLR",
    description: "Domain-adaptive web classification pipeline across 70,000 crawled pages. Benchmarked 7 topic discovery methods and built an LLM-assisted labeling layer with Jina embeddings for hybrid pre-filter vector search.",
    tags: ["RAG", "NLP", "Cloud", "BERTopic"],
    image: dlrImg,
    github: null,
    isCompany: true,
    featured: false,
  },
  {
    title: "DeepEmotion Lab",
    description: "Dual-stream hybrid model fusing RoBERTa and Twitter-RoBERTa for fine-grained emotion detection across 28 categories. Achieved Macro F1 of 0.5407, outperforming standard baselines. Under review at IET Software — Wiley.",
    tags: ["NLP", "Research", "ML"],
    image: null,
    github: "https://github.com/JamadadeHarshita/DeepEmotion-Lab",
    isCompany: false,
    featured: false,
  },
  {
    title: "Metadata Extraction — LLM Approach",
    description: "End-to-end LLM pipeline extracting 136 structured metadata fields from German biographical transcripts. Benchmarked LLaMA 3.3 70B achieving 95.83% field-level accuracy with a TF-IDF cosine chunking strategy.",
    tags: ["NLP", "LLM", "Research"],
    image: null,
    github: "https://github.com/JamadadeHarshita/Metadata-Extraction-LLM-Approach-CaseStudy",
    isCompany: false,
    featured: false,
  },
  {
    title: "Cross-Platform Music Trend Analytics",
    description: "Weekly ETL pipeline ingesting music data from 5 sources (Spotify, Deezer, YouTube, NPR Music, Brooklyn Vegan) into GCP Cloud Storage. Unified records under a common artist ID schema, applied dbt transformation models in BigQuery to detect rising artists, and delivered a Tableau dashboard surfacing top cross-platform trends by genre.",
    tags: ["Data Engineering", "Cloud", "GCP"],
    image: null,
    github: null,
    isCompany: false,
    featured: false,
  },
  {
    title: "YouTube GCP Data Pipeline",
    description: "Cloud-native ETL pipeline on GCP automating data collection from 4 YouTube channels. Two parallel pipelines triggered by Cloud Scheduler, storing analytics in BigQuery and visualised in Power BI dashboards.",
    tags: ["Data Engineering", "GCP", "Cloud"],
    image: null,
    github: "https://github.com/JamadadeHarshita/YouTubeDataPipeline",
    isCompany: false,
    featured: false,
  },
  {
    title: "The HushHush Recruiter",
    description: "Recruitment automation platform processing 9,000+ developer profiles from Stack Overflow API. Applied K-Means Clustering and PCA for candidate ranking, reducing manual HR effort by 90%.",
    tags: ["ML", "Flask", "Automation"],
    image: null,
    github: "https://github.com/JamadadeHarshita/TheHushHushRecruiter",
    isCompany: false,
    featured: false,
  },
  {
    title: "Lecture Summarization NLP",
    description: "Modular pipeline transcribing, segmenting, and summarising long-form lecture audio. Uses Whisper, Louvain clustering for topic segmentation, KeyBERT for labeling, and Zephyr-7B for teaching-style summaries.",
    tags: ["NLP", "Audio", "LLM"],
    image: null,
    github: "https://github.com/JamadadeHarshita/NlpSpeechToText",
    isCompany: false,
    featured: false,
  },
];

const allTags = ["All", "NLP", "LLM", "RAG", "ML", "Data Engineering", "Cloud", "Research"];

function renderGithubBtn(project: Project) {
  if (project.github === null) return null;
  return React.createElement(
    'a',
    {
      href: project.github,
      target: '_blank',
      rel: 'noreferrer',
      className: 'github-btn',
    },
    'GitHub →'
  );
}

function Project() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? projects
    : projects.filter((p: Project) => p.tags.includes(activeTag));

  return (
    <div className="projects-container" id="projects">
      <h1>Projects.</h1>
      <div className="project-filters">
        {allTags.map((tag: string) => (
          <button
            key={tag}
            className={"filter-btn" + (activeTag === tag ? " active" : "")}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="bento-grid">
        {filtered.map((project: Project, index: number) => (
          <div
            className={"bento-card" + (project.featured ? " bento-featured" : "")}
            key={index}
          >
            {project.image !== null && (
              <div className="bento-image">
                <img src={project.image} alt={project.title} />
                <div className="bento-overlay" />
              </div>
            )}
            {project.image === null && (
              <div className="bento-placeholder">
                <span>{project.title.charAt(0)}</span>
              </div>
            )}
            <div className="bento-content">
              <div className="bento-top">
                {project.isCompany && (
                  <span className="company-badge">Company Project</span>
                )}
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
              <div className="bento-bottom">
                <div className="bento-tags">
                  {project.tags.map((tag: string, i: number) => (
                    <span key={i} className="bento-tag">{tag}</span>
                  ))}
                </div>
                {renderGithubBtn(project)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;