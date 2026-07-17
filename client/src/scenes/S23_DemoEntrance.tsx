import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

export default function S23_DemoEntrance() {
  const { resetDemo } = usePresentationStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    resetDemo();
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase variant="chapter-break">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,107,107,0.07) 0%, transparent 70%)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 1s ease',
      }} />

      <ContentLayout>
        <div className="text-center space-y-8 max-w-3xl relative z-10">
          {/* Chapter label */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(255,107,107,0.12)',
              border: '1px solid rgba(255,107,107,0.3)',
              color: '#FF6B6B',
              opacity: phase >= 1 ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            פרק שלישי: לבנות
          </div>

          {/* Main headline */}
          <div style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            <h1 className="font-black leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'white' }}>
              בואו נראה
            </h1>
            <h1 className="font-black leading-tight" style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              אייג׳נט עובד
            </h1>
          </div>

          {/* Scenario card */}
          <div
            className="p-6 rounded-2xl text-right"
            style={{
              background: 'rgba(255,107,107,0.06)',
              border: '1px solid rgba(255,107,107,0.2)',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">התרחיש</p>
            <p className="text-white text-lg font-medium leading-relaxed">
              <span style={{ color: '#FFD166' }}>יעל כהן</span> קיבלה הצעת עבודה כ-Product Manager.
              <br />
              יום ראשון שלה — <span style={{ color: '#FF6B6B' }}>15 ביולי</span>, בעוד שבועיים.
            </p>
            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              נראה איך אייג׳נט קליטה מכין תוכנית מלאה, מתאם, ומקבל אישור — בלי שמנהל HR יצטרך לתאם ידנית.
            </p>
          </div>

          {/* Steps preview */}
          <div
            className="flex gap-2 justify-center flex-wrap"
            style={{ opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            {['טריגר', 'איסוף', 'תכנון', 'כלים', 'תצוגה', 'אישור', 'ביצוע', 'משוב'].map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                <span className="text-white/20 font-mono">{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
