import { getBundlr } from "./get-bundlr";

// called to upload metadata to Bundlr, which is then passed on to Lens
/**
 * Function to upload metadata to Bundlr. The function signature is defined
 * by Lens. The Lens React hooks automatically generate metadata, which
 * is passed to this function for upload. This function then returns an URL
 * to the uploaded metadata which is automatically posted to Lens.
 *
 * @param {*} data Data to be uploaded, JSON formatted metadata
 * @returns A URL to the recently uploaded metadata.
 */
export const upload = async (data) => {
	// Set the app id (helps keep our posts from commingling with posts from other apps).
	data.appId = "onlybundlr";

	try {
		const bundlr = await getBundlr();
		const serialized = JSON.stringify(data);

		// Only fund if needed.
		const price = await bundlr.getPrice(new Blob([serialized]).size);
		const balance = await bundlr.getLoadedBalance();

		if (price.isGreaterThanOrEqualTo(balance)) {
			console.log("Funding.");
			await bundlr.fund(price);
		} else {
			console.log("Funding not needed, balance sufficient.");
		}

		const tx = await bundlr.upload(serialized, {
			tags: [{ name: "Content-Type", value: "application/json" }],
		});

		console.log(`Upload success content URI= https://arweave.net/${tx.id}`);

		return `https://arweave.net/${tx.id}`;
	} catch (e) {
		console.log("Error on upload ", e);
	}
	return "";
};
