'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        // Cursor position as 0-1 (left edge = 0, right edge = 1)
        const xPercent = e.clientX / window.innerWidth;
        const yPercent = e.clientY / window.innerHeight;

        // Max movement in pixels
        const maxOffset = 20;

        // Map: 0% = +maxOffset, 100% = -maxOffset
        setImageOffset({
          x: (0.5 - xPercent) * maxOffset * 2,
          y: (0.5 - yPercent) * maxOffset * 2
        });

        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const rainContainer = document.getElementById('rain');
    if (!rainContainer) return;

    const rainCount = 50;

    for (let i = 0; i < rainCount; i++) {
      const rain = document.createElement('div');
      rain.className = styles.rain;
      rain.style.left = Math.random() * 100 + '%';
      rain.style.height = Math.random() * 80 + 40 + 'px';
      rain.style.animationDuration = Math.random() * 2 + 1.5 + 's';
      rain.style.animationDelay = Math.random() * 3 + 's';
      rain.style.opacity = String(Math.random() * 0.3 + 0.1);
      rainContainer.appendChild(rain);
    }

    return () => {
      if (rainContainer) {
        rainContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Left column - Sumi image */}
      <div className={styles.imageColumn}>
        <Image
          src="/sumi.png"
          alt="Sumi"
          width={800}
          height={1200}
          priority
          className={styles.sumiImage}
          style={{
            transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(1.1)`
          }}
        />
      </div>

      {/* Right column - Content */}
      <div className={styles.contentColumn}>
        {/* Rain effect */}
        <div className={styles.rainContainer} id="rain" />
        
        {/* City glow */}
        <div className={styles.cityGlow} />
        
        {/* Decorative blurs */}
        <div className={`${styles.decoration} ${styles.decoration1}`} />
        <div className={`${styles.decoration} ${styles.decoration2}`} />

        <div className={styles.container}>
          <div className={styles.terminalHeader}>
            <span>sumi@claude ~ observing</span>
          </div>

          <div className={styles.logoSection}>
            <span className={styles.logo}>sumi</span>
            <span className={styles.logoSuffix}>by <span>claude</span></span>
          </div>

          <p className={styles.tagline}>
            i observe repositories, with help from claude.<br />
            lightweight analysis. <em>clarity over certainty</em>.<span className={styles.cursor} />
          </p>

          <div className={styles.terminalBlock}>
            <div className={styles.terminalTitle}>usage</div>
            <div className={styles.terminalLine}>
              <span className={styles.prompt}>$</span>
              <span><span className={styles.cmd}>/checkgitrepo</span> <span className={styles.arg}>&lt;github_url&gt;</span></span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.prompt}>$</span>
              <span><span className={styles.cmd}>/checkreusage</span> <span className={styles.arg}>&lt;github_url | name&gt;</span></span>
            </div>
          </div>

          <div className={styles.links}>
            <a href="https://github.com/eliminations/Sumi" className={styles.link} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              github
            </a>
            <a href="https://x.com/SumiByClaude" className={styles.link} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @SumiByClaude
            </a>
            <a href="https://t.me/SumiClaudeBot" className={styles.link} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              telegram bot
            </a>
          </div>

          <footer className={styles.footer}>
            <span>observational</span> · not authoritative · designed for early review
          </footer>
        </div>
      </div>
    </div>
  );
}
