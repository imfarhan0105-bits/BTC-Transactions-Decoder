import struct
import binascii
from typing import List

from .utils import ByteReader, double_sha256
from .varint import read_varint, encode_varint
from .script import decode_script

class TxInput:
    """Represents a Transaction Input (vin)."""
    def __init__(self, prev_hash: bytes, output_index: int, script_sig: bytes, sequence: int):
        self.prev_hash = prev_hash      # 32 bytes
        self.output_index = output_index # 4 bytes
        self.script_sig = script_sig    # Variable length
        self.sequence = sequence        # 4 bytes

    def serialize(self) -> bytes:
        """Serializes the input based on Bitcoin protocol."""
        res = b""
        res += self.prev_hash
        res += struct.pack("<I", self.output_index)
        res += encode_varint(len(self.script_sig))
        res += self.script_sig
        res += struct.pack("<I", self.sequence)
        return res

    def __str__(self):
        # prev_hash is typically displayed in RPC as big-endian hex (reversed)
        prev_hash_hex = binascii.hexlify(self.prev_hash[::-1]).decode("utf-8")
        script_decoded = decode_script(self.script_sig)
        return (
            f"    - Previous Hash: {prev_hash_hex}\n"
            f"    - Output Index:  {self.output_index}\n"
            f"    - ScriptSig:     {binascii.hexlify(self.script_sig).decode('utf-8')}\n"
            f"      (Decoded):     {script_decoded}\n"
            f"    - Sequence:      0x{self.sequence:08x}"
        )

class TxOutput:
    """Represents a Transaction Output (vout)."""
    def __init__(self, value: int, script_pubkey: bytes):
        self.value = value              # 8 bytes (satoshis)
        self.script_pubkey = script_pubkey # Variable length

    def serialize(self) -> bytes:
        """Serializes the output based on Bitcoin protocol."""
        res = b""
        res += struct.pack("<Q", self.value)
        res += encode_varint(len(self.script_pubkey))
        res += self.script_pubkey
        return res

    def __str__(self):
        script_decoded = decode_script(self.script_pubkey)
        btc_value = self.value / 100_000_000
        return (
            f"    - Value:         {self.value} sats ({btc_value:.8f} BTC)\n"
            f"    - ScriptPubKey:  {binascii.hexlify(self.script_pubkey).decode('utf-8')}\n"
            f"      (Decoded):     {script_decoded}"
        )

class Transaction:
    """Represents a Bitcoin Transaction."""
    def __init__(self, version: int, inputs: List[TxInput], outputs: List[TxOutput], locktime: int):
        self.version = version
        self.inputs = inputs
        self.outputs = outputs
        self.locktime = locktime

    @classmethod
    def parse(cls, hex_str: str) -> "Transaction":
        """Parses a transaction from a hex string."""
        raw = binascii.unhexlify(hex_str)
        reader = ByteReader(raw)

        # 1. Version (4 bytes)
        version = reader.read_uint32_le()

        # 2. Inputs
        input_count = read_varint(reader)
        inputs = []
        for _ in range(input_count):
            prev_hash = reader.read(32)
            output_index = reader.read_uint32_le()
            
            script_len = read_varint(reader)
            script_sig = reader.read(script_len)
            
            sequence = reader.read_uint32_le()
            inputs.append(TxInput(prev_hash, output_index, script_sig, sequence))

        # 3. Outputs
        output_count = read_varint(reader)
        outputs = []
        for _ in range(output_count):
            value = reader.read_uint64_le()
            script_len = read_varint(reader)
            script_pubkey = reader.read(script_len)
            outputs.append(TxOutput(value, script_pubkey))

        # 4. Locktime (4 bytes)
        locktime = reader.read_uint32_le()

        if reader.has_more():
            print("Warning: Extra bytes found at end of transaction!")

        return cls(version, inputs, outputs, locktime)

    def serialize(self) -> bytes:
        """Serializes the transaction back to raw bytes."""
        res = b""
        res += struct.pack("<I", self.version)
        res += encode_varint(len(self.inputs))
        for inp in self.inputs:
            res += inp.serialize()
        res += encode_varint(len(self.outputs))
        for out in self.outputs:
            res += out.serialize()
        res += struct.pack("<I", self.locktime)
        return res

    def calculate_txid(self) -> str:
        """Calculates the TXID (Hash of the transaction)."""
        raw = self.serialize()
        # TXID is usually displayed Little-Endian (reversed byte order of the double SHA-256)
        txid_bytes = double_sha256(raw)
        return binascii.hexlify(txid_bytes[::-1]).decode("utf-8")

    def __str__(self):
        txid = self.calculate_txid()
        lines = []
        lines.append("="*60)
        lines.append(f"Bitcoin Transaction Decoder")
        lines.append(f"TXID: {txid}")
        lines.append("="*60)
        lines.append(f"Version:  {self.version}")
        lines.append(f"Locktime: {self.locktime}")
        lines.append("-" * 30)
        lines.append(f"Inputs: {len(self.inputs)}")
        for idx, inp in enumerate(self.inputs):
            lines.append(f"Input #{idx}")
            lines.append(str(inp))
        lines.append("-" * 30)
        lines.append(f"Outputs: {len(self.outputs)}")
        for idx, out in enumerate(self.outputs):
            lines.append(f"Output #{idx}")
            lines.append(str(out))
        lines.append("="*60)
        return "\n".join(lines)
