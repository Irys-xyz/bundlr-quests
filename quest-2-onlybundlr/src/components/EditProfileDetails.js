import React, { useState, useEffect } from "react";
import { upload } from "../utils/upload";
import { uploadImage } from "../utils/upload-image";

import {
	Amount,
	useUpdateProfileDetails,
	useUpdateFollowPolicy,
	useCurrencies,
	FollowPolicyType,
} from "@lens-protocol/react";

const EditProfileDetails = ({ profile }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [name, setName] = useState("");
	const [bio, setBio] = useState("  ");
	const [followFee, setFollowFee] = useState(0);
	const [chargeCurrency, setChargeCurrency] = useState(0);
	const [fileToUpload, setFileToUpload] = useState();
	const [fileType, setFileType] = useState();
	const { data: currencies, error: currenciesError, loading: currenciesLoading } = useCurrencies();

	const {
		execute: update,
		error: updateError,
		isPending: isUpdatePending,
	} = useUpdateProfileDetails({ profile, upload });

	const {
		execute: updateFollowPolicy,
		isPending: isUpdateFollowPolicyPending,
		error: isUpdateFollowPolicyError,
	} = useUpdateFollowPolicy({ profile });

	useEffect(() => {
		if (profile) {
			setName(profile.name);
			setBio(profile.bio || " ");

			if (profile.followPolicy?.type === FollowPolicyType.CHARGE) {
				setFollowFee(profile.followPolicy?.amount.value.toString());
			} else {
				setFollowFee(0);
			}
		}
	}, [profile]);

	useEffect(() => {
		// If a follow-fee / currency has yet to be set, pick the first in the list
		if (currencies && !currenciesLoading) {
			if (profile.followPolicy?.type !== FollowPolicyType.CHARGE) {
				setChargeCurrency(currencies[0].symbol);
			} else {
				setChargeCurrency(profile.followPolicy?.amount.asset.symbol);
			}
		}
	}, [currenciesLoading]);

	// Called when a user selects a file to be uploaded
	const handleFile = async (e) => {
		const newFiles = e.target.files;
		if (newFiles.length === 0) return;

		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Called when the user clicks "save"
	const doUpdateProfile = async () => {
		setMessage("");
		setTxActive(true);

		setMessage("Updating profile information ...");

		let coverPicture = "";
		if (fileToUpload) {
			setMessage("Uploading cover picture ...");
			coverPicture = await uploadImage(fileToUpload, fileType);
		} else {
			coverPicture = profile.coverPicture?.original.url || null;
		}
		const attributes = {
			location: "",
			website: "",
		};
		setMessage("Uploading profile information ...");

		await update({ name, bio, coverPicture, attributes });
		setMessage("Profile updated.");
		setTxActive(false);

		// Only set the fee if a number greater than 0 is supplied
		if (followFee && followFee > 0) {
			await doUploadFollowPolicy();
		}
	};

	// Sets up the follow policy object
	function resolveFollowPolicy({ followPolicyType, amount, recipient }) {
		if (followPolicyType === FollowPolicyType.CHARGE) {
			return {
				type: FollowPolicyType.CHARGE,
				amount: amount,
				recipient: recipient,
			};
		}

		return {
			type: FollowPolicyType[followPolicyType],
		};
	}

	// Sets the fee to follow a profile
	const doUploadFollowPolicy = async () => {
		const recipient = profile.ownedBy;

		const erc20 = currencies.find((c) => c.symbol === chargeCurrency);
		const fee = Amount.erc20(erc20, followFee);
		await updateFollowPolicy({
			followPolicy: resolveFollowPolicy({
				amount: fee,
				followPolicyType: FollowPolicyType.CHARGE,
				recipient,
			}),
		});
	};

	return (
		<div className="w-[600px] mt-2 flex flex-col bg-primary px-1 py-1 rounded-lg">
			<div className="ml-2">
				<label className="font-main block uppercase text-xs font-bold mb-2">Personal Information</label>
				<label className="font-main block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Name
				</label>
				<input
					className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					id="name"
					type="text"
					size="50"
					value={name || ""}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="w-full ml-2">
				<label className="font-main block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Bio
				</label>
				<textarea
					className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="bio"
					type="text"
					value={bio || ""}
					onChange={(e) => setBio(e.target.value)}
					rows="10"
					cols="50"
				/>
			</div>

			<div className="w-full ml-2 mt-5">
				<label className="font-main block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Subscription Fee
				</label>
				<div className="flex flex-row">
					<input
						className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="fee"
						type="number"
						value={followFee}
						onChange={(e) => setFollowFee(e.target.value)}
					/>
					<select
						name="chargeCurrency"
						className="font-main ml-5 px-5 h-[25px] text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
						defaultValue={
							profile.followPolicy?.type === FollowPolicyType.CHARGE
								? profile.followPolicy.amount.asset.symbol
								: undefined
						}
						onChange={(e) => setChargeCurrency(e.target.value)}
					>
						{currencies &&
							currencies.map((currency) => (
								<option
									key={currency.symbol}
									value={currency.symbol}
									selected={currency.symbol === chargeCurrency}
								>
									{currency.symbol}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className="w-full mt-10 flex flex-col  bg-primary px-1 py-1 rounded-lg">
				<label className="font-main block uppercase text-xs font-bold mb-2">Cover Picture</label>
				{profile?.coverPicture && !fileToUpload && (
					<img width="600" src={profile.coverPicture?.original?.url} alt="profile_pic" />
				)}
				{fileToUpload && <img src={URL.createObjectURL(fileToUpload)} alt="profile_pic" />}
				<div className="flex flex-row justify-start px-2 py-1 ">
					<input
						type="file"
						onChange={handleFile}
						className="px-2 text-sm text-white rounded-lg w-full"
						multiple="single"
						name="files[]"
					/>
				</div>
			</div>
			<div className="flex flex-row justify-end w-full bg-primary px-2 py-1 mt-1">
				<span className="font-main text-message mr-5">{message}</span>

				<button
					className="font-main px-5 text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
					disabled={txActive}
					onClick={doUpdateProfile}
				>
					save
				</button>
			</div>
		</div>
	);
};

export default EditProfileDetails;
