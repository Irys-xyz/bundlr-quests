import React from "react";
import Publication from "../components/Publication";
import { usePublications } from "@lens-protocol/react";

const PublicationFeed = ({ profile }) => {
	const { data: publications, error, loading, hasMore } = usePublications({ profileId: profile.id });

	return <div className="flex flex-col">{/* // BUILDOOOORS: Complete this */}</div>;
};

export default PublicationFeed;
