export interface TxInput {
    prev_hash: string;
    output_index: number;
    script_sig_asm: string;
    script_sig_hex: string;
    sequence: number;
    witness?: string[] | null;
}

export interface TxOutput {
    value: number; // satoshis
    value_btc: number;
    script_pubkey_asm: string;
    script_pubkey_hex: string;
    type?: string | null;
}

export interface DecodedTransaction {
    txid: string;
    version: number;
    locktime: number;
    size: number;
    vsize: number;
    inputs: TxInput[];
    outputs: TxOutput[];
    is_segwit: boolean;
}

export interface DecodeRequest {
    raw_tx: string;
}

export interface ApiError {
    detail: string;
}
