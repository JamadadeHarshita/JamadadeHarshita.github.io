import React, { useRef, useEffect, useState } from "react";
import '../assets/styles/Timeline.scss';
import { useLang } from '../i18n/LangContext';

import mahleLogo from '../assets/images/mahle.png';
import dlrLogo from '../assets/images/dlr.jpg';
import fernLogo from '../assets/images/fernuni.jpg';
import kleLogo from '../assets/images/kle.png';
import srhLogo from '../assets/images/srh.png';

const timelineMeta = [
  { date: "Sep 2025 – Feb 2026", titleKey: 'tl0_title' as const, orgKey: 'tl0_org' as const, detailKey: 'tl0_detail' as const, logo: mahleLogo, type: "work" },
  { date: "Jun – Sep 2025",      titleKey: 'tl1_title' as const, orgKey: 'tl1_org' as const, detailKey: 'tl1_detail' as const, logo: dlrLogo,   type: "work" },
  { date: "Nov 2024 – Mar 2025", titleKey: 'tl2_title' as const, orgKey: 'tl2_org' as const, detailKey: 'tl2_detail' as const, logo: fernLogo,  type: "work" },
  { date: "Apr 2024 – Apr 2026", titleKey: 'tl3_title' as const, orgKey: 'tl3_org' as const, detailKey: 'tl3_detail' as const, logo: srhLogo,   type: "education" },
  { date: "Aug – Sep 2022",      titleKey: 'tl4_title' as const, orgKey: 'tl4_org' as const, detailKey: 'tl4_detail' as const, logo: null,      type: "work" },
  { date: "2019 – 2023",         titleKey: 'tl5_title' as const, orgKey: 'tl5_org' as const, detailKey: 'tl5_detail' as const, logo: kleLogo,   type: "education" },
];

function TimelineItem({ item, index, visible }: { item: typeof timelineMeta[0], index: number, visible: boolean }) {
  const { t } = useLang();
  const isAbove = index % 2 === 0;
  const isWork = item.type === "work";

  const card = (
    <div className="timeline-card">
      {item.logo
        ? <img src={item.logo} alt={t(item.orgKey)} className="card-logo" />
        : <div className="card-logo-placeholder">💼</div>
      }
      <div className="card-date">{item.date}</div>
      <div className="card-title">{t(item.titleKey)}</div>
      <div className="card-org">{t(item.orgKey)}</div>
      <div className="card-detail">{t(item.detailKey)}</div>
    </div>
  );

  return (
    <div className={`timeline-item ${visible ? 'visible' : ''} ${isAbove ? 'item-above' : 'item-below'}`}>
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
  const { t } = useLang();
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(timelineMeta.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref: HTMLDivElement | null, i: number) => {
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
        <h1>{t('timeline_heading')}</h1>
        <div className="horizontal-timeline">
          <div className="timeline-line" />
          {timelineMeta.map((item, i) => (
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