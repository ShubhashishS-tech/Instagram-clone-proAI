import { useEffect, useState } from 'react';
import { InstagramWordmark } from './BrandIcons';

export default function LogoutScreen({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<'spinner' | 'wordmark'>('spinner');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('wordmark'), 1100);
    const t2 = setTimeout(onDone, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {stage === 'spinner' ? (
        <div className="w-10 h-10 border-2 border-[#262626] border-t-[#0095f6] rounded-full animate-spin-fast" />
      ) : (
        <InstagramWordmark className="w-44 h-14 text-white animate-fade-in" />
      )}
      <p className="text-xs text-[#737373] mt-6">Logging out…</p>
    </div>
  );
}
