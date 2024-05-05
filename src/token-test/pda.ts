import { PublicKey } from "@solana/web3.js";
import { METADATA_PROGRAM_ID } from "../constants";

/**
 * find token metadata address from the mint address
 * @param {PublicKey}  mint - mint address of token.
 * @returns {PublicKey}  Public key of derived metadata address.
 * @throws {Error} if there is an error creating a listing or if the response contains an error // todo
 */
export const findMetadataAddress = (mint: PublicKey): PublicKey => {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from("metadata", "utf8"),
			METADATA_PROGRAM_ID.toBuffer(),
			mint.toBuffer(),
		],
		METADATA_PROGRAM_ID
	)[0];
};
