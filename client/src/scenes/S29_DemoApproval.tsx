import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

export default function S29_DemoApproval() {
  const { demoApprovalState, setDemoApprovalState, goNext } = usePresentationStore();
  const [feedback, setFeedback] = useState('');

  const handleApprove = () => {
    setDemoApprovalState('approved');
    setTimeout(() => goNext(), 1000);
  };

  const handleReject = () => {
    setDemoApprovalState('rejected');
  };

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">שלב 6 — Human in the Loop</p>
            <SceneTitle size="md">נקודת אישור</SceneTitle>
            <p className="text-white/50 mt-2 text-sm">האייג׳נט עצר ומחכה לך</p>
          </div>

          {demoApprovalState === 'pending' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(255,209,102,0.08)', border: '1px solid rgba(255,209,102,0.25)' }}>
                <p className="text-2xl mb-2">✋</p>
                <p className="text-white/80 font-medium">לשלוח את מייל הברוך הבא ליעל?</p>
                <p className="text-white/40 text-sm mt-1">הכל מוכן — רק אישורך חסר</p>
              </div>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="הערות אופציונליות..."
                className="w-full p-3 rounded-xl text-sm resize-none"
                rows={2}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', outline: 'none' }}
              />
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleReject}
                  className="py-3 rounded-xl font-medium text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)', color: '#FF6B6B' }}>
                  ✗ דחה / ערוך
                </button>
                <button onClick={handleApprove}
                  className="py-3 rounded-xl font-medium text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(112,214,167,0.15)', border: '1px solid rgba(112,214,167,0.4)', color: '#70D6A7' }}>
                  ✓ אשר ושלח
                </button>
              </div>
            </div>
          )}

          {demoApprovalState === 'approved' && (
            <div className="p-6 rounded-xl text-center animate-fade-in" style={{ background: 'rgba(112,214,167,0.1)', border: '1px solid rgba(112,214,167,0.3)' }}>
              <p className="text-3xl mb-2">✅</p>
              <p className="font-bold" style={{ color: '#70D6A7' }}>אושר! האייג׳נט ממשיך...</p>
            </div>
          )}

          {demoApprovalState === 'rejected' && (
            <div className="p-6 rounded-xl animate-fade-in space-y-3" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)' }}>
              <p className="font-bold" style={{ color: '#FF6B6B' }}>נדחה — האייג׳נט עוצר</p>
              <p className="text-white/60 text-sm">האייג׳נט שמר את הטיוטה ומחכה להנחיות חדשות</p>
              <button onClick={() => setDemoApprovalState('pending')}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                נסה שוב
              </button>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
