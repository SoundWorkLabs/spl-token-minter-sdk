import { BN, Program, Provider } from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	SYSVAR_INSTRUCTIONS_PUBKEY,
	TransactionInstruction,
} from "@solana/web3.js";
import { METADATA_PROGRAM_ID, TOKEN_TEST_ID } from "../constants";
import { TokenTest, IDL as tokenTestIDL } from "./idl/token_test";
import { findMetadataAddress } from "./pda";

/**
 * Base level class for interacting with our token contract.
 * @class
 */
export class TokenTestSDK {
	/** anchor provider of the person calling our sdk */
	private provider!: Provider;
	/** Our anchor program helper */
	private program: Program<typeof tokenTestIDL>;
	/** The connection object from Solana's web3.js SDK */
	public readonly connection: Connection;

	constructor(provider: Provider, connection: Connection) {
		this.provider = provider;
		this.connection = connection;

		this.program = new Program<TokenTest>(
			tokenTestIDL,
			TOKEN_TEST_ID,
			provider
		);
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
	public async createToken(
		name: string,
		uri: string,
		symbol: string,
		supply: BN,
		decimals: number
	) {
		try {
			const mint = Keypair.generate();

			let ix = await this.program.methods
				.create(new BN({ name, uri, symbol, supply, decimals }))
				.accounts({
					payer: this.provider.publicKey,
					mint: mint.publicKey,
					metadataAccount: findMetadataAddress(mint.publicKey),
					metadataProgram: METADATA_PROGRAM_ID,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: SystemProgram.programId,
					sysvarInstruction: SYSVAR_INSTRUCTIONS_PUBKEY,
				})
				.signers([mint])
				.instruction();

			return ix;
		} catch (err) {
			throw new Error(`error initializing the mint: ${err}`);
		}
	}

	/**
	 * Remove mint authority of a token allowing anyone to mint more tokens.
	 *
	 * 	**Note: ** Only token creator can call this transaction.
	 *
	 * @param {PublicKey} mint - token mint address.
	 * @throws {Error} if issues encountered when revoking the mint authority
	 */
	public async revoke(mint: PublicKey): Promise<TransactionInstruction> {
		try {
			let ix = await this.program.methods
				.revokeMintAuth()
				.accounts({
					payer: this.provider.publicKey,
					mint,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: SystemProgram.programId,
				})
				.instruction();

			return ix;
		} catch (err) {
			throw new Error(`error revoking mint authority: ${err}`);
		}
	}

	/**
	 * Mint Tokens.
	 *
	 * @param {PublicKey} mint - token mint address.
	 * @param {amount} BN - how much of the token to mint.
	 * @throws {Error} if issues encountered when minting the token.
	 */
	public async mint(
		amount: BN,
		mint: PublicKey
	): Promise<TransactionInstruction> {
		if (!this.provider.publicKey) {
			throw Error("Expected public key not found");
		}

		const recipientTokenAccount = getAssociatedTokenAddressSync(
			mint,
			this.provider.publicKey
		);

		try {
			let ix = await this.program.methods
				.mint({ amount })
				.accounts({
					payer: this.provider.publicKey,
					mint,
					recipientTokenAccount,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: SystemProgram.programId,
				})
				.instruction();

			return ix;
		} catch (err) {
			throw new Error(`error minting tokens: ${err}`);
		}
	}

	/**
	 * Transfer Tokens.
	 *
	 * @param {PublicKey} mint - token mint address.
	 * @param {PublicKey} recipient - recipient address.
	 * @param {amount} BN - amount to transfer.
	 * @throws {Error} if problem arises when transferring the tokens
	 */
	public async transfer(
		mint: PublicKey,
		recipient: PublicKey,
		amount: BN
	): Promise<TransactionInstruction> {
		if (!this.provider.publicKey) {
			throw Error("Expected public key not found");
		}

		const payerTokenAccount = getAssociatedTokenAddressSync(
			mint,
			this.provider.publicKey
		);

		const recipientTokenAccount = getAssociatedTokenAddressSync(
			mint,
			recipient
		);

		try {
			let ix = await this.program.methods
				.transfer({ amount })
				.accounts({
					payer: this.provider.publicKey,
					mint,
					payerTokenAccount,
					recipientTokenAccount,
					tokenProgram: TOKEN_PROGRAM_ID,
					systemProgram: SystemProgram.programId,
				})
				.instruction();

			return ix;
		} catch (err) {
			throw new Error(`error transferring tokens: ${err}`);
		}
	}
}
