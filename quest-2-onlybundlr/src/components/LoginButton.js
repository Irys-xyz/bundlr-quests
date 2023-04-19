import { useWalletLogin } from "@lens-protocol/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const LoginButton = () => {
	const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();

	// BUILDOOOORS: Complete This

	// Called when the user clicks "login"
	const onLoginClick = async () => {
		// BUILDOOOORS: Complete This
	};

	return (
		<div>
			{loginError && <p>{loginError}</p>}
			<button
				className="font-main ml-2 px-5 text-white rounded-lg bg-primary hover:bg-secondary "
				disabled={isLoginPending}
				onClick={onLoginClick}
			>
				login
			</button>
		</div>
	);
};

export default LoginButton;
