import { FieldRow } from './FieldRow';
import type { TxInput } from '../types/transaction';
import { Accordion } from './Accordion';
import { shortenHash } from '../lib/utils';

interface TxInputCardProps {
    input: TxInput;
    index: number;
}

export function TxInputCard({ input, index }: TxInputCardProps) {
    return (
        <Accordion
            title={`Input #${index}`}
            badge={shortenHash(input.prev_hash, 6, 6)}
            defaultOpen={index === 0}
        >
            <div className="space-y-1">
                <FieldRow
                    label="Previous TX"
                    value={input.prev_hash}
                    copyable
                    monospace
                    tooltip="Transaction hash being spent"
                />
                <FieldRow
                    label="Output Index"
                    value={input.output_index}
                    tooltip="Which output from the previous transaction"
                />
                <FieldRow
                    label="Sequence"
                    value={`0x${input.sequence.toString(16).padStart(8, '0')}`}
                    copyable
                    monospace
                    tooltip="Sequence number (used for RBF and timelocks)"
                />

                <div className="pt-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">ScriptSig</h4>
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs text-gray-500 block mb-1">ASM (Human-readable)</span>
                            <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                <code className="text-xs text-gray-300 break-all font-mono">
                                    {input.script_sig_asm || '(empty)'}
                                </code>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block mb-1">HEX (Raw bytes)</span>
                            <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                <code className="text-xs text-purple-300 break-all font-mono">
                                    {input.script_sig_hex || '(empty)'}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                {input.witness && input.witness.length > 0 && (
                    <div className="pt-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-3">
                            Witness Data (SegWit)
                        </h4>
                        <div className="space-y-2">
                            {input.witness.map((item, i) => (
                                <div key={i}>
                                    <span className="text-xs text-gray-500 block mb-1">Item {i}</span>
                                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                                        <code className="text-xs text-green-300 break-all font-mono">
                                            {item}
                                        </code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Accordion>
    );
}
