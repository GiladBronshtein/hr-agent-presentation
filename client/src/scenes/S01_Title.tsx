import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout } from '../components/presentation/SceneBase';

const CHAPTERS = [
  { label: 'להבין', color: '#4F7CFF', desc: 'מה הם ואיך עובדים' },
  { label: 'לראות', color: '#70D6A7', desc: 'תשעה שימושים ב-HR' },
  { label: 'לבנות', color: '#FF6B6B', desc: 'דמו חי של אייג׳נט' },
  { label: 'להטמיע', color: '#FFD166', desc: 'פיילוט ב-90 יום' },
];

export default function S01_Title() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneBase variant="chapter-break">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(79,124,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,124,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(79,124,255,0.12) 0%, transparent 70%)',
      }} />

      <ContentLayout>
        <div
          className="text-center space-y-8 max-w-4xl relative z-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(79,124,255,0.12)',
              border: '1px solid rgba(79,124,255,0.3)',
              color: '#4F7CFF',
              letterSpacing: '0.08em',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            HR Leaders Summit 2026
          </div>

          {/* Main title */}
          <div>
            <h1
              className="font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'white' }}
            >
              מהאוטומציה
            </h1>
            <h1
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                background: 'linear-gradient(135deg, #4F7CFF 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              לאייג׳נט
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            כיצד AI Agents משנים את עבודת HR — ומה תפקידכם בעיצוב השינוי
          </p>

          {/* Chapter pills */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{
                  background: ch.color + '10',
                  border: `1px solid ${ch.color}30`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'none' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                <span className="font-bold text-sm" style={{ color: ch.color }}>{ch.label}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{ch.desc}</span>
              </div>
            ))}
          </div>

          {/* Hint */}
          <p
            className="text-sm pt-2"
            style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}
          >
            לחצו על חץ ימינה להתחלה
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
