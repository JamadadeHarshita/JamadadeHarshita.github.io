import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faDocker, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const skills = [
    {
        id: 0,
        icon: faPython,
        title: "AI & NLP Engineering",
        color: "#5000ca",
        hoverColor: "#7b2fff",
        description: "Production-grade LLM pipelines, RAG systems, and hybrid retrieval architectures. Hands-on at MAHLE (hybrid search, ANN vector search, RRF) and DLR (WARC corpus classification, BERTopic vs FASTopic benchmarking, LLM cluster labelling).",
        labels: ["LLMs", "RAG Pipelines", "Vector Search", "Hybrid Retrieval", "Jina Embeddings", "BERTopic", "FASTopic", "DeepEval", "Elasticsearch", "OpenSearch", "NER", "TF-IDF", "Hugging Face"],
    },
    {
        id: 1,
        icon: faDocker,
        title: "Data Engineering & Cloud",
        color: "#9b59b6",
        hoverColor: "#b07cc6",
        description: "Scalable ETL pipelines and cloud-native data infrastructure on GCP. Built Airflow pipelines ingesting music data from 5 sources, dbt transformation models in BigQuery, and containerised Docker + PostgreSQL deployments at MAHLE.",
        labels: ["Python", "SQL", "GCP", "BigQuery", "Apache Airflow", "dbt", "PostgreSQL", "Docker", "Pub/Sub", "Dataflow", "Flask", "Pandas", "NumPy", "MongoDB"],
    },
    {
        id: 2,
        icon: faGoogle,
        title: "ML & Model Development",
        color: "#e8c9a0",
        hoverColor: "#f0d9b5",
        description: "Fine-tuning and benchmarking transformers for real-world tasks. Master's thesis: dual-stream hybrid architecture fusing RoBERTa + Twitter-RoBERTa for fine-grained emotion detection, achieving 0.5407 Macro F1 across 28 emotion categories.",
        labels: ["RoBERTa", "Twitter-RoBERTa", "LLaMA 3.3 70B", "Mistral", "Scikit-learn", "PyTorch", "SenticNet", "Streamlit", "Power BI", "Tableau", "Matplotlib", "DeepEval", "FAISS"],
    },
];

function DonutChart({ active, setActive }: { active: number, setActive: (i: number) => void }) {
    const cx = 150, cy = 150, outerR = 118, innerR = 62;
    const total = 3;
    const gap = 0.04;
    const segmentAngle = (2 * Math.PI / total) - gap;

    const getPath = (index: number, isActive: boolean) => {
        const startAngle = index * (2 * Math.PI / total) - Math.PI / 2 + gap / 2;
        const endAngle = startAngle + segmentAngle;
        const r = isActive ? outerR + 8 : outerR;

        const x1 = cx + innerR * Math.cos(startAngle);
        const y1 = cy + innerR * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(startAngle);
        const y2 = cy + r * Math.sin(startAngle);
        const x3 = cx + r * Math.cos(endAngle);
        const y3 = cy + r * Math.sin(endAngle);
        const x4 = cx + innerR * Math.cos(endAngle);
        const y4 = cy + innerR * Math.sin(endAngle);

        return `M ${x1} ${y1} L ${x2} ${y2} A ${r} ${r} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`;
    };

    const getLabelPos = (index: number) => {
        const midAngle = index * (2 * Math.PI / total) - Math.PI / 2 + segmentAngle / 2 + gap / 2;
        const r = outerR + 28;
        return {
            x: cx + r * Math.cos(midAngle),
            y: cy + r * Math.sin(midAngle),
        };
    };

    return (
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="donut-svg">
            {skills.map((skill, i) => {
                const isActive = active === i;
                const labelPos = getLabelPos(i);
                return (
                    <g key={i} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
                        <path
                            d={getPath(i, isActive)}
                            fill={isActive ? skill.color : `${skill.color}55`}
                            stroke={skill.color}
                            strokeWidth="1"
                            style={{ transition: 'all 0.3s ease', filter: isActive ? `drop-shadow(0 0 8px ${skill.color})` : 'none' }}
                        />
                        <text
                            x={labelPos.x}
                            y={labelPos.y - 6}
                            textAnchor="middle"
                            fontSize="9"
                            fill={isActive ? '#fff' : 'rgba(255,255,255,0.6)'}
                            fontFamily="Space Grotesk, sans-serif"
                            fontWeight="600"
                        >
                            {skill.title.split(' & ')[0].split(' ')[0]}
                        </text>
                        <text
                            x={labelPos.x}
                            y={labelPos.y + 6}
                            textAnchor="middle"
                            fontSize="8"
                            fill={isActive ? '#fff' : 'rgba(255,255,255,0.5)'}
                            fontFamily="Space Grotesk, sans-serif"
                        >
                            {skill.title.includes('&') ? `& ${skill.title.split('& ')[1]}` : skill.title.split(' ').slice(1).join(' ')}
                        </text>
                    </g>
                );
            })}
            {/* Center text */}
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontFamily="Space Grotesk, sans-serif">click to</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontFamily="Space Grotesk, sans-serif">explore</text>
        </svg>
    );
}

function Expertise() {
    const [active, setActive] = useState<number>(0);

    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1>Expertise.</h1>
                <div className="expertise-layout">
                    <DonutChart active={active} setActive={setActive} />
                    <div className="skill-detail">
                        <FontAwesomeIcon icon={skills[active].icon} size="2x" className="skill-icon" style={{ color: skills[active].color }} />
                        <h3 style={{ color: skills[active].color }}>{skills[active].title}</h3>
                        <p>{skills[active].description}</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {skills[active].labels.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expertise;