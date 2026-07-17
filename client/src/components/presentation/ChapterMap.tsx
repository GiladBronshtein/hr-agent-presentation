import { useEffect, useRef } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES, CHAPTERS } from '../../data/scenes';
import { X, BookOpen, Layers, Wrench, Rocket, FileText } from 'lucide-react';

const CHAPTER_ICONS = {
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
      // Focus the container for keyboard navigation
      containerRef.current.focus();
    }
  }, [isChapterMapOpen]);

  const handleSceneClick = (index: number) => {
    goToScene(index);
    toggleChapterMap();
  };

  return (
    <div
      className={`chapter-map ${isChapterMapOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="מפת המצגת"
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 outline-none"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">מפת המצגת</h2>
          <button
            onClick={toggleChapterMap}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="סגור"
          >
            <X size={24} />
          </button>
        </div>

        {/* Chapters */}
        <div className="space-y-8">
          {CHAPTERS.map((chapter) => {
            const Icon = CHAPTER_ICONS[chapter.id];
            const chapterScenes = SCENES.filter(
              (s) => s.index >= chapter.sceneRange[0] && s.index <= chapter.sceneRange[1]
            );

            return (
              <div key={chapter.id}>
                {/* Chapter header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: chapter.color + '22', border: `1px solid ${chapter.color}44` }}
                  >
                    <Icon size={16} style={{ color: chapter.color }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: chapter.color }}>
                    {chapter.label}
                  </h3>
                  <div className="flex-1 h-px" style={{ background: chapter.color + '22' }} />
                </div>

                {/* Scenes grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {chapterScenes.map((scene) => {
                    const isActive = scene.index === currentSceneIndex;
                    const isAppendix = scene.isAppendix;

                    return (
                      <button
                        key={scene.id}
                        onClick={() => handleSceneClick(scene.index)}
                        className={`
                          text-right p-3 rounded-lg border transition-all duration-200 text-sm
                          ${isActive
                            ? 'border-white/40 bg-white/15 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90 hover:border-white/20'
                          }
                          ${isAppendix ? 'opacity-70' : ''}
                        `}
                        style={isActive ? { borderColor: chapter.color + '80', background: chapter.color + '15' } : {}}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="text-xs font-mono mt-0.5 shrink-0"
                            style={{ color: isActive ? chapter.color : chapter.color + '60' }}
                          >
                            {String(scene.index + 1).padStart(2, '0')}
                          </span>
                          <span className="leading-tight">{scene.hebrewTitle}</span>
                        </div>
                        {scene.isDemo && (
                          <span className="mt-1 inline-block text-xs px-1.5 py-0.5 rounded"
                            style={{ background: chapter.color + '20', color: chapter.color }}>
                            דמו
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-white/40 text-sm">
          <span>לחץ על סצנה לניווט ישיר</span>
          <span>Esc לסגירה</span>
        </div>
      </div>
    </div>
  );
}
