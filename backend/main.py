import sys
import os
import binascii
from typing import List, Optional, Dict, Any

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from tx_decoder.transaction import Transaction
from tx_decoder.script import decode_script

app = FastAPI(title="Bitcoin Transaction Decoder API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DecodeRequest(BaseModel):
    raw_tx: str

class TxInputModel(BaseModel):
    prev_hash: str
    output_index: int
    script_sig_asm: str
    script_sig_hex: str
    sequence: int
    witness: Optional[List[str]] = None

class TxOutputModel(BaseModel):
    value: int
    value_btc: float
    script_pubkey_asm: str
    script_pubkey_hex: str
    type: Optional[str] = None

class TransactionModel(BaseModel):
    txid: str
    version: int
    locktime: int
    size: int
    vsize: int
    inputs: List[TxInputModel]
    outputs: List[TxOutputModel]
    is_segwit: bool

@app.post("/decode", response_model=TransactionModel)
async def decode_transaction(request: DecodeRequest):
    try:
        raw_hex = request.raw_tx.strip()
        if not raw_hex:
            raise HTTPException(status_code=400, detail="Empty transaction hex")
        
        tx = Transaction.parse(raw_hex)
        
        txid = tx.calculate_txid()
        
        # Serialize Inputs
        inputs_data = []
        for inp in tx.inputs:
            # Reconstruct script sig hex
            script_sig_hex = binascii.hexlify(inp.script_sig).decode("utf-8")
            script_sig_asm = decode_script(inp.script_sig)
            
            prev_hash_hex = binascii.hexlify(inp.prev_hash[::-1]).decode("utf-8")
            
            inputs_data.append(TxInputModel(
                prev_hash=prev_hash_hex,
                output_index=inp.output_index,
                script_sig_asm=script_sig_asm,
                script_sig_hex=script_sig_hex,
                sequence=inp.sequence
            ))

        outputs_data = []
        for out in tx.outputs:
            script_pubkey_hex = binascii.hexlify(out.script_pubkey).decode("utf-8")
            script_pubkey_asm = decode_script(out.script_pubkey)
            value_btc = out.value / 100_000_000
            
            outputs_data.append(TxOutputModel(
                value=out.value,
                value_btc=value_btc,
                script_pubkey_asm=script_pubkey_asm,
                script_pubkey_hex=script_pubkey_hex
            ))
            
        raw_bytes = binascii.unhexlify(raw_hex)
        size = len(raw_bytes)
        
        return TransactionModel(
            txid=txid,
            version=tx.version,
            locktime=tx.locktime,
            size=size,
            vsize=size,
            inputs=inputs_data,
            outputs=outputs_data,
            is_segwit=False
        )

    except binascii.Error:
        raise HTTPException(status_code=400, detail="Invalid hex format. Please provide valid hexadecimal characters only.")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid transaction format: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to decode transaction: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Bitcoin Transaction Decoder API is running"}
