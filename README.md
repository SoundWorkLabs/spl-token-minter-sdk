# SDK

Typescript SDK for interacting with our Token minting smart contract

## Installation from source

_NOTE_ This is an UNPUBLISHED npm package. You have to build and install it locally from this repo

1. Clone the sdk repo

```bash
git clone
```

2. Build the NPM project and pack it into a distributable format

```bash
npm run build:ts && npm pack
```

3. Install/Add the package to your project using the relative paths

```bash
npm install <PATH TO CLONED AND BUILD SDK REPO>  # e.g. npm install ../token-test-sdk
```

## Usage

Initialization

```ts
import { TokenTestSDK } from "token-test-sdk";

// provide your anchor provider and solana connection to
const SDK = await new TokenTestSDK(provider, connection);
```

### Available Instructions

1. Create Mint details

```ts
SDK.createToken(name, uri, symbol, supply, decimals);
```

2. Revoke mint details

```ts
SDK.revoke(mint);
```

3. Mint tokens

```ts
SDK.mint(amount, mint);
```

4. transfer tokens

```ts
SDK.mint(mint, recipient, amount);
```
