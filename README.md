# Time-Locked Payment Vault

A secure Cardano-based smart contract that allows users to deposit ADA into a vault which can only be withdrawn after a preset time, ensuring automated and safe fund releases. Ideal for salaries, grants, or milestone payments.

## 🚀 Features

- **Time-Locked Deposits**: Deposit ADA that can only be withdrawn after a specified time
- **Secure Smart Contract**: Built on Cardano blockchain using MeshJS
- **Vesper Wallet Integration**: Easy wallet connection and transaction management
- **Real-time Countdown**: Live timer showing time remaining until unlock
- **Responsive UI**: Modern, mobile-friendly interface
- **Transparent Transactions**: All operations are recorded on the blockchain

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Blockchain**: Cardano (Preprod Testnet)
- **Smart Contracts**: MeshJS SDK
- **Wallet**: Vesper Wallet integration
- **Styling**: Custom CSS with modern design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd time-locked-payment-vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Setup

1. **Install Vesper Wallet**
   - Download from [Vesper Wallet](https://vesper.finance/)
   - Create a new wallet or import existing one
   - Switch to Preprod Testnet

2. **Get Test ADA**
   - Visit [Cardano Testnet Faucet](https://testnets.cardano.org/en/testnets/cardano/tools/faucet/)
   - Request test ADA for your wallet address

### Smart Contract Configuration

The vault can be configured with different unlock times:
- **Minimum**: 1 hour
- **Maximum**: 1 year (8,760 hours)
- **Default**: 24 hours

## 💡 How It Works

### 1. Wallet Connection
- Connect your Vesper Wallet to the application
- View your current ADA balance
- Generate a unique vault address

### 2. Vault Configuration
- Set the desired unlock time (1 hour to 1 year)
- Configure vault parameters before depositing

### 3. Deposit Process
- Enter the amount of ADA to deposit
- Confirm the transaction in your wallet
- Funds are locked in the smart contract

### 4. Time Lock
- Funds remain locked until the specified time
- Real-time countdown shows remaining time
- No early withdrawal possible

### 5. Withdrawal
- Once the time lock expires, withdraw funds
- Funds are sent back to your wallet
- Transaction is recorded on the blockchain

## 🎯 Use Cases

### Salary Payments
- Automated monthly salary releases
- Prevents premature spending
- Transparent payment history

### Grant Disbursements
- Milestone-based funding releases
- Ensures proper project completion
- Reduces administrative overhead

### Escrow Services
- Secure fund holding for transactions
- Trustless payment processing
- Dispute resolution support

### Investment Lock-ups
- Prevent premature fund withdrawals
- Long-term investment commitment
- Automated release schedules

## 🔒 Security Features

- **Time-Lock Validation**: Funds cannot be withdrawn before the specified time
- **Smart Contract Security**: All logic is enforced by the blockchain
- **Transparent Operations**: All transactions are publicly verifiable
- **No Central Authority**: Decentralized and trustless operation

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to Cardano
```bash
npm run deploy
```

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop browsers
- Mobile devices
- Tablet devices
- Progressive Web App (PWA) ready

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── VaultCard.jsx      # Main vault interface
│   └── WalletConnect.jsx  # Wallet connection component
├── utils/
│   └── smartContract.js   # Smart contract logic
├── App.jsx                # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

### Key Components

#### TimeLockedVault Class
- Manages vault state and operations
- Handles time-lock validation
- Simulates blockchain interactions

#### VaultCard Component
- Displays vault status and controls
- Handles deposit/withdrawal operations
- Shows real-time countdown

#### WalletConnect Component
- Manages wallet connection
- Displays user balance and address
- Handles wallet operations

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure Vesper Wallet is installed
   - Check if wallet is unlocked
   - Verify network is set to Preprod Testnet

2. **Transaction Failed**
   - Check if you have sufficient ADA balance
   - Ensure network connection is stable
   - Verify transaction parameters

3. **Vault Not Unlocking**
   - Check if the time lock period has expired
   - Verify system clock is correct
   - Refresh the page to update status

### Getting Help

- Check the browser console for error messages
- Verify wallet connection status
- Ensure sufficient test ADA balance
- Check network connectivity

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- Multiple vault support
- Custom token support
- Advanced time-lock options
- Integration with more wallets
- Mobile app development
- Enhanced security features

---

**Built with ❤️ for the Cardano ecosystem**
