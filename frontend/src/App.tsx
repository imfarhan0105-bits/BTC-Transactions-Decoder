import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Loader2, Bitcoin } from 'lucide-react';
import { decodeTransaction } from './api/client';
import { TransactionView } from './components/TransactionView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { DecodedTransaction } from './types/transaction';

const SAMPLE_TX = '0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000';

function App() {
  const [rawTx, setRawTx] = useState('');
  const [decodedTx, setDecodedTx] = useState<DecodedTransaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSample = () => {
    setRawTx(SAMPLE_TX);
    setError(null);
  };

  const handleDecode = async () => {
    if (!rawTx.trim()) {
      setError('Please enter a transaction hex string');
      return;
    }

    setLoading(true);
    setError(null);
    setDecodedTx(null);

    try {
      const result = await decodeTransaction(rawTx.trim());
      setDecodedTx(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRawTx('');
    setDecodedTx(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/10 backdrop-blur-xl bg-white/5"
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30">
                <Bitcoin className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Bitcoin Transaction Decoder
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Visualize raw Bitcoin transactions byte by byte
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Section */}
        <main className="container mx-auto px-6 py-12">
          {!decodedTx && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Hero */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-block p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl border border-cyan-500/30 mb-6"
                >
                  <Scan className="w-16 h-16 text-cyan-400" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  Decode Bitcoin Transactions
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-400 max-w-2xl mx-auto"
                >
                  Paste a raw transaction hex string below to explore its structure,
                  inputs, outputs, and scripts in a visual format
                </motion.p>
              </div>

              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-500/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-300">
                    Raw Transaction Hex
                  </label>
                  <button
                    onClick={loadSample}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Load sample transaction
                  </button>
                </div>
                <textarea
                  value={rawTx}
                  onChange={(e) => setRawTx(e.target.value)}
                  placeholder="01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff..."
                  className="w-full h-40 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
                  spellCheck={false}
                />
                <div className="mt-6 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDecode}
                    disabled={!rawTx.trim()}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                  >
                    <Scan className="w-5 h-5" />
                    Decode Transaction
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {loading && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Decoding transaction...</p>
              </div>
              <LoadingSkeleton />
            </div>
          )}

          {error && (
            <ErrorDisplay
              message={error}
              onDismiss={() => setError(null)}
            />
          )}

          {decodedTx && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Decoded Transaction
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
                >
                  Decode Another
                </motion.button>
              </div>
              <TransactionView transaction={decodedTx} />
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/10 backdrop-blur-xl bg-white/5 mt-20"
        >
          <div className="container mx-auto px-6 py-8">
            <div className="text-center text-sm text-gray-500">
              <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion</p>
              <p className="mt-2">
                Backend powered by FastAPI • Data source: Bitcoin Transaction Parser
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
