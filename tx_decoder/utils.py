import hashlib  #for hashing in sha256
import struct   #converts bytes to integers

class ByteReader:
    """
    A simple cursor-based reader for consuming bytes sequentially.
    Essential for parsing serialized Bitcoin data structures.
    """
    def __init__(self, data: bytes):
        self.data = data
        self.cursor = 0

    def read(self, n: int) -> bytes:
        """Read n bytes and advance the cursor."""
        if self.cursor + n > len(self.data):
             raise IndexError("Not enough bytes available to read") #raise option is like if the thing is broke, it will inform code and will stop upstream
        result = self.data[self.cursor : self.cursor + n] #sequence[start : end]

        self.cursor += n
        return result

    def read_uint8(self) -> int:
        """Read 1 byte as an unsigned integer."""
        return self.read(1)[0]

    def read_uint16_le(self) -> int:
        """Read 2 bytes as little-endian unsigned integer."""
        return struct.unpack("<H", self.read(2))[0]

    def read_uint32_le(self) -> int:
        """Read 4 bytes as little-endian unsigned integer."""
        return struct.unpack("<I", self.read(4))[0]

    def read_uint64_le(self) -> int:
        """Read 8 bytes as little-endian unsigned integer."""
        return struct.unpack("<Q", self.read(8))[0]
    
    def has_more(self) -> bool:
        """Check if there are more bytes to read."""
        return self.cursor < len(self.data)


def double_sha256(data: bytes) -> bytes:
    """
    Perform Bitcoin's standard double SHA-256 hashing.
    hash256(x) = sha256(sha256(x))
    """
    return hashlib.sha256(hashlib.sha256(data).digest()).digest()

def big_endian_to_int(data: bytes) -> int:
    """Helper to convert bytes to int (big endian)."""
    return int.from_bytes(data, byteorder='big')
