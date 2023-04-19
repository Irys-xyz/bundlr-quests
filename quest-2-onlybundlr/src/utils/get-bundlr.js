import { WebBundlr } from "@bundlr-network/client";
import { ethers } from "ethers";

/**
 * Creates a new Bundlr object that will then be used by other
 * utility functions. This is where you set your node address and currency.
 *
 * Docs: http://docs.bundlr.network/developer-docs/sdk/connecting-node
 *
 * @returns A reference to a Bundlr object
 */
export const getBundlr = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider);
	await bundlr.ready();
	return bundlr;
};
