import React, { useState, useEffect } from 'react';
import WalletConnect from './components/WalletConnect';
import AuthGate from './components/AuthGate';
import VaultCard from './components/VaultCard';
import { TimeLockedVault, formatAdaAmount } from './utils/smartContract';
import { Shield, Clock, DollarSign } from 'lucide-react';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('auth_email'));
  const [userAddress, setUserAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [vault, setVault] = useState(new TimeLockedVault());
  const [unlockMonths, setUnlockMonths] = useState(0);
  const [unlockDays, setUnlockDays] = useState(0);
  const [unlockHours, setUnlockHours] = useState(0);
  const [unlockMinutes, setUnlockMinutes] = useState(0);
  const [unlockSeconds, setUnlockSeconds] = useState(10);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Initialize vault when component mounts
  useEffect(() => {
    const newVault = new TimeLockedVault();
    newVault.generateVaultAddress();
    setVault(newVault);
  }, []);

  // Connect to Vesper Wallet
  const connectWallet = async () => {
    try {
      setStatus({ type: 'info', message: 'Connecting to Vesper Wallet...' });
      
      // In a real implementation, this would connect to Vesper Wallet
      // For demo purposes, we'll simulate the connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAddress = `addr1${Math.random().toString(36).substring(2, 42)}`;
      const mockBalance = (Math.random() * 1000 + 100).toFixed(6);
      
      setUserAddress(mockAddress);
      setBalance(mockBalance);
      setIsConnected(true);
      setStatus({ type: 'success', message: 'Wallet connected successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: `Failed to connect wallet: ${error.message}` });
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setUserAddress('');
    setBalance('0');
    setStatus({ type: 'info', message: 'Wallet disconnected' });
  };

  // Sign out from app auth
  const signOut = () => {
    try {
      localStorage.removeItem('auth_email');
    } catch (_) {}
    setIsAuthenticated(false);
    if (isConnected) {
      disconnectWallet();
    }
    setStatus({ type: 'info', message: 'Signed out' });
  };

  // Set vault unlock time
  const setVaultUnlockTime = () => {
    vault.setUnlockDelayExtended(unlockMonths, unlockDays, unlockHours, unlockMinutes, unlockSeconds);
    setVault(Object.assign(Object.create(Object.getPrototypeOf(vault)), vault));
    setStatus({ 
      type: 'success', 
      message: `Vault will unlock in ${unlockMonths}mo ${unlockDays}d ${unlockHours}h ${unlockMinutes}m ${unlockSeconds}s` 
    });
  };

  // Deposit ADA to vault
  const handleDeposit = async (amount) => {
    try {
      setStatus({ type: 'info', message: 'Processing deposit...' });
      
      if (!vault.unlockTime) {
        vault.setUnlockTime(unlockHours);
      }
      
      const result = await vault.deposit(amount, userAddress);
      
      if (result.success) {
        setVault(Object.assign(Object.create(Object.getPrototypeOf(vault)), vault));
        setStatus({ 
          type: 'success', 
          message: `Successfully deposited ${amount} ADA to vault!` 
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus({ type: 'error', message: `Deposit failed: ${error.message}` });
    }
  };

  // Withdraw ADA from vault
  const handleWithdraw = async () => {
    try {
      setStatus({ type: 'info', message: 'Processing withdrawal...' });
      
      const result = await vault.withdraw(userAddress);
      
      if (result.success) {
        setVault(Object.assign(Object.create(Object.getPrototypeOf(vault)), vault));
        setStatus({ 
          type: 'success', 
          message: `Successfully withdrew ${result.amount} ADA from vault!` 
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus({ type: 'error', message: `Withdrawal failed: ${error.message}` });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Time-Locked Payment Vault</h1>
        <p className="subtitle">
          Enterprise-grade Cardano smart contract for secure, automated fund management
        </p>
      </div>

      {status.message && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}

      {!isAuthenticated ? (
        <div className="grid grid-cols-1">
          <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />
        </div>
      ) : (
        <div className="grid grid-cols-1">
          <WalletConnect
            isConnected={isConnected}
            userAddress={userAddress}
            balance={balance}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
            onSignOut={signOut}
          />
        </div>
      )}

      {isAuthenticated && isConnected && (
        <div className="grid grid-cols-1">
          <div className="card vault-config">
            <div className="card-title">
              <Clock size={24} />
              Configure Vault Settings
            </div>
            <div className="input-group">
              <label className="label">Unlock Time Configuration</label>
              <div className="grid grid-cols-5" style={{ gap: '1rem' }}>
                <div>
                  <label className="label" style={{ marginBottom: '0.5rem' }}>Months</label>
                  <select
                    className="input"
                    value={unlockMonths}
                    onChange={(e) => setUnlockMonths(Math.max(0, parseInt(e.target.value) || 0))}
                    aria-label="Months"
                  >
                    <option value={0}>0 - None</option>
                    <option value={1}>January (1)</option>
                    <option value={2}>February (2)</option>
                    <option value={3}>March (3)</option>
                    <option value={4}>April (4)</option>
                    <option value={5}>May (5)</option>
                    <option value={6}>June (6)</option>
                    <option value={7}>July (7)</option>
                    <option value={8}>August (8)</option>
                    <option value={9}>September (9)</option>
                    <option value={10}>October (10)</option>
                    <option value={11}>November (11)</option>
                    <option value={12}>December (12)</option>
                  </select>
                </div>
                <div>
                  <label className="label" style={{ marginBottom: '0.5rem' }}>Days</label>
                  <input
                    type="number"
                    className="input"
                    value={unlockDays}
                    onChange={(e) => setUnlockDays(Math.max(0, parseInt(e.target.value) || 0))}
                    min="0"
                    max="365"
                    placeholder="Days"
                  />
                </div>
                <div>
                  <label className="label" style={{ marginBottom: '0.5rem' }}>Hours</label>
                  <input
                    type="number"
                    className="input"
                    value={unlockHours}
                    onChange={(e) => setUnlockHours(Math.max(0, parseInt(e.target.value) || 0))}
                    min="0"
                    max="8760"
                    placeholder="Hours"
                  />
                </div>
                <div>
                  <label className="label" style={{ marginBottom: '0.5rem' }}>Minutes</label>
                  <input
                    type="number"
                    className="input"
                    value={unlockMinutes}
                    onChange={(e) => setUnlockMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    min="0"
                    max="59"
                    placeholder="Minutes"
                  />
                </div>
                <div>
                  <label className="label" style={{ marginBottom: '0.5rem' }}>Seconds</label>
                  <input
                    type="number"
                    className="input"
                    value={unlockSeconds}
                    onChange={(e) => setUnlockSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    min="0"
                    max="59"
                    placeholder="Seconds"
                  />
                </div>
              </div>
            </div>
            <button 
              className="button primary" 
              onClick={setVaultUnlockTime}
              disabled={vault.getVaultStatus().depositedAmount > 0}
              style={{
                marginTop: '1.5rem',
                fontSize: '1.125rem',
                padding: '1rem 2rem',
                fontWeight: '700',
                letterSpacing: '0.025em',
                textTransform: 'uppercase',
                background: vault.getVaultStatus().depositedAmount > 0 
                  ? 'var(--gray-300)' 
                  : 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                boxShadow: vault.getVaultStatus().depositedAmount > 0 
                  ? 'none' 
                  : '0 4px 14px rgba(14, 165, 233, 0.3)'
              }}
            >
              <Clock size={20} style={{ marginRight: '0.75rem' }} />
              {vault.getVaultStatus().depositedAmount > 0 ? 'Time Already Set' : 'Set Unlock Time'}
            </button>
          </div>

          <VaultCard
            vault={vault}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            isConnected={isConnected}
            userAddress={userAddress}
          />
        </div>
      )}

      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-title">
            <Shield size={24} />
            How It Works
          </div>
          <div style={{ lineHeight: '1.7', color: 'var(--gray-600)' }}>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--primary-600)' }}>1. Connect Wallet:</strong> Link your Vesper Wallet to interact with the vault
            </div>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--primary-600)' }}>2. Set Unlock Time:</strong> Configure how long funds should be locked (1 hour to 1 year)
            </div>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--primary-600)' }}>3. Deposit ADA:</strong> Send your ADA to the time-locked vault contract
            </div>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--primary-600)' }}>4. Wait for Unlock:</strong> Funds remain locked until the specified time
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--primary-600)' }}>5. Withdraw:</strong> Once unlocked, withdraw your ADA to your wallet
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <DollarSign size={24} />
            Use Cases
          </div>
          <div style={{ lineHeight: '1.7', color: 'var(--gray-600)' }}>
            <div style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--success-50)', borderRadius: '8px', border: '1px solid var(--success-200)' }}>
              <strong style={{ color: 'var(--success-700)' }}>Salary Payments:</strong> Automated monthly salary releases
            </div>
            <div style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--warning-50)', borderRadius: '8px', border: '1px solid var(--warning-200)' }}>
              <strong style={{ color: 'var(--warning-700)' }}>Grant Disbursements:</strong> Milestone-based funding releases
            </div>
            <div style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--primary-50)', borderRadius: '8px', border: '1px solid var(--primary-200)' }}>
              <strong style={{ color: 'var(--primary-700)' }}>Escrow Services:</strong> Secure fund holding for transactions
            </div>
            <div style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
              <strong style={{ color: 'var(--gray-700)' }}>Investment Lock-ups:</strong> Prevent premature fund withdrawals
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--error-50)', borderRadius: '8px', border: '1px solid var(--error-200)' }}>
              <strong style={{ color: 'var(--error-700)' }}>Trustless Payments:</strong> Transparent, tamper-proof transactions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
