import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';
import { BarChart3, Handshake, Link, RefreshCw } from 'lucide-react';

// SOURCES (verified):
// 57%: Deloitte / ServiceNow — https://www.deloitte.com/et/en/alliances/servicenow/about/deloittes-fastforward-powered-by-servicenow.html
// 60%: McKinsey Global Institute, Jun 2023 — https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier
// 82%: Gartner, 2025 — https://eightfold.ai/learn/gartner-prepare-for-the-future-of-ai-agents-in-hr/

const STATS = [
  { value: 57, suffix: '%', label: 'מזמן HR הולך למשימות אדמיניסטרטיביות', color: '#6366F1', source: 'Deloitte', sourceUrl: 'https://www.deloitte.com/et/en/alliances/servicenow/about/deloittes-fastforward-powered-by-servicenow.html' },
  { value: 60, suffix: '%', label: 'מפעילויות העבודה ניתנות לאוטומציה טכנית', color: '#10B981', source: 'McKinsey, 2023', sourceUrl: 'https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier' },
  { value: 82, suffix: '%', label: 'מה-CHROs מתכננים לאמץ AI Agents השנה', color: '#F59E0B', source: 'Gartner, 2025', sourceUrl: 'https://eightfold.ai/learn/gartner-prepare-for-the-future-of-ai-agents-in-hr/' },
];

const SHIFTS = [
  { from: 'כלי AI נוסף', to: 'שינוי תהליך עבודה', icon: RefreshCw },
  { from: 'מדידת שימוש', to: 'מדידת ערך', icon: BarChart3 },
  { from: 'פרויקט IT', to: 'שותפות HR+IT', icon: Handshake },
];

export default function S10_Why2026() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">למה 2026 שונה?</SceneTitle>
            <p className="text-white/65 mt-2">האתגר הוא לא "להשתמש ב-AI", אלא לעצב מחדש איך עבודה מתבצעת</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <GlassCard key={i} className="text-center">
                <div className="font-black mb-2" style={{ color: stat.color, fontSize: 'clamp(4rem, 7cqw, 7rem)', lineHeight: 1, textShadow: `0 0 60px ${stat.color}50`, fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <p className="text-white/60 text-3xl leading-relaxed mb-3">{stat.label}</p>
                <a
                  href={(stat as any).sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-3xl font-medium transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link size="1em" /> {(stat as any).source}
                </a>
              </GlassCard>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-white/60 text-3xl uppercase tracking-widest">השינוי הנדרש</p>
            {SHIFTS.map((shift, i) => (
              <div key={i} className="flex items-center gap-6 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-3xl"><shift.icon size="1em" /></span>
                <span className="text-white/60 text-3xl line-through">{shift.from}</span>
                <span className="text-white/65">→</span>
                <span className="text-white/80 text-3xl font-medium">{shift.to}</span>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
