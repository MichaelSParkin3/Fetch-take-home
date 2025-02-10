import { useState } from 'react';
import { BASE_URL } from '../utils/constants.js';

function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) {
        throw new Error('Login failed. Check credentials.');
      }

      alert('Login successful!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen min-w-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="fieldset-label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              className="btn btn-neutral mt-4"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Login;
