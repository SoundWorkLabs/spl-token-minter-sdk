import { BN, Provider } from "@coral-xyz/anchor";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
/**
 * Base level class for interacting with our token contract.
 * @class
 */
export declare class TokenTestSDK {
    /** anchor provider of the person calling our sdk */
    private provider;
    /** Our anchor program helper */
    private program;
    /** The connection object from Solana's web3.js SDK */
    readonly connection: Connection;
    constructor(provider: Provider, connection: Connection);
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
    createToken(name: string, uri: string, symbol: string, supply: BN, decimals: number): Promise<TransactionInstruction>;
    /**
     * Remove mint authority of a token allowing anyone to mint more tokens.
     *
     * 	**Note: ** Only token creator can call this transaction.
     *
     * @param {PublicKey} mint - token mint address.
     * @throws {Error} if issues encountered when revoking the mint authority
     */
    revoke(mint: PublicKey): Promise<TransactionInstruction>;
    /**
     * Mint Tokens.
     *
     * @param {PublicKey} mint - token mint address.
     * @param {amount} BN - how much of the token to mint.
     * @throws {Error} if issues encountered when minting the token.
     */
    mint(amount: BN, mint: PublicKey): Promise<TransactionInstruction>;
    /**
     * Transfer Tokens.
     *
     * @param {PublicKey} mint - token mint address.
     * @param {PublicKey} recipient - recipient address.
     * @param {amount} BN - amount to transfer.
     * @throws {Error} if problem arises when transferring the tokens
     */
    transfer(mint: PublicKey, recipient: PublicKey, amount: BN): Promise<TransactionInstruction>;
}
