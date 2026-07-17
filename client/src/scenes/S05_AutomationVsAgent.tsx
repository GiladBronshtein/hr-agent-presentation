import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

export default function S05_AutomationVsAgent() {
  const [active, setActive] = useState<'automation' | 'agent'>('automation');

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">אוטומציה לעומת אייג׳נט</SceneTitle>
          </div>
          <div className="flex gap-2 justify-center">
            {(['automation', 'agent'] as const).map((tab) => (
              <button key={tab} onClick={() => setActive(tab)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: active === tab ? (tab === 'automation' ? 'rgba(255,209,102,0.15)' : 'rgba(79,124,255,0.15)') : 'rgba(255,255,255,0.05)',
                  border: active === tab ? `1px solid ${tab === 'automation' ? 'rgba(255,209,102,0.4)' : 'rgba(79,124,255,0.4)'}` : '1px solid rgba(255,255,255,0.1)',
                  color: active === tab ? (tab === 'automation' ? '#FFD166' : '#4F7CFF') : 'rgba(255,255,255,0.5)',
                }}>
                {tab === 'automation' ? 'אוטומציה' : 'אייג׳נט'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard style={{ opacity: active === 'automation' ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <div className="text-2xl mb-3">⚙️</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#FFD166' }}>אוטומציה</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">מבצעת מסלול קבוע. מצוינת לתהליכים צפויים.</p>
              <div className="space-y-2 text-sm">
                {['אם X קרה → עשה Y', 'שלבים קבועים ומוגדרים', 'לא מבינה הקשר', 'מהירה ואמינה'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span style={{ color: '#FFD166' }}>•</span>
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: 'rgba(255,209,102,0.08)', border: '1px solid rgba(255,209,102,0.15)' }}>
                <strong style={{ color: '#FFD166' }}>דוגמה:</strong>
                <span className="text-white/60"> עובד מילא טופס → שלח מייל</span>
              </div>
            </GlassCard>
            <GlassCard style={{ opacity: active === 'agent' ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#4F7CFF' }}>אייג׳נט</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">מנהל מטרה. מתאים לתהליכים שדורשים הבנה ובחירה.</p>
              <div className="space-y-2 text-sm">
                {['מקבל מטרה, בוחר פעולות', 'מבין הקשר ומתאים', 'יודע מתי לעצור ולשאול', 'מתועד ואחראי'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span style={{ color: '#4F7CFF' }}>•</span>
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: 'rgba(79,124,255,0.08)', border: '1px solid rgba(79,124,255,0.15)' }}>
                <strong style={{ color: '#4F7CFF' }}>דוגמה:</strong>
                <span className="text-white/60"> הכן תוכנית קליטה מותאמת ומאושרת לפני יום ראשון</span>
              </div>
            </GlassCard>
          </div>
          <p className="text-center text-white/40 text-sm">
            ככל שהדרך <strong className="text-white/60">צפויה יותר</strong> — אוטומציה מספיקה.
            ככל שהיא <strong className="text-white/60">מורכבת יותר</strong> — אייג׳נט מתאים.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
