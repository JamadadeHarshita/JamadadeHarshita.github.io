import React, { useState, useEffect, useRef } from "react";
import '../assets/styles/Project.scss';
import { useLang } from '../i18n/LangContext';
import { TranslationKey } from '../i18n/translations';

import mahleImg from '../assets/images/mahle-project.jpg';
import dlrImg from '../assets/images/dlr-project.jpeg';
import metadataArch from '../assets/images/metadata-arch.png';
import youtubeArch from '../assets/images/youtube-arch.png';
import deepemotionArch from '../assets/images/deepemotion-arch.png';
import spotifyDag from '../assets/images/spotify-dag.jpg';
import spotifyDbt from '../assets/images/spotify-dbt.jpg';
import cricketEr from '../assets/images/cricket-er.png';
import hushhushArch from '../assets/images/hushhusharch.jpg';

interface ProjectMeta {
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tags: string[];
  image: string | null;
  hoverImage?: string;
  github: string | null;
  isCompany: boolean;
}

const projectsMeta: ProjectMeta[] = [
  { titleKey: 'p0_title', descKey: 'p0_desc', tags: ["NLP", "Search", "LLM", "Vector Search"],            image: mahleImg,       github: null,                                                           isCompany: true },
  { titleKey: 'p1_title', descKey: 'p1_desc', tags: ["LLM", "Evaluation", "Docker", "Pipeline"],           image: mahleImg,       github: null,                                                           isCompany: true },
  { titleKey: 'p2_title', descKey: 'p2_desc', tags: ["RAG", "NLP", "Research"],                            image: dlrImg,         github: null,                                                           isCompany: true },
  { titleKey: 'p3_title', descKey: 'p3_desc', tags: ["NLP", "Research", "ML"],                             image: deepemotionArch,github: "https://github.com/JamadadeHarshita/DeepEmotion-Lab",          isCompany: false },
  { titleKey: 'p4_title', descKey: 'p4_desc', tags: ["NLP", "LLM", "Research"],                            image: metadataArch,   github: "https://github.com/JamadadeHarshita/Metadata-Extraction-LLM-Approach-CaseStudy", isCompany: false },
  { titleKey: 'p5_title', descKey: 'p5_desc', tags: ["Data Engineering", "Cloud", "GCP"],                  image: spotifyDag,     hoverImage: spotifyDbt, github: null,                                  isCompany: false },
  { titleKey: 'p6_title', descKey: 'p6_desc', tags: ["Data Engineering", "GCP", "Cloud"],                  image: youtubeArch,    github: "https://github.com/JamadadeHarshita/YouTubeDataPipeline",     isCompany: false },
  { titleKey: 'p7_title', descKey: 'p7_desc', tags: ["ML", "Flask", "Automation"],                         image: hushhushArch,   github: "https://github.com/JamadadeHarshita/TheHushHushRecruiter",    isCompany: false },
  { titleKey: 'p8_title', descKey: 'p8_desc', tags: ["Data Engineering", "Hadoop", "SQL", "Python"],       image: cricketEr,      github: null,                                                           isCompany: false },
  { titleKey: 'p9_title', descKey: 'p9_desc', tags: ["NLP", "Audio", "LLM"],                               image: null,           github: "https://github.com/JamadadeHarshita/NlpSpeechToText",         isCompany: false },
];

const allTags = ["All", "NLP", "LLM", "RAG", "ML", "Data Engineering", "Cloud", "Research"];

function ProjectRow({ project, index }: { project: ProjectMeta; index: number }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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

  const displayImage = hovered && project.hoverImage ? project.hoverImage : project.image;
  const title = t(project.titleKey);

  return (
    <div
      ref={ref}
      className={`project-row${visible ? ' row-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="project-row-number">{String(index + 1).padStart(2, '0')}</span>

      {displayImage ? (
        <div className="project-row-image">
          <img src={displayImage} alt={title} />
        </div>
      ) : (
        <div className="project-row-placeholder">
          <span>{title.charAt(0)}</span>
        </div>
      )}

      <div className="project-row-content">
        <div className="project-row-top">
          <div className="project-row-meta">
            {project.isCompany && <span className="company-badge">{t('company_badge')}</span>}
          </div>
          <h2 className="project-row-title">{title}</h2>
          <p className="project-row-desc">{t(project.descKey)}</p>
        </div>
        <div className="project-row-bottom">
          <div className="project-row-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="bento-tag">{tag}</span>
            ))}
          </div>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="github-btn">
              {t('github_btn')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectSection() {
  const { t } = useLang();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? projectsMeta
    : projectsMeta.filter(p => p.tags.includes(activeTag));

  return (
    <div className="projects-container" id="projects">
      <h1>{t('projects_heading')}</h1>
      <div className="project-filters">
        {allTags.map(tag => (
          <button
            key={tag}
            className={"filter-btn" + (activeTag === tag ? " active" : "")}
            onClick={() => setActiveTag(tag)}
          >
            {tag === "All" ? t('tag_all') : tag}
          </button>
        ))}
      </div>
      <div className="project-list">
        {filtered.map((project, index) => (
          <ProjectRow key={project.titleKey} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ProjectSection;
