import { PublicKey } from "@solana/web3.js";
/**
 * find token metadata address from the mint address
 * @param {PublicKey}  mint - mint address of token.
 * @returns {PublicKey}  Public key of derived metadata address.
 * @throws {Error} if there is an error creating a listing or if the response contains an error // todo
 */
export declare const findMetadataAddress: (mint: PublicKey) => PublicKey;
