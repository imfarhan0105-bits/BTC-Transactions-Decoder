from .utils import ByteReader
from .constants import OP_CODES

def decode_script(script_bytes: bytes) -> str:
    """
    Decodes a raw script into human-readable opcodes and data pushes.
    Does NOT execute the script.
    """
    if not script_bytes:
        return "<empty>"

    reader = ByteReader(script_bytes)
    result = []

    while reader.has_more():
        try:
            opcode = reader.read_uint8()
            
            # 1. Handle Data Pushes (0x01 to 0x4b) -> Push next N bytes
            if 0x01 <= opcode <= 0x4b:
                n_bytes = opcode
                data = reader.read(n_bytes)
                result.append(f"PUSHDATA({n_bytes}) 0x{data.hex()}")
                
            # 2. Handle OP_PUSHDATAx (0x4c, 0x4d, 0x4e)
            elif opcode == 0x4c:
                n_bytes = reader.read_uint8()
                data = reader.read(n_bytes)
                result.append(f"OP_PUSHDATA1({n_bytes}) 0x{data.hex()}")
            elif opcode == 0x4d:
                n_bytes = reader.read_uint16_le()
                data = reader.read(n_bytes)
                result.append(f"OP_PUSHDATA2({n_bytes}) 0x{data.hex()}")
            elif opcode == 0x4e:
                n_bytes = reader.read_uint32_le()
                data = reader.read(n_bytes)
                result.append(f"OP_PUSHDATA4({n_bytes}) 0x{data.hex()}")
                
            # 3. Normal Opcodes
            else:
                op_name = OP_CODES.get(opcode, f"OP_UNKNOWN_0x{opcode:02x}")
                result.append(op_name)
        except IndexError:
             result.append("[Error: Script truncated]")
             break

    return " ".join(result)
