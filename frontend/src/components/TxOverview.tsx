import { GlassCard } from './GlassCard';
import { FieldRow } from './FieldRow';
import type { DecodedTransaction } from '../types/transaction';
import { Hash, FileCode, Zap } from 'lucide-react';

interface TxOverviewProps {
    transaction: DecodedTransaction;
}

export function TxOverview({ transaction }: TxOverviewProps) {
    return (
        <GlassCard className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30">
                    <FileCode className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Transaction Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-xl border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-semibold text-gray-400">INPUTS</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{transaction.inputs.length}</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-semibold text-gray-400">OUTPUTS</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{transaction.outputs.length}</div>
                </div>
            </div>

            <div className="space-y-1">
                <FieldRow
                    label="Transaction ID"
                    value={transaction.txid}
                    copyable
                    monospace
                    tooltip="Double SHA256 hash of the transaction"
                />
                <FieldRow
                    label="Version"
                    value={transaction.version}
                    tooltip="Transaction version number"
                />
                <FieldRow
                    label="Locktime"
                    value={transaction.locktime}
                    tooltip="Block height or timestamp when transaction becomes valid"
                />
                <FieldRow
                    label="Size"
                    value={`${transaction.size} bytes`}
                    tooltip="Total transaction size in bytes"
                />
                <FieldRow
                    label="Virtual Size"
                    value={`${transaction.vsize} vBytes`}
                    tooltip="Virtual size (for fee calculation with SegWit)"
                />

                <div className="flex items-center justify-between gap-4 py-3">
                    <div className="flex-shrink-0 min-w-[140px]">
                        <span className="text-sm font-medium text-gray-400">SegWit</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {transaction.is_segwit ? (
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 text-sm font-semibold flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Yes
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-lg border border-gray-500/30 text-sm font-semibold">
                                No
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
