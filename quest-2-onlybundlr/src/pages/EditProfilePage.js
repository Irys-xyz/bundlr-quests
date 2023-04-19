import React from "react";
import { useAccount } from "wagmi";
import { useActiveProfile } from "@lens-protocol/react";
import EditProfileDetails from "../components/EditProfileDetails";
import EditProfilePicture from "../components/EditProfilePicture";
import LoginButton from "../components/LoginButton";
import ProfileSwitcher from "../components/ProfileSwitcher";
import BundlrBalance from "../components/BundlrBalance";
import { SiSpringCreators } from "react-icons/si";

const EditProfile = () => {
	const { isConnected } = useAccount();
	const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
	return (
		<div className="flex flex-col w-3/6 bg-background px-5">
			{!isConnected && (
				<div className="object-center self-center mt-5">
					<span className="flex flex-row justify-start font-logo text-2xl mb-3">Welcome to:</span>
					<div className="flex flex-row justify-center font-logo text-6xl mb-3">
						<SiSpringCreators /> OnlyBundlr
					</div>
					<LoginButton />
				</div>
			)}
			{isConnected && (
				<div className="flex flex-wrap flex-col">
					<ProfileSwitcher showCreateNew={true} />
					<BundlrBalance />

					{activeProfile && (
						<>
							{!activeProfileLoading && <EditProfileDetails profile={activeProfile} />}

							{!activeProfileLoading && <EditProfilePicture profile={activeProfile} />}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default EditProfile;
