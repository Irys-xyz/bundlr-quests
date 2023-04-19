import React from "react";

import { SlHome } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { AiOutlinePlus } from "react-icons/ai";

const LeftNav = () => {
	return (
		<div className="flex flex-col w-1/6 h-screen sticky top-0  bg-background">
			{" "}
			<a className="mt-5 mb-2 mx-2 self-end" href="/home">
				<SlHome className="hover:h-12 hover:w-12 ease-in-out duration-300 h-10 w-10" />
			</a>
			<a className="my-2 mx-2 self-end" href="/edit-profile">
				<SlUser className="hover:h-12 hover:w-12 ease-in-out duration-300 h-10 w-10" />
			</a>
			<a className="my-2 mx-2 self-end" href="/create-publication">
				<AiOutlinePlus className="hover:h-12 hover:w-12 ease-in-out duration-300 h-10 w-10 rounded-full ring-2 bg-primary hover:bg-secondary" />
			</a>
		</div>
	);
};

export default LeftNav;
