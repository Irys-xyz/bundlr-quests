import fileReaderStream from "filereader-stream";
import { getBundlr } from "./get-bundlr";

/**
 * Uploads an image to Bundlr.
 *
 * Docs: http://docs.bundlr.network/developer-docs/sdk/uploading-file
 *
 * @param {*} fileToUpload The file to be uploaded.
 * @param {*} fileType The mime-type of the file to be uploaded.
 * @returns
 */
export const uploadImage = async (fileToUpload, fileType) => {
	// Get a refernce to the WebBundlr singleton
	const bundlr = await getBundlr();

	try {
		// Convert to a data stream
		const dataStream = fileReaderStream(fileToUpload);
		// Get the const to upload
		const price = await bundlr.getPrice(fileToUpload.size);
		// Get the amount currently funded for this user on a Bundlr node
		const balance = await bundlr.getLoadedBalance();

		// Only fund if needed
		if (price.isGreaterThanOrEqualTo(balance)) {
			console.log("Funding node.");
			await bundlr.fund(price);
		} else {
			console.log("Funding not needed, balance sufficient.");
		}

		const tx = await bundlr.upload(dataStream, {
			tags: [{ name: "Content-Type", value: fileType }],
		});

		console.log(`File uploaded ==> https://arweave.net/${tx.id}`);

		return "https://arweave.net/" + tx.id;
	} catch (e) {
		console.log("Error on upload, ", e);
	}
};
