import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const OPTIONS = [
  { id: 'coordination', label: 'תיאומים ותזכורות', icon: '🔄' },
  { id: 'writing', label: 'כתיבה חוזרת', icon: '✍️' },
  { id: 'data-entry', label: 'הזנת נתונים', icon: '📊' },
  { id: 'searching', label: 'חיפוש מידע', icon: '🔍' },
  { id: 'approvals', label: 'מעקב אחר אישורים', icon: '✅' },
  { id: 'onboarding', label: 'קליטת עובדים', icon: '👋' },
  { id: 'reporting', label: 'הכנת דוחות', icon: '📈' },
  { id: 'scheduling', label: 'תיאום פגישות', icon: '📅' },
];

export default function S03_AudienceQuestion() {
  const { audienceSelections, toggleAudienceSelection } = usePresentationStore();

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div className="text-center">
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-3">שאלה לקהל</p>
            <SceneTitle size="md">איפה הזמן שלכם נעלם?</SceneTitle>
            <p className="text-white/50 mt-3 text-3xl">בחרו עד שלושה תחומים</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {OPTIONS.map((opt) => {
              const isSelected = audienceSelections.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleAudienceSelection(opt.id)}
                  className="p-6 rounded-xl text-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                    border: isSelected ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    transform: isSelected ? 'scale(1.02)' : undefined,
                  }}
                >
                  <div className="text-4xl mb-2">{opt.icon}</div>
                  <p className="text-3xl font-medium" style={{ color: isSelected ? '#6366F1' : 'rgba(255,255,255,0.7)' }}>
                    {opt.label}
                  </p>
                </button>
              );
            })}
          </div>
          {audienceSelections.length > 0 && (
            <p className="text-center text-white/40 text-3xl animate-fade-in">
              בחרתם {audienceSelections.length} תחומים, נחזור אליהם בסוף
            </p>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
