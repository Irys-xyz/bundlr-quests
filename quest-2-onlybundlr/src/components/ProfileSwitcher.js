import React, { useState, useEffect } from "react";

import { useActiveProfile, useCreateProfile, useProfilesOwnedByMe, useActiveProfileSwitch } from "@lens-protocol/react";

const ProfileSwitcher = ({ showCreateNew }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [createProfileMode, setCreateProfileMode] = useState(false);
	const [newProfileHandle, setNewProfileHandle] = useState("");
	const { data: profiles, loading: profilesLoading, hasMore, next } = useProfilesOwnedByMe();
	const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
	const { execute: switchProfile, isPending } = useActiveProfileSwitch();

	const {
		execute: createNewProfile,
		error: createNewProfileError,
		isPending: createNewProfilePending,
	} = useCreateProfile();

	// Called when the user clicks "save new profile"
	const doCreateProfile = async () => {
		setMessage("");
		setTxActive(true);
		try {
			setMessage("Creating profile ...");
			const tx = await createNewProfile(newProfileHandle);
			setMessage("Profile created.");
		} catch (e) {
			setMessage("Error creating profile " + e);
			console.log("Error on create profile ", e);
		}
		setTxActive(false);
		setCreateProfileMode(false);
	};

	useEffect(() => {
		if (!profiles || profiles.length === 0) setCreateProfileMode(true);
		else setCreateProfileMode(false);
	}, [profilesLoading]);

	return (
		<div className="w-fit mt-2 flex flex-col bg-primary px-1 py-1 rounded-lg">
			<div className="flex flex-col  w-full">
				<div className="flex flex-row  w-full px-5 py-2 ">
					<label className="font-main block uppercase tracking-wide text-gray-700 text-s font-bold">
						Handle:
					</label>
					{!createProfileMode && (
						<div>
							<select
								onChange={(val) => switchProfile(val.target.value)}
								className="font-main text-s px-5 text-white rounded-lg bg-background hover:bg-secondary ml-2"
								value={activeProfile?.id}
							>
								{profiles &&
									profiles
										?.filter((a, i) => profiles?.findIndex((s) => a.id === s.id) === i)
										.map((profile) => (
											<option key={profile.id} value={profile.id}>
												{profile.handle}
											</option>
										))}
							</select>
							{showCreateNew && (
								<button
									className="ml-10 font-main px-5 text-white rounded-lg bg-background hover:bg-secondary "
									onClick={() => setCreateProfileMode(true)}
								>
									Create New
								</button>
							)}
						</div>
					)}
					{createProfileMode && (
						<div className="flex flex-row">
							<input
								className="bg-white ml-2 appearance-none block rounded focus:outline-none"
								id="newProfileHandle"
								type="text"
								onChange={(e) => setNewProfileHandle(e.target.value)}
							/>

							<button
								className="ml-10 font-main px-5 text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
								disabled={txActive}
								onClick={doCreateProfile}
							>
								save new profile
							</button>
						</div>
					)}
				</div>
				<span className="font-main text-message mr-5 ml-5">{message}</span>
			</div>
		</div>
	);
};

export default ProfileSwitcher;
