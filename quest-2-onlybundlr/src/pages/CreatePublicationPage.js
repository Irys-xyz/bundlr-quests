import React from "react";
import { useActiveProfile } from "@lens-protocol/react";
import PublicationComposer from "../components/PublicationComposer";
import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import { SiSpringCreators } from "react-icons/si";

const CreatePublication = () => {
	const { data: activeProfile, loading: profileLoading } = useActiveProfile();
	const { isConnected } = useAccount();

	return (
		<div className="flex flex-col w-3/6 bg-background px-5">
			{!isConnected && (
				<div className="object-center self-center mt-5 ">
					<span className="flex flex-row justify-start font-logo text-2xl mb-3">Welcome to:</span>
					<div className="flex flex-row justify-center font-logo text-6xl mb-3">
						<SiSpringCreators /> OnlyBundlr
					</div>
					<LoginButton />
				</div>
			)}
			{!activeProfile && (
				<div className="object-center self-center mt-[5%] text-xl ml-5">
					you don't have an active profile, please{" "}
					<a href="/edit-profile" className="underline">
						create one
					</a>
				</div>
			)}
			{isConnected && !profileLoading && activeProfile && <PublicationComposer publisher={activeProfile} />}
		</div>
	);
};

export default CreatePublication;
