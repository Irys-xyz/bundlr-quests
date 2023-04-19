import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { staging, LensProvider } from "@lens-protocol/react-web";

import LeftNav from "./components/LeftNav";
import RightNav from "./components/RightNav";
import ContentFeedPage from "./pages/ContentFeedPage";
import ProfileFeedPage from "./pages/ProfileFeedPage";
import EditProfilePage from "./pages/EditProfilePage";
import CreatePublicationPage from "./pages/CreatePublicationPage";

const { chains, provider, webSocketProvider } = configureChains([polygonMumbai], [publicProvider()]);
const client = createClient({
	autoConnect: true,
	provider,
	webSocketProvider,
});

const lensConfig = {
	bindings: wagmiBindings(),
	environment: staging,
	sources: ["onlybundlr"],
};

function App() {
	return (
		<WagmiConfig client={client}>
			<LensProvider config={lensConfig}>
				<div className="flex flex-row">
					<LeftNav />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<ContentFeedPage />} />
							<Route path="/home" element={<ContentFeedPage />} />
							<Route path="/*" element={<ProfileFeedPage />} />
							<Route path="/edit-profile" element={<EditProfilePage />} />
							<Route path="/create-publication" element={<CreatePublicationPage />} />
						</Routes>
					</BrowserRouter>
					<RightNav />
				</div>
			</LensProvider>
		</WagmiConfig>
	);
}

export default App;
