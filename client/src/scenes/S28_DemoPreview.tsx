import { SceneBase, ContentLayout, SceneTitle, TakeawayBar } from '../components/presentation/SceneBase';
import { SlackWindow, SlackMessage } from '../components/presentation/SlackChat';
import { CheckCircle2, Clock, Mail } from 'lucide-react';

const DONE_ITEMS = [
  'פגישת 1:1 תואמה: 14/7 09:00',
  'בקשת גישות IT נשלחה (Jira, Figma, Slack)',
  'רישום לקורסים: PM-101, Product-Strategy',
];

export default function S28_DemoPreview() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-5xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.4cqh, 2rem)', paddingBottom: 'clamp(3rem, 5cqh, 4rem)' }}>
          <div style={{ textAlign: 'center' }}>
            <p className="text-white/60 uppercase tracking-widest mb-2" style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>שלב 5</p>
            <SceneTitle size="md">תצוגה מקדימה</SceneTitle>
          </div>

          <SlackWindow channel="hr-onboarding">
            <SlackMessage initials="OB" name="OnboardBot" time="10:07" color="#6366F1" isBot>
              <div style={{ fontWeight: 700, color: '#A5B4FC', marginBottom: '0.5rem' }}>סיכום לאישור:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {DONE_ITEMS.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ display: 'inline-flex', color: '#10B981', flexShrink: 0 }}><CheckCircle2 size="1em" /></span>
                    <span>{item}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ display: 'inline-flex', color: '#F59E0B', flexShrink: 0 }}><Clock size="1em" /></span>
                  <span>מייל ברוך הבא - <strong style={{ color: 'white' }}>ממתין לאישורך</strong></span>
                </div>
              </div>

              {/* Attached email draft */}
              <div style={{
                marginTop: '0.875rem', padding: 'clamp(0.875rem, 1.5cqh, 1.25rem)',
                borderRadius: '12px', borderRight: '3px solid #F59E0B',
                background: 'rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FCD34D', fontWeight: 700, fontSize: 'clamp(0.95rem, 1.2cqw, 1.15rem)', marginBottom: '0.45rem' }}>
                  <Mail size="1em" /> טיוטת מייל
                </div>
                <div style={{ fontSize: 'clamp(0.95rem, 1.25cqw, 1.2rem)', color: 'rgba(255,255,255,0.55)', direction: 'ltr', textAlign: 'left', fontFamily: 'monospace' }}>
                  To: yael.cohen@company.co.il
                </div>
                <div style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', color: 'rgba(255,255,255,0.7)', marginTop: '0.3rem' }}>
                  נושא: ברוכה הבאה! יום ראשון שלך: 15 ביולי
                </div>
                <div style={{ fontSize: 'clamp(1rem, 1.35cqw, 1.3rem)', color: 'rgba(255,255,255,0.78)', marginTop: '0.55rem', lineHeight: 1.55 }}>
                  יעל שלום, אנחנו שמחים שתצטרפי אלינו! הכנתי עבורך תוכנית קליטה מלאה...
                </div>
              </div>
            </SlackMessage>
          </SlackWindow>
        </div>
      </ContentLayout>
      <TakeawayBar color="#F59E0B">
        שום דבר לא נשלח עדיין. <span style={{ color: '#FCD34D', fontWeight: 700 }}>הכול מחכה לאישור אנושי.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
