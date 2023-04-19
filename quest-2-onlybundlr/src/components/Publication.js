import React from "react";

const Publication = ({ id, content, description, media, publisher }) => {
	return (
		<div
			className="w-[580px] flex flex-col justify-center bg-primary my-5 bg-slate-300 px-1 py-1 rounded-xl"
			key={id}
		>
			<div className="flex flex-row bg-secondary">
				<img
					className="inline-block h-8 w-8 mb-1 mt-1 ml-1 rounded-full ring-2 ring-white"
					src={publisher.picture?.original.url}
					alt={publisher.handle}
				/>
				<h2 className="ml-2 self-center font-main text-bold">
					<a className="underline decoration-contast" href={"/" + publisher.handle}>
						{publisher.handle}
					</a>
				</h2>
			</div>
			{media &&
				media.map((picture, id) => {
					return (
						<img
							width="600"
							className="bg-primary px-1 py-1 rounded-xl"
							src={picture.original?.url}
						/>
					);
				})}
			<h2 className="ml-2 font-main">{content}</h2>
			<p className="ml-2 font-main">{description}</p>
		</div>
	);
};

export default Publication;
