import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InstagramWordmark, MetaLogo, GoogleG } from './BrandIcons';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || email.length < 5) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (mode === 'signup') register(email);
    else login(email);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-sm flex-1 flex flex-col justify-center">
        <div className="border border-[#262626] rounded-2xl px-4 py-8 bg-black">
          <div className="flex justify-center mb-8">
            <InstagramWordmark className="w-44 h-14 text-white" />
          </div>

          <form onSubmit={submit} className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Phone number, username, or email"
                className="w-full bg-[#121212] border border-[#262626] rounded-md px-3 pt-4 pb-1.5 text-sm text-white focus:border-[#737373] outline-none peer placeholder-transparent"
              />
              <label className="absolute left-3 top-3 text-xs text-[#737373] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
                {mode === 'signup' ? 'Email' : 'Phone number, username, or email'}
              </label>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Password"
                className="w-full bg-[#121212] border border-[#262626] rounded-md px-3 pt-4 pb-1.5 pr-10 text-sm text-white focus:border-[#737373] outline-none peer placeholder-transparent"
              />
              <label className="absolute left-3 top-3 text-xs text-[#737373] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
                Password
              </label>
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white"
                >
                  {showPw ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              )}
            </div>

            {error && <p className="text-xs text-red-400 pt-1">{error}</p>}

            <button
              type="submit"
              disabled={!email || !password}
              className="w-full mt-3 bg-[#0095f6] disabled:opacity-40 text-white text-sm font-semibold rounded-lg py-2 hover:bg-[#1877f2] transition-colors"
            >
              {mode === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          {mode === 'login' && (
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-[#262626]" />
              <span className="px-4 text-xs font-semibold text-[#737373]">OR</span>
              <div className="flex-1 h-px bg-[#262626]" />
            </div>
          )}

          {mode === 'login' && (
            <button
              onClick={() => email.includes('@') && login(email)}
              className="w-full flex items-center justify-center gap-2 text-sm text-[#e0f1ff] font-semibold py-2 hover:opacity-80"
            >
              <GoogleG className="w-5 h-5" />
              Continue with Google
            </button>
          )}

          {mode === 'login' && (
            <p className="text-center text-xs text-[#3897f0] mt-5">Forgot password?</p>
          )}
        </div>

        <div className="border border-[#262626] rounded-2xl mt-3 px-4 py-5 text-center bg-black">
          <span className="text-sm text-[#f3f4f6]">
            {mode === 'login' ? "Don't have an account? " : 'Have an account? '}
          </span>
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-sm font-semibold text-[#3897f0]"
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-[#737373]">
        <MetaLogo className="w-16 h-10" />
        <p className="text-xs">from Meta</p>
      </div>
    </div>
  );
}
