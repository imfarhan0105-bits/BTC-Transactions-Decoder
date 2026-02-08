import { FieldRow } from './FieldRow';
import type { TxOutput } from '../types/transaction';
import { Accordion } from './Accordion';
import { formatBTC, formatSatoshis } from '../lib/utils';
import { Coins } from 'lucide-react';

interface TxOutputCardProps {
    output: TxOutput;
    index: number;
}

export function TxOutputCard({ output, index }: TxOutputCardProps) {
    return (
        <Accordion
            title={`Output #${index}`}
            badge={`${formatBTC(output.value_btc)} BTC`}
            defaultOpen={index === 0}
        >
            <div className="space-y-1">
                <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
                    <Coins className="w-6 h-6 text-cyan-400" />
                    <div>
                        <div className="text-2xl font-bold text-white">
                            {formatBTC(output.value_btc)} BTC
                        </div>
                        <div className="text-sm text-gray-400">
                            {formatSatoshis(output.value)} satoshis
                        </div>
                    </div>
                </div>

                {output.type && (
                    <FieldRow
                        label="Type"
                        value={output.type}
                        tooltip="Script type (P2PKH, P2SH, P2WPKH, etc.)"
                    />
                )}

                <div className="pt-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">ScriptPubKey</h4>
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs text-gray-500 block mb-1">ASM (Human-readable)</span>
                            <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                <code className="text-xs text-gray-300 break-all font-mono">
                                    {output.script_pubkey_asm}
                                </code>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block mb-1">HEX (Raw bytes)</span>
                            <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                <code className="text-xs text-purple-300 break-all font-mono">
                                    {output.script_pubkey_hex}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Accordion>
    );
}
