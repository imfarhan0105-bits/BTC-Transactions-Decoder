import { TxInputCard } from './TxInputCard';
import { TxOutputCard } from './TxOutputCard';
import { TxOverview } from './TxOverview';
import type { DecodedTransaction } from '../types/transaction';
import { GlassCard } from './GlassCard';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface TransactionViewProps {
    transaction: DecodedTransaction;
}

export function TransactionView({ transaction }: TransactionViewProps) {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Overview Section */}
            <TxOverview transaction={transaction} />

            {/* Inputs Section */}
            <GlassCard className="space-y-4" delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                        <ArrowDownCircle className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Inputs</h2>
                        <p className="text-sm text-gray-400">
                            Bitcoin being spent from previous transactions
                        </p>
                    </div>
                </div>
                <div className="space-y-3">
                    {transaction.inputs.map((input, index) => (
                        <TxInputCard key={index} input={input} index={index} />
                    ))}
                </div>
            </GlassCard>

            {/* Outputs Section */}
            <GlassCard className="space-y-4" delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30">
                        <ArrowUpCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Outputs</h2>
                        <p className="text-sm text-gray-400">
                            New UTXOs created by this transaction
                        </p>
                    </div>
                </div>
                <div className="space-y-3">
                    {transaction.outputs.map((output, index) => (
                        <TxOutputCard key={index} output={output} index={index} />
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
