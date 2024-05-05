"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTestSDK = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const token_1 = require("@coral-xyz/anchor/dist/cjs/utils/token");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
const token_test_1 = require("./idl/token_test");
const pda_1 = require("./pda");
/**
 * Base level class for interacting with our token contract.
 * @class
 */
class TokenTestSDK {
    constructor(provider, connection) {
        this.provider = provider;
        this.connection = connection;
        this.program = new anchor_1.Program(token_test_1.IDL, constants_1.TOKEN_TEST_ID, provider);
    }
    /**
     * create a token by initializing it's mint details  and off chain metadata details.
     *
     * 	**Note: ** Only the admin address specified when contract is deployed can call this.
     *
     * @param {string} name - name of token to create.
     * @param {string} uri - off chain metadata URI string.
     * @param {string} symbol - token symbol.
     * @param {BN} supply - How much of the token will be available for minting.
     * @param {number} decimals - token decimals. Defaults to SPLs default of 9 when not provided.
     * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
     * @throws {Error} if issues encountered when initializing the mint.
     */
    createToken(name, uri, symbol, supply, decimals) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mint = web3_js_1.Keypair.generate();
                let ix = yield this.program.methods
                    .create(new anchor_1.BN({ name, uri, symbol, supply, decimals }))
                    .accounts({
                    payer: this.provider.publicKey,
                    mint: mint.publicKey,
                    metadataAccount: (0, pda_1.findMetadataAddress)(mint.publicKey),
                    metadataProgram: constants_1.METADATA_PROGRAM_ID,
                    tokenProgram: token_1.TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                    sysvarInstruction: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
                })
                    .signers([mint])
                    .instruction();
                return ix;
            }
            catch (err) {
                throw new Error(`error initializing the mint: ${err}`);
            }
        });
    }
    /**
     * Remove mint authority of a token allowing anyone to mint more tokens.
     *
     * 	**Note: ** Only token creator can call this transaction.
     *
     * @param {PublicKey} mint - token mint address.
     * @throws {Error} if issues encountered when revoking the mint authority
     */
    revoke(mint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ix = yield this.program.methods
                    .revokeMintAuth()
                    .accounts({
                    payer: this.provider.publicKey,
                    mint,
                    tokenProgram: token_1.TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .instruction();
                return ix;
            }
            catch (err) {
                throw new Error(`error revoking mint authority: ${err}`);
            }
        });
    }
    /**
     * Mint Tokens.
     *
     * @param {PublicKey} mint - token mint address.
     * @param {amount} BN - how much of the token to mint.
     * @throws {Error} if issues encountered when minting the token.
     */
    mint(amount, mint) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.provider.publicKey) {
                throw Error("Expected public key not found");
            }
            const recipientTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, this.provider.publicKey);
            try {
                let ix = yield this.program.methods
                    .mint({ amount })
                    .accounts({
                    payer: this.provider.publicKey,
                    mint,
                    recipientTokenAccount,
                    tokenProgram: token_1.TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .instruction();
                return ix;
            }
            catch (err) {
                throw new Error(`error minting tokens: ${err}`);
            }
        });
    }
    /**
     * Transfer Tokens.
     *
     * @param {PublicKey} mint - token mint address.
     * @param {PublicKey} recipient - recipient address.
     * @param {amount} BN - amount to transfer.
     * @throws {Error} if problem arises when transferring the tokens
     */
    transfer(mint, recipient, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.provider.publicKey) {
                throw Error("Expected public key not found");
            }
            const payerTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, this.provider.publicKey);
            const recipientTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, recipient);
            try {
                let ix = yield this.program.methods
                    .transfer({ amount })
                    .accounts({
                    payer: this.provider.publicKey,
                    mint,
                    payerTokenAccount,
                    recipientTokenAccount,
                    tokenProgram: token_1.TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .instruction();
                return ix;
            }
            catch (err) {
                throw new Error(`error transferring tokens: ${err}`);
            }
        });
    }
}
exports.TokenTestSDK = TokenTestSDK;
