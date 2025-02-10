import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/sessionSlice.js';
import { RootState } from '../redux/store.js';

function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.session.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('authenticated already');
      navigate('/search');
    }
  }, [isAuthenticated, navigate]);

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

      if (response.ok) {
        dispatch(login({ name, email }));
        navigate('/search');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
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
              onKeyDown={handleKeyDown}
            />
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
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
