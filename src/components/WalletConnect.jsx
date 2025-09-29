import React, { useState } from 'react';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';

const WalletConnect = ({ 
  isConnected, 
  userAddress, 
  balance, 
  onConnect, 
  onDisconnect, 
  onSignOut
}) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 10)}...${address.substring(address.length - 10)}`;
  };

  if (!isConnected) {
    return (
      <div className="card">
        <div className="card-title">
          <Wallet size={24} />
          Wallet Connection
        </div>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'var(--primary-50)',
          borderRadius: '12px',
          border: '1px solid var(--primary-200)'
        }}>
          <p style={{ 
            marginBottom: '1rem', 
            color: 'var(--gray-700)',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            Connect your Vesper Wallet to access vault features
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--primary-600)',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              background: 'var(--primary-500)', 
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            Secure • Fast • Reliable
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="button" onClick={onConnect} style={{ flex: '1', minWidth: '200px' }}>
            <Wallet size={20} style={{ marginRight: '8px' }} />
            Connect Vesper Wallet
          </button>
          <button className="button secondary" onClick={onSignOut} style={{ flex: '1', minWidth: '120px' }}>
            <LogOut size={20} style={{ marginRight: '8px' }} />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Wallet size={24} />
          Wallet Connected
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--success-50)',
          borderRadius: '20px',
          border: '1px solid var(--success-200)',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--success-700)'
        }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            background: 'var(--success-500)', 
            borderRadius: '50%'
          }}></div>
          Active
        </div>
      </div>
      
      <div className="vault-info">
        <div className="info-item">
          <span className="info-label">Wallet Address</span>
          <span className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <code style={{ 
              background: 'var(--gray-100)', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontFamily: 'monospace'
            }}>
              {formatAddress(userAddress)}
            </code>
            <button
              onClick={copyAddress}
              style={{
                background: 'var(--gray-100)',
                border: '1px solid var(--gray-200)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}
              title="Copy address"
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--primary-100)';
                e.target.style.borderColor = 'var(--primary-300)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--gray-100)';
                e.target.style.borderColor = 'var(--gray-200)';
              }}
            >
              {copied ? <Check size={16} color="var(--success-600)" /> : <Copy size={16} color="var(--gray-600)" />}
            </button>
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Available Balance</span>
          <span className="info-value" style={{ 
            fontSize: '1.25rem',
            color: 'var(--primary-600)',
            fontWeight: '800'
          }}>
            {balance} ADA
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button className="button secondary" onClick={onDisconnect} style={{ flex: '1', minWidth: '160px' }}>
          <LogOut size={20} style={{ marginRight: '8px' }} />
          Disconnect Wallet
        </button>
        <button className="button" onClick={onSignOut} style={{ flex: '1', minWidth: '120px' }}>
          <LogOut size={20} style={{ marginRight: '8px' }} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
