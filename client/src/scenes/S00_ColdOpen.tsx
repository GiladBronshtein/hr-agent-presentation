import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout } from '../components/presentation/SceneBase';

const MESSAGES = [
  { from: 'מנהל', text: 'אני צריך לפתוח משרה חדשה', time: '09:02', channel: 'Slack' },
  { from: 'HR', text: 'מעתיקה לגיליון... שולחת ל-IT...', time: '09:15', channel: 'Gmail' },
  { from: 'IT', text: 'פתחתי ב-Jira, מחכה לאישור', time: '09:47', channel: 'Jira' },
  { from: 'HR', text: 'מזכירה שוב — עדיין לא קיבלתי אישור', time: '11:30', channel: 'Slack' },
  { from: 'Finance', text: 'צריך אישור תקציב קודם', time: '13:15', channel: 'Email' },
  { from: 'HR', text: 'מעדכנת את הגיליון שוב...', time: '14:02', channel: 'Drive' },
];

const SYSTEMS = ['Slack', 'Gmail', 'Drive', 'Jira', 'Calendar', 'HRIS', 'Excel'];

export default function S00_ColdOpen() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [highlightedSystem, setHighlightedSystem] = useState<number>(-1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    MESSAGES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleMessages(i + 1), 600 + i * 700));
    });
    let sysIdx = 0;
    const sysInterval = setInterval(() => {
      setHighlightedSystem(sysIdx % SYSTEMS.length);
      sysIdx++;
    }, 1200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(sysInterval);
    };
  }, []);

  return (
    <SceneBase>
      <ContentLayout className="max-w-4xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">יום עבודה רגיל ב-HR</p>
            {MESSAGES.map((msg, i) => (
              <div
                key={i}
                className="flex items-start gap-3 transition-all duration-500"
                style={{
                  opacity: i < visibleMessages ? 1 : 0,
                  transform: i < visibleMessages ? 'none' : 'translateY(10px)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{
                    background: msg.from === 'HR' ? 'rgba(79,124,255,0.2)' : 'rgba(255,255,255,0.08)',
                    color: msg.from === 'HR' ? '#4F7CFF' : 'rgba(255,255,255,0.5)',
                    border: msg.from === 'HR' ? '1px solid rgba(79,124,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {msg.from[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white/60 text-xs font-medium">{msg.from}</span>
                    <span className="text-white/25 text-xs">{msg.time}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>{msg.channel}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-64 h-64">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold text-center" style={{ background: 'rgba(79,124,255,0.15)', border: '2px solid rgba(79,124,255,0.4)', color: '#4F7CFF', zIndex: 10 }}>HR</div>
              {SYSTEMS.map((sys, i) => {
                const angle = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
                const r = 100;
                const x = 50 + (r * Math.cos(angle));
                const y = 50 + (r * Math.sin(angle));
                const isActive = highlightedSystem === i;
                return (
                  <div key={sys} className="absolute text-xs font-medium px-2 py-1 rounded-lg transition-all duration-500" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', background: isActive ? 'rgba(79,124,255,0.2)' : 'rgba(255,255,255,0.05)', border: isActive ? '1px solid rgba(79,124,255,0.5)' : '1px solid rgba(255,255,255,0.1)', color: isActive ? '#4F7CFF' : 'rgba(255,255,255,0.4)', boxShadow: isActive ? '0 0 12px rgba(79,124,255,0.3)' : 'none' }}>{sys}</div>
                );
              })}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {SYSTEMS.map((_, i) => {
                  const angle = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
                  const x2 = 50 + (100 * Math.cos(angle));
                  const y2 = 50 + (100 * Math.sin(angle));
                  return <line key={i} x1="50%" y1="50%" x2={`${x2}%`} y2={`${y2}%`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
                })}
              </svg>
            </div>
            <p className="text-white/40 text-sm text-center max-w-xs leading-relaxed">המידע קיים בכל מקום.<br /><span className="text-white/60">החיבור עדיין ידני.</span></p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
