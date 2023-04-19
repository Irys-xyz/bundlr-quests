import React, { useState, useEffect } from "react";
import { upload } from "../utils/upload";
import { uploadImage } from "../utils/upload-image";
import { ContentFocus, CollectPolicyType, ReferencePolicyType, useCreatePost } from "@lens-protocol/react";
import ProfileSwitcher from "./ProfileSwitcher";

const PublicationComposer = ({ publisher }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [fileToUpload, setFileToUpload] = useState(null);
	const [fileType, setFileType] = useState();
	const [caption, setCaption] = useState("");
	const { execute: create, error, isPending } = useCreatePost({ publisher, upload });

	// Called when the user selects a file to upload
	const handleFile = async (e) => {
		const newFiles = e.target.files;
		if (newFiles.length === 0) return; // should never happen

		// only accept image/png, image/jpeg
		if (newFiles[0]["type"] !== "image/png" && newFiles[0]["type"] !== "image/jpeg") {
			return;
		}
		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Called when the user clicks "Post"
	const createPublication = async () => {
		setTxActive(true);
		setMessage("");

		if (fileToUpload) {
			// image post
			// STEP 1: Upload image
			setMessage("Uploading image ....");
			const imageUrl = await uploadImage(fileToUpload, fileType);
			// STEP 2: Create post
			setMessage("Creating image publication ....");
			try {
				await create({
					content: caption,
					contentFocus: ContentFocus.IMAGE,
					locale: "en",
					collect: {
						type: CollectPolicyType.NO_COLLECT,
					},
					reference: { type: ReferencePolicyType.FOLLOWERS_ONLY }, // only followers can interact
					media: [
						{
							url: imageUrl,
							mimeType: fileType,
						},
					],
				});
				setCaption("");
				setFileToUpload(null);
				setFileType("");
				setMessage("Publication posted.");
			} catch (e) {
				setMessage("Error on post " + e);
			}
		} else {
			setMessage("Creating text publication ....");
			// text post
			try {
				await create({
					content: caption,
					contentFocus: ContentFocus.TEXT,
					locale: "en",
					reference: { type: ReferencePolicyType.FOLLOWERS_ONLY }, // only followers can interact
				});
				setCaption("");
				setMessage("Publication posted.");
			} catch (e) {
				setMessage("Error on post " + e);
			}
		}
		setTxActive(false);
	};

	return (
		<div className="mt-5 flex flex-wrap flex-col pb-10">
			<ProfileSwitcher showCreateNew={false} />
			<div className="bg-primary px-2 mt-5 rounded-xl">
				<label className="font-main block uppercase text-xs font-bold mb-2">
					Choose a photo and click post.
				</label>
				<div className="px-2 py-2 text-sm text-white rounded-lg bg-secondary">
					{fileToUpload && <img src={URL.createObjectURL(fileToUpload)} alt="preview of publication image" />}
					<input
						className={fileToUpload ? "mt-2" : ""}
						type="file"
						onChange={handleFile}
						multiple="single"
						name="files[]"
					/>
				</div>
				<label className="font-main block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Caption
				</label>
				<input
					className="font-main w-full appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					id="name"
					type="text"
					value={caption || ""}
					onChange={(e) => setCaption(e.target.value)}
				/>

				<div className="flex flex-row justify-end w-full bg-primary pb-2">
					<span className="font-main text-message mr-5">{message}</span>
					<button
						className="font-main px-5 text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
						disabled={txActive}
						onClick={createPublication}
					>
						post
					</button>
				</div>
			</div>
		</div>
	);
};

export default PublicationComposer;
