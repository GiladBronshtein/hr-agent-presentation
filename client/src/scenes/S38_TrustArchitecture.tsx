import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const LAYERS = [
  { layer: 'שכבת ממשל', items: ['מדיניות שימוש', 'ועדת AI', 'ביקורת תקופתית'], color: '#6366F1' },
  { layer: 'שכבת עיצוב', items: ['System Prompt', 'גבולות ברורים', 'Approval Gates'], color: '#A78BFA' },
  { layer: 'שכבת ביצוע', items: ['תיעוד מלא', 'Audit Log', 'Rollback'], color: '#10B981' },
  { layer: 'שכבת מדידה', items: ['דיוק', 'שביעות רצון', 'חריגות'], color: '#F59E0B' },
];

export default function S38_TrustArchitecture() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-6">
          <div>
            <SceneTitle size="md">ארכיטקטורת אמון</SceneTitle>
            <p className="text-white/50 mt-2 text-sm">אמון נבנה בשכבות — לא בהצהרות</p>
          </div>
          <div className="space-y-3">
            {LAYERS.map((layer, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: layer.color + '08', border: `1px solid ${layer.color}20` }}>
                <p className="text-xs font-bold mb-2" style={{ color: layer.color }}>{layer.layer}</p>
                <div className="flex gap-2 flex-wrap">
                  {layer.items.map((item) => (
                    <span key={item} className="text-xs px-2 py-1 rounded-lg"
                      style={{ background: layer.color + '12', color: layer.color + 'cc', border: `1px solid ${layer.color}20` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/50 text-sm">
              כל שכבה מגינה על השכבה שמעליה — ומאפשרת לאייג׳נט לפעול בביטחון
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
