import { useState } from 'react';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      alert('Login successful');
    } catch (err) {
      setErrMsg('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f1a] text-white selection:bg-fuchsia-500/20">
      {/* blobs/auroras con blur (acentos violeta/índigo al estilo David UI) */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-28 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/30 to-slate-900/70" />

      {/* Contenedor centrado */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4">
        {/* Tarjeta glass con borde y leve glow violeta */}
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.06] p-8 backdrop-blur-2xl shadow-xl ring-1 ring-white/10 shadow-indigo-500/10">
          {/* Marca / Logo pill */}
          <div className="mx-auto mb-8 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 font-semibold text-white shadow-[0_8px_30px_-10px_rgba(139,92,246,0.65)]">
            I2Test
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold tracking-tight">
            Sign in to the platform
          </h1>
          <p className="mb-6 text-center text-sm text-white/70">
            Welcome back! Please enter your details.
          </p>

          {/* Mensaje de error accesible */}
          <div role="alert" aria-live="assertive" className="min-h-6 mb-3 text-sm text-rose-300">
            {errMsg}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition
                           focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/70"
              />
            </div>

            {/* Password con toggle */}
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="mt-1 flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/30 bg-white/10 text-fuchsia-500 focus:ring-fuchsia-400"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-fuchsia-300 hover:text-fuchsia-200">
                Forgot password?
              </a>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 font-semibold text-white
                         shadow-[0_10px_30px_-10px_rgba(139,92,246,0.6)] transition hover:from-fuchsia-400 hover:to-indigo-400
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2
                         focus-visible:ring-offset-[#0b0f1a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>

            {/* Link a registro */}
            <p className="pt-2 text-center text-sm text-white/80">
              Don’t have an account?{' '}
              <a href="/register" className="font-medium text-fuchsia-300 hover:text-fuchsia-200">
                Create one
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
