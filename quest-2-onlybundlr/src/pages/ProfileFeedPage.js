import React, { useState, useEffect } from "react";
import { useProfile, useActiveProfile, FollowPolicyType } from "@lens-protocol/react";
import FollowButton from "../components/FollowButton";
import PublicationFeed from "../components/PublicationFeed";

const ProfileFeedPage = () => {
	const [profilePicture, setProfilePicture] = useState("");
	const [coverPicture, setCoverPicture] = useState("");
	const [followFee, setFollowFee] = useState(0);
	const [followCurrency, setFollowCurrency] = useState(0);
	const [currentHandle, setCurrentHandle] = useState("");

	const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
	const { data: profile, loading: profileLoading } = useProfile({ handle: currentHandle });

	const [following, setFollowing] = useState(false);

	useEffect(() => {
		// Update the document title using the browser API
		setCurrentHandle(window.location.href);

		// Grab just the user's handle (the final part of the URL)
		// Regex from Professor ChatGPT
		const regex = /[^/]*$/;
		setCurrentHandle(window.location.href.match(regex)[0]);
	});

	useEffect(() => {
		if (profile) {
			let profilePictureURL = profile.picture?.original.url;
			let coverPictureURL = profile.coverPicture?.original.url;

			setProfilePicture(profilePictureURL);
			setCoverPicture(coverPictureURL);
			setFollowing(profile.__isFollowedByMe);

			if (profile.followPolicy?.type === FollowPolicyType.CHARGE) {
				setFollowFee(profile.followPolicy?.amount.value.toString());
				setFollowCurrency(profile.followPolicy?.amount.asset.name);
			} else {
				setFollowFee(0);
			}
		}
	}, [profile]);

	return (
		<div className="w-3/6 bg-background">
			<div className="top-0 relative bg-primary border border-2 border-secondary px-2 h-62 mt-5 w-fit rounded-xl">
				<h1 className="font-main">{profile?.handle}</h1>
				<p className="font-main text-sm">
					{profile?.stats.totalPublications} Posts * {profile?.stats.totalCollects} Likes *{" "}
					{profile?.stats.totalFollowers} Followers
				</p>
				<img className="z-0 h-32 object-cover" width="600" src={coverPicture} alt="header" />
				<img
					className="absolute top-40 z-10 h-15 w-12 rounded-full border-2 border-white "
					src={profilePicture}
					alt={currentHandle}
				/>

				{!activeProfileLoading && !profileLoading && profile?.id !== activeProfile?.id && (
					<div className="flex flex-row justify-end mt-2">
						{followFee === 0 && <span className="font-main">Follow Fee: FREE</span>}
						{followFee !== 0 && (
							<span className="font-main">
								Follow Fee: {followFee} {followCurrency}
							</span>
						)}
						<FollowButton followee={profile} follower={activeProfile} />
					</div>
				)}
				{profile?.id === activeProfile?.id && (
					<h1 className="font-main text-sm mt-2 bg-secondary px-2 py-2 mb-1 ml-10">{profile?.bio}</h1>
				)}
				{profile?.id !== activeProfile?.id && (
					<h1 className="font-main text-sm mt-2 bg-secondary px-2 py-2 mb-1">{profile?.bio}</h1>
				)}
			</div>
			{!profileLoading && (profile.followStatus?.isFollowedByMe || profile?.id === activeProfile?.id) && (
				<PublicationFeed profile={profile} />
			)}
		</div>
	);
};

export default ProfileFeedPage;
