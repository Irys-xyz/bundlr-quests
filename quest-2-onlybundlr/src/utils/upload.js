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
	// BUILDOOOORS: Complete This
};
