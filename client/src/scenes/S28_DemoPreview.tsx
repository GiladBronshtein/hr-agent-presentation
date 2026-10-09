import { SceneBase, TakeawayBar } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { CODE_FONT } from '../lib/typeTokens';
import { SlackWindow, SlackMessage } from '../components/presentation/SlackChat';
import { CheckCircle2, Clock, Mail } from 'lucide-react';

const DONE_ITEMS = [
  'פגישת 1:1 תואמה: 14/07 09:00',
  'בקשת גישות IT נשלחה (Jira, Figma, Slack)',
  'רישום לקורסים: PM-101, Product-Strategy',
];

export default function S28_DemoPreview() {
  return (
    <SceneBase>
      <DemoStepLayout step={5} title="תצוגה מקדימה">
          <SlackWindow channel="hr-onboarding">
            <SlackMessage initials="OB" name="OnboardBot" time="10:07" color="#6366F1" isBot>
              <div style={{ fontWeight: 700, color: '#A5B4FC', marginBottom: '0.5rem' }}>סיכום לאישור:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {DONE_ITEMS.map((item, i) => (
                  <div key={item} className="mo-rise-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', animationDelay: `${0.35 + i * 0.06}s` }}>
                    <span style={{ display: 'inline-flex', color: '#10B981', flexShrink: 0 }}><CheckCircle2 size="1em" /></span>
                    <span>{item}</span>
                  </div>
                ))}
                <div className="mo-rise-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', animationDelay: `${0.35 + DONE_ITEMS.length * 0.06}s` }}>
                  <span style={{ display: 'inline-flex', color: '#F59E0B', flexShrink: 0 }}><Clock size="1em" /></span>
                  <span>מייל ברכה: <strong style={{ color: 'white' }}>ממתין לאישורך</strong></span>
                </div>
              </div>

              {/* Attached email draft */}
              <div className="mo-rise" style={{
                animationDelay: '0.75s',
                marginTop: '0.875rem', padding: 'clamp(0.875rem, 1.5cqh, 1.25rem)',
                borderRadius: '12px', borderRight: '3px solid #F59E0B',
                background: 'rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FCD34D', fontWeight: 700, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', marginBottom: '0.45rem' }}>
                  <Mail size="1em" /> טיוטת מייל
                </div>
                <div style={{ fontSize: 'clamp(1rem, 1.25cqw, 1.3rem)', color: 'rgba(255,255,255,0.68)' }}>
                  אל: <bdi dir="ltr" style={{ fontFamily: CODE_FONT }}>yael.cohen@company.co.il</bdi>
                </div>
                <div style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', color: 'rgba(255,255,255,0.7)', marginTop: '0.3rem' }}>
                  נושא: ברוכה הבאה! יום ראשון שלך: 15 ביולי
                </div>
                <div style={{ fontSize: 'clamp(1rem, 1.35cqw, 1.3rem)', color: 'rgba(255,255,255,0.78)', marginTop: '0.55rem', lineHeight: 1.55 }}>
                  יעל שלום, שמחה גדולה שתצטרפי אלינו! הכנתי עבורך תוכנית קליטה מלאה...
                </div>
              </div>
            </SlackMessage>
          </SlackWindow>
      </DemoStepLayout>
      <TakeawayBar color="#F59E0B">
        שום דבר לא נשלח עדיין. <span style={{ color: '#FCD34D', fontWeight: 700 }}>הכול מחכה לאישור אנושי.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
