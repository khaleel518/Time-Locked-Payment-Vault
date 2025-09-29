import React, { useState } from 'react';

const AuthGate = ({ onAuthenticated }) => {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Demo auth: basic client-side checks and simulate async
      await new Promise(r => setTimeout(r, 800));

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Enter a valid email');
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Persist a simple session flag (demo only)
      localStorage.setItem('auth_email', email);
      onAuthenticated({ email });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div className="card-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--gray-600)' }}>
        {mode === 'signup' 
          ? 'Join our secure platform to manage your time-locked vaults' 
          : 'Sign in to access your vault dashboard'
        }
      </div>

      {error && <div className="status error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">Email Address</label>
          <input
            type="email"
            className="input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        
        <div className="input-group">
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
        </div>
        
        {mode === 'signup' && (
          <div className="input-group">
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
        )}
        
        <button className="button" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? (
            <>
              <span className="loading"></span>
              {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
            </>
          ) : (
            mode === 'signup' ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'var(--gray-50)', 
        borderRadius: '12px',
        textAlign: 'center',
        color: 'var(--gray-600)',
        fontSize: '0.875rem'
      }}>
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signin')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-600)', 
                cursor: 'pointer', 
                padding: 0,
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            New to our platform?{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-600)', 
                cursor: 'pointer', 
                padding: 0,
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthGate;


