import { getBundlr } from "./get-bundlr";

/**
 * Funds a Bundlr node the specified amount.
 * Note: The currency (token) used is the currency specified when
 * creating the Bundlr object in the file `get-bundlr.js`.
 *
 * Docs: http://docs.bundlr.network/developer-docs/sdk/funding-node
 *
 * @param {*} fundAmount About to fund, value in standard units. Value will automatically
 * be coverted to atomic units.
 * @returns "Node funded" if successful or an error message.
 */
export const fundNode = async (fundAmount) => {
	try {
		// get a refernce to the WebBundlr singleton
		const bundlr = await getBundlr();

		const fundAmountAtomic = bundlr.utils.toAtomic(fundAmount);
		const tx = await bundlr.fund(fundAmountAtomic);
		return "Node funded";
	} catch (e) {
		console.log("Error on fund ", e);
		return "Error on fund: " + e;
	}
	return "";
};
