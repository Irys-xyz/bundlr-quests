import { useWalletLogin } from "@lens-protocol/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const LoginButton = () => {
	const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();

	const { isConnected } = useAccount();
	const { disconnectAsync } = useDisconnect();

	const { connectAsync } = useConnect({
		connector: new InjectedConnector(),
	});

	// Called when the user clicks "login"
	const onLoginClick = async () => {
		if (isConnected) {
			await disconnectAsync();
		}

		const { connector } = await connectAsync();
		if (connector instanceof InjectedConnector) {
			const signer = await connector.getSigner();
			await login(signer);
		}
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
