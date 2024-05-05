export type TokenTest = {
    "version": "0.1.0";
    "name": "token_test";
    "constants": [
        {
            "name": "ADMIN_ADDRESS";
            "type": "publicKey";
            "value": "pubkey ! (\"4kg8oh3jdNtn7j2wcS7TrUua31AgbLzDVkBZgTAe44aF\")";
        }
    ];
    "instructions": [
        {
            "name": "create";
            "accounts": [
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "mint";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "metadataAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "metadataProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "sysvarInstruction";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "args";
                    "type": {
                        "defined": "CreateTokenArgs";
                    };
                }
            ];
        },
        {
            "name": "mint";
            "accounts": [
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "mint";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "recipientTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "associatedTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "args";
                    "type": {
                        "defined": "MintTokenArgs";
                    };
                }
            ];
        },
        {
            "name": "transfer";
            "accounts": [
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "mint";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "payerTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "recipientTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "associatedTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "args";
                    "type": {
                        "defined": "TransferTokenArgs";
                    };
                }
            ];
        },
        {
            "name": "revokeMintAuth";
            "accounts": [
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "mint";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "payerTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        }
    ];
    "types": [
        {
            "name": "CreateTokenArgs";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "name";
                        "docs": [
                            "The name/title of your token."
                        ];
                        "type": "string";
                    },
                    {
                        "name": "symbol";
                        "docs": [
                            "The symbol for your token. Optional, Defaults to none when not argument is passed."
                        ];
                        "type": {
                            "option": "string";
                        };
                    },
                    {
                        "name": "uri";
                        "docs": [
                            "Off-chain Metadata URI string"
                        ];
                        "type": "string";
                    },
                    {
                        "name": "decimals";
                        "docs": [
                            "no. of the decimals for the program."
                        ];
                        "type": "u8";
                    },
                    {
                        "name": "supply";
                        "type": "u64";
                    }
                ];
            };
        },
        {
            "name": "MintTokenArgs";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "amount";
                        "docs": [
                            "How much of the token do you want to mint"
                        ];
                        "type": "u64";
                    }
                ];
            };
        },
        {
            "name": "TransferTokenArgs";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "amount";
                        "docs": [
                            "How much of the token do you want to transfer"
                        ];
                        "type": "u64";
                    }
                ];
            };
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "CustomError";
            "msg": "Custom error message";
        }
    ];
};
export declare const IDL: TokenTest;
