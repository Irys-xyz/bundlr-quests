import React, { useState, useEffect } from "react";
import { useProfile } from "@lens-protocol/react";

const SuggestedProfile = ({ handle }) => {
	const { data: profile, loading } = useProfile({ handle });
	const [profilePicture, setProfilePicture] = useState("");
	const [coverPicture, setCoverPicture] = useState("");

	useEffect(() => {
		if (profile) {
			setProfilePicture(profile.picture?.original.url);
			setCoverPicture(profile.coverPicture?.original.url);
			console.log(profile);
		}
	}, [loading]);

	return (
		<div className="relative" key={profile?.id}>
			{coverPicture && (
				<img
					className="rounded-lg absolute top-0 left-0 h-32 w-full object-cover px-1 py-1 "
					src={coverPicture}
				/>
			)}

			<div className="h-32 w-full ">
				<div className="mx-2 mt-2 flex flex-row bg-secondary opacity-90 rounded-xl">
					{profilePicture && (
						<img
							className="inline-block h-8 w-8 mb-1 mt-1 ml-1 rounded-full ring-2 ring-white"
							src={profilePicture}
							alt={handle}
						/>
					)}

					<h2 className="ml-2 self-center">
						<a className="font-main underline decoration-contast" href={"/" + handle}>
							{handle}
						</a>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default SuggestedProfile;
