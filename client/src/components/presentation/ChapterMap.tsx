/**
 * ChapterMap - full deck map overlay
 * Design: a dark glass panel over a dimmed stage, a spectrum hairline on top,
 * every chapter lit in its own color, the current scene glowing.
 */
import { useEffect, useRef } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES, CHAPTERS } from '../../data/scenes';
import { X, BookOpen, Layers, Wrench, Rocket, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PALETTE, SPECTRUM, textOn } from '../../lib/palette';

const CHAPTER_ICONS: Record<string, LucideIcon> = {
  'להבין': BookOpen,
  'לראות': Layers,
  'לבנות': Wrench,
  'להטמיע': Rocket,
  'נספח': FileText,
};

export function ChapterMap() {
  const { isChapterMapOpen, toggleChapterMap, currentSceneIndex, goToScene } = usePresentationStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChapterMapOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isChapterMapOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isChapterMapOpen) toggleChapterMap();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isChapterMapOpen, toggleChapterMap]);

  const handleSceneClick = (index: number) => {
    goToScene(index);
    toggleChapterMap();
  };

  if (!isChapterMapOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(80% 70% at 50% 40%, rgba(19,26,68,0.9), rgba(6,9,24,0.96))',
        animation: 'fadeIn 0.25s ease both',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) toggleChapterMap(); }}
      role="dialog"
      aria-modal="true"
      aria-label="מפת המצגת"
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        dir="rtl"
        style={{
          width: '92vw',
          maxWidth: '1100px',
          maxHeight: '88vh',
          overflowY: 'auto',
          background: 'linear-gradient(180deg, rgba(246,242,234,0.05), rgba(246,242,234,0.01) 30%), rgba(9,13,38,0.97)',
          border: '1px solid rgba(246,242,234,0.12)',
          borderRadius: '20px',
          boxShadow: '0 0 0 1px rgba(155,107,255,0.12), 0 40px 120px -40px rgba(155,107,255,0.45), 0 30px 80px rgba(0,0,0,0.6)',
          outline: 'none',
          position: 'relative',
          animation: 'scaleIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) both',
        }}
      >
        {/* Spectrum hairline */}
        <div aria-hidden style={{ position: 'sticky', top: 0, height: '2px', background: SPECTRUM, zIndex: 1, boxShadow: '0 0 16px rgba(240,70,158,0.5)' }} />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(246,242,234,0.08)',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.375rem',
                fontWeight: 700,
                color: PALETTE.paper,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              מפת המצגת
            </h2>
            <p style={{ color: PALETTE.muted, fontSize: '1.15rem', margin: '0.25rem 0 0' }}>
              {SCENES.length} סצנות · לחיצה לניווט ישיר
            </p>
          </div>
          <button
            onClick={toggleChapterMap}
            aria-label="סגירה"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(246,242,234,0.05)',
              border: '1px solid rgba(246,242,234,0.12)',
              color: 'rgba(246,242,234,0.78)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(246,242,234,0.12)';
              (e.currentTarget as HTMLButtonElement).style.color = PALETTE.paper;
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(246,242,234,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(246,242,234,0.05)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(246,242,234,0.78)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(246,242,234,0.12)';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Chapters */}
        <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {CHAPTERS.map((chapter, ci) => {
            const Icon = CHAPTER_ICONS[chapter.id] || FileText;
            const chapterScenes = SCENES.filter(
              (s) => s.index >= chapter.sceneRange[0] && s.index <= chapter.sceneRange[1]
            );

            return (
              <div key={chapter.id} style={{ animation: `fadeInUp 0.4s ease ${ci * 0.05}s both` }}>
                {/* Chapter header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: chapter.color + '22',
                      border: `1px solid ${chapter.color}55`,
                      boxShadow: `0 0 18px -4px ${chapter.color}AA`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} style={{ color: textOn(chapter.color) }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.7rem',
                      color: textOn(chapter.color),
                      letterSpacing: '-0.01em',
                      textShadow: `0 0 18px ${chapter.color}66`,
                    }}
                  >
                    {chapter.label}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(270deg, ${chapter.color}66, transparent)` }} />
                  <span style={{ fontSize: '1rem', color: PALETTE.muted, fontFamily: 'monospace' }}>
                    {chapterScenes.length} סצנות
                  </span>
                </div>

                {/* Scenes grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: '0.5rem',
                  }}
                >
                  {chapterScenes.map((scene) => {
                    const isActive = scene.index === currentSceneIndex;
                    return (
                      <SceneCard
                        key={scene.id}
                        scene={scene}
                        isActive={isActive}
                        chapterColor={chapter.color}
                        onClick={() => handleSceneClick(scene.index)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1rem 2rem',
            borderTop: '1px solid rgba(246,242,234,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: PALETTE.muted, fontSize: '1rem' }}>
            לחיצה על סצנה לניווט ישיר
          </span>
          <kbd
            style={{
              background: 'rgba(246,242,234,0.07)',
              border: '1px solid rgba(246,242,234,0.14)',
              borderRadius: '6px',
              padding: '0.2rem 0.5rem',
              fontSize: '1rem',
              color: 'rgba(246,242,234,0.8)',
              fontFamily: 'monospace',
            }}
          >
            Esc לסגירה
          </kbd>
        </div>
      </div>
    </div>
  );
}

// ── Scene Card ──────────────────────────────────────────────────

interface SceneCardProps {
  scene: (typeof SCENES)[number];
  isActive: boolean;
  chapterColor: string;
  onClick: () => void;
}

function SceneCard({ scene, isActive, chapterColor, onClick }: SceneCardProps) {
  return (
    <button
      onClick={onClick}
      dir="rtl"
      style={{
        textAlign: 'right',
        padding: '0.625rem 0.75rem',
        borderRadius: '10px',
        border: isActive
          ? `1px solid ${chapterColor}80`
          : '1px solid rgba(246,242,234,0.08)',
        background: isActive
          ? `linear-gradient(160deg, ${chapterColor}2A, ${chapterColor}0C)`
          : 'rgba(246,242,234,0.03)',
        boxShadow: isActive ? `0 0 28px -8px ${chapterColor}CC` : 'none',
        cursor: 'pointer',
        transition: 'all 180ms cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(246,242,234,0.06)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = chapterColor + '66';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(246,242,234,0.03)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(246,242,234,0.08)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '3px',
            height: '100%',
            background: chapterColor,
            borderRadius: '0 10px 10px 0',
          }}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '1rem',
            color: isActive ? textOn(chapterColor) : PALETTE.muted,
            flexShrink: 0,
          }}
        >
          {String(scene.index + 1).padStart(2, '0')}
        </span>
        {scene.isDemo && (
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.1rem 0.35rem',
              borderRadius: '4px',
              background: chapterColor + '24',
              color: textOn(chapterColor),
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.04em',
            }}
          >
            DEMO
          </span>
        )}
      </div>
      <span
        style={{
          fontSize: '1rem',
          color: isActive ? PALETTE.paper : 'rgba(246,242,234,0.78)',
          lineHeight: 1.35,
          fontFamily: "'Heebo', sans-serif",
        }}
      >
        {scene.hebrewTitle}
      </span>
    </button>
  );
}
