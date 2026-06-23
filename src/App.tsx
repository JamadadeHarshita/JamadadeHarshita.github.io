import React, { useState, useEffect, useRef } from "react";
import {
  Main, Timeline, Expertise, Project, Contact, Navigation, Footer,
} from "./components";
import Achievements from './components/Achievements';
import './index.scss';
import { LangContext } from './i18n/LangContext';
import { translations, Lang } from './i18n/translations';

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-reveal${visible ? ' revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('EN');
  const t = (key: keyof typeof translations.EN): string => translations[lang][key];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <LangContext.Provider value={{ lang, t }}>
    <div className="main-container dark-mode">
      <Navigation lang={lang} setLang={setLang} />
      <Main />
      <ScrollReveal><Expertise /></ScrollReveal>
      <ScrollReveal delay={50}><Timeline /></ScrollReveal>
      <ScrollReveal delay={50}><Project /></ScrollReveal>
      <ScrollReveal delay={50}><Achievements /></ScrollReveal>
      <ScrollReveal delay={50}><Contact /></ScrollReveal>
      <Footer />
    </div>
    </LangContext.Provider>
  );
}

export default App;
