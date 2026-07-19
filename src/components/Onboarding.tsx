import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AVATAR_OPTIONS } from '../lib/seed';
import { Check } from 'lucide-react';

export default function Onboarding() {
  const { session, completeOnboarding } = useApp();
  const [step, setStep] = useState<1 | 2>(1);
  const [handle, setHandle] = useState(session?.handle || '');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  if (!session) return null;

  const next = () => {
    if (handle.trim().length < 2) {
      setError('Handle must be at least 2 characters.');
      return;
    }
    if (!/^[a-z0-9_.]+$/i.test(handle)) {
      setError('Only letters, numbers, dots and underscores allowed.');
      return;
    }
    setError('');
    setStep(2);
  };

  const finish = () => {
    if (!avatar) {
      setError('Please select a profile picture.');
      return;
    }
    completeOnboarding(handle.trim(), avatar, bio.trim() || 'Welcome to my profile ✨');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-2 text-center">
          <h2 className="text-lg font-semibold text-white">Complete your profile</h2>
          <p className="text-xs text-[#737373] mt-1">
            {step === 1 ? 'Step 1 of 2 — Choose your handle' : 'Step 2 of 2 — Pick your avatar'}
          </p>
        </div>

        {step === 1 && (
          <div className="px-6 pb-6 space-y-4">
            <div>
              <label className="text-xs text-[#737373]">Username / Handle</label>
              <div className="flex items-center bg-[#1a1a1a] border border-[#262626] rounded-lg mt-1 px-3 focus-within:border-[#737373]">
                <span className="text-[#737373]">@</span>
                <input
                  value={handle}
                  onChange={(e) => { setHandle(e.target.value); setError(''); }}
                  placeholder="your_handle"
                  className="flex-1 bg-transparent py-3 px-1 text-sm text-white outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#737373]">Bio (optional)</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                placeholder="Tell people about yourself"
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg mt-1 px-3 py-3 text-sm text-white outline-none focus:border-[#737373]"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              onClick={next}
              className="w-full bg-[#0095f6] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-[#1877f2]"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="px-6 pb-6">
            <p className="text-xs text-[#737373] mb-3 text-center">Select your profile picture</p>
            <div className="grid grid-cols-3 gap-3">
              {AVATAR_OPTIONS.map((url, i) => (
                <button
                  key={i}
                  onClick={() => { setAvatar(url); setError(''); }}
                  className={`relative aspect-square rounded-full overflow-hidden border-2 transition-all ${
                    avatar === url ? 'border-[#0095f6] scale-95' : 'border-transparent'
                  }`}
                >
                  <img src={url} alt={`Face ${i + 1}`} className="w-full h-full object-cover" />
                  {avatar === url && (
                    <span className="absolute inset-0 bg-[#0095f6]/30 flex items-center justify-center">
                      <Check size={22} strokeWidth={1.5} className="text-white drop-shadow" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-red-400 mt-3 text-center">{error}</p>}
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-[#262626] text-[#f3f4f6] text-sm font-semibold rounded-lg py-2.5 hover:bg-[#1a1a1a]"
              >
                Back
              </button>
              <button
                onClick={finish}
                className="flex-1 bg-[#0095f6] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-[#1877f2]"
              >
                Save & Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
