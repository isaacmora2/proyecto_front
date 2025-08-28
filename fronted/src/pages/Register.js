import { useState } from 'react';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const navigate = useNavigate('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setOkMsg('');

    if (!username || !password || !confirm) {
      setErrMsg('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setErrMsg('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setErrMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/auth/register/', {
        username,
        password,
      });
      setOkMsg('Account created successfully. You can sign in now.');
      setUsername('');
      setPassword('');
      setConfirm('');
      navigate("/login");
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        (Array.isArray(err?.response?.data) && err.response.data.join(', ')) ||
        'Could not create the account. Please try again.';
      setErrMsg(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f1a] text-white selection:bg-fuchsia-500/20">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-28 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/30 to-slate-900/70" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.06] p-8 backdrop-blur-2xl shadow-xl ring-1 ring-white/10 shadow-indigo-500/10">
          <div className="mx-auto mb-8 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 font-semibold text-white shadow-[0_8px_30px_-10px_rgba(139,92,246,0.65)]">
            I2Test
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mb-6 text-center text-sm text-white/70">
            Join the platform and start exploring.
          </p>

          <div role="alert" aria-live="assertive" className="min-h-6 mb-3 text-sm">
            {errMsg && <p className="text-rose-300">{errMsg}</p>}
            {okMsg && <p className="text-emerald-300">{okMsg}</p>}
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition
                           focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/70"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/50 outline-none transition
                             focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-lg px-2 text-white/70 hover:text-white
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
                  aria-label={showPwd ? 'Hide passwords' : 'Show passwords'}
                >
                  {showPwd ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
                Confirm password
              </label>
              <input
                id="confirm"
                type={showPwd ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition
                           focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/70"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 font-semibold text-white
                         shadow-[0_10px_30px_-10px_rgba(139,92,246,0.6)] transition hover:from-fuchsia-400 hover:to-indigo-400
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2
                         focus-visible:ring-offset-[#0b0f1a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>

            <p className="pt-2 text-center text-sm text-white/80">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-fuchsia-300 hover:text-fuchsia-200">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
