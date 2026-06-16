import React, { useState, useEffect } from "react";
import {
  Main, Timeline, Expertise, Project, Contact, Navigation, Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import Achievements from './components/Achievements';
import './index.scss';

function App() {
    const [lang, setLang] = useState<string>('EN');

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="main-container dark-mode">
            <Navigation lang={lang} setLang={setLang} />
            <FadeIn transitionDuration={700}>
                <Main />
                <Expertise />
                <Timeline />
                <Project />
                <Achievements />
                <Contact />
            </FadeIn>
            <Footer />
        </div>
    );
}

export default App;