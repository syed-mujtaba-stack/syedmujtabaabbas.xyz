import React, { useEffect, useState } from 'react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 500 : 1700;
    const startedAt = performance.now();
    let animationFrame = 0;
    let completionTimer: ReturnType<typeof setTimeout>;

    const animateProgress = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(easedProgress * 100));

      if (elapsed < 1) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      } else {
        setIsExiting(true);
        completionTimer = setTimeout(onComplete, 320);
      }
    };

    animationFrame = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`portfolio-loader${isExiting ? ' portfolio-loader--exiting' : ''}`}
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className="portfolio-loader__grid" aria-hidden="true" />

      <header className="portfolio-loader__header">
        <span className="portfolio-loader__wordmark">SMA<span>/</span></span>
        <span className="portfolio-loader__location">INDEPENDENT ENGINEER · KARACHI</span>
      </header>

      <main className="portfolio-loader__center">
        <div className="portfolio-loader__monogram" aria-hidden="true">
          <span>SM</span>
          <i />
        </div>
        <p className="portfolio-loader__eyebrow">SELECTED DIGITAL WORK · 2026</p>
        <h1 className="portfolio-loader__title">
          <span>Syed Mujtaba</span>
          <em>Abbas</em>
        </h1>
        <p className="portfolio-loader__caption">ENGINEERING WITH INTENTION</p>
      </main>

      <footer className="portfolio-loader__footer">
        <span>PORTFOLIO <b>/</b> 01</span>
        <div className="portfolio-loader__track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <span className="portfolio-loader__percentage">{String(progress).padStart(2, '0')}%</span>
      </footer>
    </div>
  );
};
