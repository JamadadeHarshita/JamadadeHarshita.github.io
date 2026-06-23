import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faDocker, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';
import { useLang } from '../i18n/LangContext';

const skillMeta = [
    { id: 0, icon: faPython, color: "#5000ca", proportion: 0.45, titleKey: 'skill0_title' as const, descKey: 'skill0_desc' as const, labels: ["LLMs", "RAG Pipelines", "Vector Search", "Hybrid Retrieval", "Embeddings", "Topic Modelling", "Model Evaluation", "Elasticsearch", "OpenSearch", "NER", "TF-IDF", "Hugging Face", "FAISS", "KeyBERT", "Whisper"] },
    { id: 1, icon: faDocker, color: "#9b59b6", proportion: 0.35, titleKey: 'skill1_title' as const, descKey: 'skill1_desc' as const, labels: ["Python", "SQL", "GCP", "BigQuery", "Apache Airflow", "dbt", "PostgreSQL", "Docker", "n8n", "Pub/Sub", "Dataflow", "Flask", "Pandas", "NumPy", "MongoDB", "Redis"] },
    { id: 2, icon: faGoogle, color: "#e8c9a0", proportion: 0.20, titleKey: 'skill2_title' as const, descKey: 'skill2_desc' as const, labels: ["RoBERTa", "Twitter-RoBERTa", "LLaMA 3.3 70B", "Mistral", "Scikit-learn", "PyTorch", "SenticNet", "Streamlit", "Power BI", "Matplotlib", "DeepEval", "K-Means", "PCA"] },
];

function DonutChart({ active, setActive }: { active: number, setActive: (i: number) => void }) {
    const { t } = useLang();
    const cx = 150, cy = 150, outerR = 118, innerR = 62;
    const gap = 0.03;

    const getPath = (index: number, isActive: boolean) => {
        let startAngle = -Math.PI / 2;
        for (let i = 0; i < index; i++) {
            startAngle += skillMeta[i].proportion * 2 * Math.PI + gap;
        }
        const endAngle = startAngle + skillMeta[index].proportion * 2 * Math.PI;
        const r = isActive ? outerR + 10 : outerR;

        const x1 = cx + innerR * Math.cos(startAngle);
        const y1 = cy + innerR * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(startAngle);
        const y2 = cy + r * Math.sin(startAngle);
        const x3 = cx + r * Math.cos(endAngle);
        const y3 = cy + r * Math.sin(endAngle);
        const x4 = cx + innerR * Math.cos(endAngle);
        const y4 = cy + innerR * Math.sin(endAngle);
        const largeArc = skillMeta[index].proportion > 0.5 ? 1 : 0;

        return `M ${x1} ${y1} L ${x2} ${y2} A ${r} ${r} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1} Z`;
    };

    const getLabelPos = (index: number) => {
        let startAngle = -Math.PI / 2;
        for (let i = 0; i < index; i++) {
            startAngle += skillMeta[i].proportion * 2 * Math.PI + gap;
        }
        const midAngle = startAngle + skillMeta[index].proportion * Math.PI;
        const r = outerR + 26;
        return {
            x: cx + r * Math.cos(midAngle),
            y: cy + r * Math.sin(midAngle),
        };
    };

    return (
        <div className="donut-wrapper">
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="donut-svg">
                {skillMeta.map((skill, i) => {
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
                                y={labelPos.y}
                                textAnchor="middle"
                                fontSize="8"
                                fill={isActive ? '#fff' : 'rgba(255,255,255,0.5)'}
                                fontFamily="Space Grotesk, sans-serif"
                                fontWeight="600"
                            >
                                {t(skill.titleKey)}
                            </text>
                        </g>
                    );
                })}
                <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontFamily="Space Grotesk, sans-serif">{t('expertise_click')}</text>
                <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontFamily="Space Grotesk, sans-serif">{t('expertise_explore')}</text>
            </svg>

            <div className="donut-active-label">
                <span className="donut-label-title" style={{ color: skillMeta[active].color }}>
                    {t(skillMeta[active].titleKey)}
                </span>
                <span className="donut-label-pct">
                    {Math.round(skillMeta[active].proportion * 100)}{t('expertise_pct')}
                </span>
            </div>
        </div>
    );
}

function Expertise() {
    const { t } = useLang();
    const [active, setActive] = useState<number>(0);

    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1>{t('expertise_heading')}</h1>
                <div className="expertise-layout">
                    <DonutChart active={active} setActive={setActive} />
                    <div className="skill-detail">
                        <FontAwesomeIcon icon={skillMeta[active].icon} size="2x" className="skill-icon" style={{ color: skillMeta[active].color }} />
                        <h3 style={{ color: skillMeta[active].color }}>{t(skillMeta[active].titleKey)}</h3>
                        <p>{t(skillMeta[active].descKey)}</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {skillMeta[active].labels.map((label, index) => (
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