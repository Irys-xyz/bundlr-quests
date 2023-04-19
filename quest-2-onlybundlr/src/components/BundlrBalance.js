import React, { useState, useEffect } from "react";
import { getBalanceMatic } from "../utils/get-balance-matic";
import { fundNode } from "../utils/fund-node";

const BundlrBalance = () => {
	const [curBalance, setCurBalance] = useState(0);
	const [fundAmount, setFundAmount] = useState(0);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchBalance = async () => {
			setCurBalance(await getBalanceMatic());
		};
		fetchBalance();
	}, []);

	// Called when the "fund" button is clicked by the user
	const doFund = async () => {
		if (!fundAmount) {
			setMessage("Please specify an amount to fund");
			return;
		}
		setMessage(`Funding ${fundAmount} MATIC`);
		const fundStatus = await fundNode(fundAmount);
		setMessage(fundStatus);
		setCurBalance(await getBalanceMatic());
		setFundAmount(0);
	};

	return (
		<div className="w-[600px] mt-1 flex flex-col  bg-primary px-1 py-1 rounded-lg ">
			<label className="font-main block uppercase text-xs font-bold mb-2">
				Bundlr Node Balance: {curBalance}
			</label>

			<div className="flex flex-row justify-items-center">
				<label className="font-main block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Amount To Fund
				</label>
				<input
					className="ml-5 appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					id="fundAmount"
					type="number"
					size="10"
					value={fundAmount || ""}
					onChange={(e) => setFundAmount(e.target.value)}
				/>
				<button
					className="ml-4 font-main px-2 h-7 text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
					onClick={() => doFund()}
				>
					fund
				</button>
			</div>

			<span className="font-main text-message mr-5">{message}</span>
		</div>
	);
};

export default BundlrBalance;
