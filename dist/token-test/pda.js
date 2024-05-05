"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMetadataAddress = void 0;
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../constants");
/**
 * find token metadata address from the mint address
 * @param {PublicKey}  mint - mint address of token.
 * @returns {PublicKey}  Public key of derived metadata address.
 * @throws {Error} if there is an error creating a listing or if the response contains an error // todo
 */
const findMetadataAddress = (mint) => {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("metadata", "utf8"),
        constants_1.METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], constants_1.METADATA_PROGRAM_ID)[0];
};
exports.findMetadataAddress = findMetadataAddress;
