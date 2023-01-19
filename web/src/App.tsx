import "./styles/global.css";

import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";

export default function App() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex w-full max-w-5xl flex-col gap-16 px-6">
				<Header />
				<SummaryTable />
			</div>
		</div>
	);
}
