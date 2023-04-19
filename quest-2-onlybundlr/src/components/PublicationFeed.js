import React from "react";
import Publication from "../components/Publication";
import { usePublications } from "@lens-protocol/react";

const PublicationFeed = ({ profile }) => {
	const { data: publications, error, loading, hasMore } = usePublications({ profileId: profile.id });

	return (
		<div className="flex flex-col">
			{!loading &&
				publications &&
				publications.map((publication) => {
					return (
						<Publication
							key={publication.id}
							content={publication.metadata?.content}
							description={publication.metadata?.description}
							media={publication.metadata?.media}
							publisher={profile}
						/>
					);
				})}
		</div>
	);
};

export default PublicationFeed;
