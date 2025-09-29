import React, { useState, useEffect } from 'react';
import { Clock, Lock, Unlock, ArrowDown, ArrowUp } from 'lucide-react';

const VaultCard = ({ vault, onDeposit, onWithdraw, isConnected, userAddress }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Update time remaining every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(vault.formatTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [vault]);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsDepositing(true);
    try {
      await onDeposit(parseFloat(depositAmount));
      setDepositAmount('');
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsDepositing(false);
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      await onWithdraw();
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const vaultStatus = vault.getVaultStatus();

  return (
    <div className="card">
      <div className="card-title">
        {vaultStatus.isUnlocked ? <Unlock size={24} /> : <Lock size={24} />}
        Time-Locked Vault
      </div>

      <div className="vault-info">
        <div className="info-item">
          <span className="info-label">Vault Address:</span>
          <span className="info-value">{vaultStatus.address || 'Not created'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Deposited Amount:</span>
          <span className="info-value">{vaultStatus.depositedAmount} ADA</span>
        </div>
        <div className="info-item">
          <span className="info-label">Status:</span>
          <span className="info-value">
            {vaultStatus.isUnlocked ? 'Unlocked' : 'Locked'}
          </span>
        </div>
        {vaultStatus.depositor && (
          <div className="info-item">
            <span className="info-label">Depositor:</span>
            <span className="info-value">
              {vaultStatus.depositor.substring(0, 20)}...
            </span>
          </div>
        )}
      </div>

      {!vaultStatus.isUnlocked && vaultStatus.timeRemaining > 0 && (
        <div className="countdown">
          <Clock size={20} style={{ marginRight: '8px' }} />
          Time remaining: {timeRemaining}
        </div>
      )}

      {!isConnected ? (
        <div className="wallet-connect">
          <h3>Connect your wallet to interact with the vault</h3>
        </div>
      ) : (
        <>
          {vaultStatus.depositedAmount === 0 ? (
            <div>
              <div className="input-group">
                <label className="label">Deposit Amount (ADA)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter amount to deposit"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              <button
                className="button"
                onClick={handleDeposit}
                disabled={isDepositing || !depositAmount}
              >
                {isDepositing ? (
                  <>
                    <span className="loading"></span>
                    Depositing...
                  </>
                ) : (
                  <>
                    <ArrowDown size={20} style={{ marginRight: '8px' }} />
                    Deposit ADA
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              <div className="status info">
                Vault contains {vaultStatus.depositedAmount} ADA
                {!vaultStatus.isUnlocked && (
                  <div style={{ marginTop: '10px' }}>
                    Funds will be available for withdrawal in: {timeRemaining}
                  </div>
                )}
              </div>
              
              {vaultStatus.isUnlocked && (
                <button
                  className="button"
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                >
                  {isWithdrawing ? (
                    <>
                      <span className="loading"></span>
                      Withdrawing...
                    </>
                  ) : (
                    <>
                      <ArrowUp size={20} style={{ marginRight: '8px' }} />
                      Withdraw ADA
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VaultCard;
