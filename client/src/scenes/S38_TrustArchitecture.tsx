import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

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
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">ארכיטקטורת אמון</SceneTitle>
            <SceneSubtitle>אמון נבנה בשכבות, לא בהצהרות</SceneSubtitle>
          </div>
          <div className="space-y-3">
            {LAYERS.map((layer, i) => (
              // Trust is built in layers: the foundation (bottom) lands first
              <div key={i} className="p-6 rounded-xl mo-rise" style={{ background: layer.color + '08', border: `1px solid ${layer.color}20`, animationDelay: `${0.2 + (LAYERS.length - 1 - i) * 0.09}s` }}>
                <p className="text-3xl font-bold mb-2" style={{ color: textTint(layer.color) }}>{layer.layer}</p>
                <div className="flex gap-2 flex-wrap">
                  {layer.items.map((item) => (
                    <span key={item} className="text-3xl px-2 py-1 rounded-lg"
                      style={{ background: layer.color + '18', color: textTint(layer.color), border: `1px solid ${layer.color}35` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center mo-rise" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', animationDelay: '0.7s' }}>
            <p className="text-white/65 text-3xl">
              כל שכבה מגינה על השכבה שמעליה, ומאפשרת לאייג׳נט לפעול בביטחון
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
