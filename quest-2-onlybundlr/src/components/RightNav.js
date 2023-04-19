import React, { useState, useEffect } from "react";
import SuggestedProfile from "../components/SuggestedProfile";
import { useExploreProfiles } from "@lens-protocol/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SiSpringCreators } from "react-icons/si";

const RightNav = () => {
	const [suggestedProfileHandles, setSuggestedProfileHandles] = useState([]);
	const { isConnected } = useAccount();

	useEffect(() => {
		// Hardcoded list of profiles to follow
		const profiles = [
			"llamakahlo.test",
			"llamaanime.test",
			"llamablackandwhite.test",
			"llamafigurine.test",
			"llamabasquiat.test",
		];
		// Shuffle the order
		for (let i = profiles.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[profiles[i], profiles[j]] = [profiles[j], profiles[i]];
		}
		// Pick just 4
		setSuggestedProfileHandles(profiles.slice(0, 4));
	}, []);

	return (
		<div className="w-3/6 h-screen sticky top-0 pt-5 bg-background px-4">
			{isConnected && (
				<>
					<div className="flex flex-row justify-center font-logo text-6xl mb-3">
						<SiSpringCreators /> OnlyBundlr
					</div>

					<h1 className="font-main bg-primary rounded-xl pl-1">Suggested Profiles</h1>
					<div className="flex flex-col">
						{suggestedProfileHandles.map((suggestedProfileHandle, id) => {
							return <SuggestedProfile key={id} handle={suggestedProfileHandle} />;
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default RightNav;
