/**
 * ChapterMap — AI-Native UI + Glassmorphism overlay
 * Design: Full-screen frosted glass overlay, bento-grid scene cards, chapter color coding
 */
import { useEffect, useRef } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES, CHAPTERS } from '../../data/scenes';
import { X, BookOpen, Layers, Wrench, Rocket, FileText } from 'lucide-react';

const CHAPTER_ICONS: Record<string, React.ElementType> = {
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
        background: 'rgba(3, 3, 12, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
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
          background: 'rgba(10, 10, 26, 0.96)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.12)',
          outline: 'none',
          animation: 'scaleIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) both',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'white',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              מפת המצגת
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              {SCENES.length} סצנות · לחץ לניווט ישיר
            </p>
          </div>
          <button
            onClick={toggleChapterMap}
            aria-label="סגור"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(244,63,94,0.15)';
              (e.currentTarget as HTMLButtonElement).style.color = '#F43F5E';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(244,63,94,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
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
                      background: chapter.color + '18',
                      border: `1px solid ${chapter.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} style={{ color: chapter.color }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: chapter.color,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {chapter.label}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: chapter.color + '18' }} />
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
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
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
            לחץ על סצנה לניווט ישיר
          </span>
          <kbd
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              padding: '0.2rem 0.5rem',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.35)',
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
          ? `1px solid ${chapterColor}50`
          : '1px solid rgba(255,255,255,0.07)',
        background: isActive
          ? chapterColor + '14'
          : 'rgba(255,255,255,0.03)',
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
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = chapterColor + '30';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)';
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
            fontSize: '0.65rem',
            color: isActive ? chapterColor : chapterColor + '55',
            flexShrink: 0,
          }}
        >
          {String(scene.index + 1).padStart(2, '0')}
        </span>
        {scene.isDemo && (
          <span
            style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              padding: '0.1rem 0.35rem',
              borderRadius: '4px',
              background: chapterColor + '20',
              color: chapterColor,
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
          fontSize: '0.78rem',
          color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
          lineHeight: 1.35,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {scene.hebrewTitle}
      </span>
    </button>
  );
}
