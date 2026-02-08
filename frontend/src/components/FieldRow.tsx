import { CopyButton } from './CopyButton';
import { cn } from '../lib/utils';

interface FieldRowProps {
    label: string;
    value: string | number;
    copyable?: boolean;
    monospace?: boolean;
    tooltip?: string;
}

export function FieldRow({ label, value, copyable = false, monospace = false, tooltip }: FieldRowProps) {
    const valueStr = typeof value === 'number' ? value.toString() : value;

    return (
        <div className="flex items-start justify-between gap-4 py-3 border-b border-white/5 last:border-0">
            <div className="flex-shrink-0 min-w-[140px]">
                <span className="text-sm font-medium text-gray-400" title={tooltip}>
                    {label}
                </span>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <span
                    className={cn(
                        'text-sm text-gray-200 break-all',
                        monospace && 'font-mono'
                    )}
                >
                    {valueStr}
                </span>
                {copyable && <CopyButton text={valueStr} />}
            </div>
        </div>
    );
}
