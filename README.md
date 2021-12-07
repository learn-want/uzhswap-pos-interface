# UZHSwap Interface 

This forked repository is part of the UZHSwap project for the Seminar Blockchain Programming at the University of Zurich in the Fall semester of 2021.

The description for the actual Uniswap interface README content is appended in this file.
To run and try out UZHSwap yourself, please follow the instructions in the  [CONTRIBUTING](./CONTRIBUTING.md) file.

***For Windows Users:***
In case of a problem with running the application locally on your machine while using windows, you might want to run it using the *Windows Subsystem for Linux (WSL)*. 
Further instructions on running and installing *WSL* can be found on the web. Here are a few example sources:
 - [Install WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
 -  [How to install WSL](https://www.windowscentral.com/install-windows-subsystem-linux-windows-10)


### Deployed UZHSwap

The UZHSwap interface is deployed with [Netlify](https://www.netlify.com/) and can be accessed via [this link](https://uzhswap.netlify.app/#/swap) go and try it out! 

<p align="center">
  <img src="https://gateway.pinata.cloud/ipfs/QmQRBFLwwtnyyeYSTpe8UMRagyC6Zj6ia6wJS2R41Bfnkg" />
</p>


 ---
## Uniswap Interface

[![Unit Tests](https://github.com/Uniswap/uniswap-interface/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions/workflows/unit-tests.yaml)
[![Integration Tests](https://github.com/Uniswap/uniswap-interface/actions/workflows/integration-tests.yaml/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions/workflows/integration-tests.yaml)
[![Lint](https://github.com/Uniswap/uniswap-interface/actions/workflows/lint.yml/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions/workflows/lint.yml)
[![Release](https://github.com/Uniswap/uniswap-interface/actions/workflows/release.yaml/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions/workflows/release.yaml)
[![Crowdin](https://badges.crowdin.net/uniswap-interface/localized.svg)](https://crowdin.com/project/uniswap-interface)

An open source interface for Uniswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [uniswap.org](https://uniswap.org/)
- Interface: [app.uniswap.org](https://app.uniswap.org)
- Docs: [uniswap.org/docs/](https://uniswap.org/docs/)
- Twitter: [@Uniswap](https://twitter.com/Uniswap)
- Reddit: [/r/Uniswap](https://www.reddit.com/r/Uniswap/)
- Email: [contact@uniswap.org](mailto:contact@uniswap.org)
- Discord: [Uniswap](https://discord.gg/FCfyBSbCU5)
- Whitepapers:
  - [V1](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)
  - [V2](https://uniswap.org/whitepaper.pdf)
  - [V3](https://uniswap.org/whitepaper-v3.pdf)

### Accessing the Uniswap Interface

To access the Uniswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Uniswap/uniswap-interface/releases/latest),
or visit [app.uniswap.org](https://app.uniswap.org).

### Unsupported tokens

Check out `useUnsupportedTokenList()` in [src/state/lists/hooks.ts](./src/state/lists/hooks.ts) for blocking tokens in your instance of the interface.

You can block an entire list of tokens by passing in a tokenlist like [here](./src/constants/lists.ts) or you can block specific tokens by adding them to [unsupported.tokenlist.json](./src/constants/tokenLists/unsupported.tokenlist.json).

### Contributions

For steps on local deployment, development, and code contribution, please see [CONTRIBUTING](./CONTRIBUTING.md).

### Accessing Uniswap V2

The Uniswap Interface supports swapping, adding liquidity, removing liquidity and migrating liquidity for Uniswap protocol V2.

- Swap on Uniswap V2: https://app.uniswap.org/#/swap?use=v2
- View V2 liquidity: https://app.uniswap.org/#/pool/v2
- Add V2 liquidity: https://app.uniswap.org/#/add/v2
- Migrate V2 liquidity to V3: https://app.uniswap.org/#/migrate/v2

### Accessing Uniswap V1

The Uniswap V1 interface for mainnet and testnets is accessible via IPFS gateways
linked from the [v1.0.0 release](https://github.com/Uniswap/uniswap-interface/releases/tag/v1.0.0).
