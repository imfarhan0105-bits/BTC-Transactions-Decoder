# This is a subset of all available opcodes, focused on standard transactions.

OP_CODES = {
    0x00: "OP_0",
    
    # Constants
    0x51: "OP_1",
    0x52: "OP_2",
    0x53: "OP_3",
    0x54: "OP_4",
    0x55: "OP_5",
    0x56: "OP_6",
    0x57: "OP_7",
    0x58: "OP_8",
    0x59: "OP_9",
    0x60: "OP_16",

    # Flow Control
    0x63: "OP_IF",
    0x67: "OP_ELSE",
    0x68: "OP_ENDIF",
    0x69: "OP_VERIFY",
    0x6a: "OP_RETURN",

    # Stack
    0x76: "OP_DUP",
    0x77: "OP_NIP",
    0x79: "OP_2DUP",
    0x7b: "OP_2SWAP",

    # Bitwise Logic
    0x87: "OP_EQUAL",
    0x88: "OP_EQUALVERIFY",
    
    # Arithmetic
    0x93: "OP_ADD",
    0x94: "OP_SUB",
    
    # Crypto
    0xa9: "OP_HASH160",
    0xac: "OP_CHECKSIG",
    0xae: "OP_CHECKMULTISIG",
}
