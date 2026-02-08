from .utils import ByteReader
import struct

def read_varint(reader: ByteReader) -> int:
    """
    Read a Variable Length Integer (VarInt) from the ByteReader.
    
    Structure:
    - < 0xFD:       1 byte uint8
    -   0xFD:       0xFD followed by 2 bytes uint16_le
    -   0xFE:       0xFE followed by 4 bytes uint32_le
    -   0xFF:       0xFF followed by 8 bytes uint64_le
    """
    first_byte = reader.read_uint8()
    
    if first_byte < 0xfd:
        return first_byte
    elif first_byte == 0xfd:
        return reader.read_uint16_le()
    elif first_byte == 0xfe:
        return reader.read_uint32_le()
    elif first_byte == 0xff:
        return reader.read_uint64_le()
    else:
        raise ValueError(f"Unknown VarInt prefix: {first_byte}")

def encode_varint(i: int) -> bytes:
    """Encode an integer as a Bitcoin VarInt."""
    if i < 0xfd:
        return bytes([i])
    elif i <= 0xffff:
        return b'\xfd' + struct.pack("<H", i)
    elif i <= 0xffffffff:
        return b'\xfe' + struct.pack("<I", i)
    else:
        return b'\xff' + struct.pack("<Q", i)
