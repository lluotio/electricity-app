import { useEffect, useState } from "react";

type PriceData = {
	price: number;
	currency: string;
	updated: string;
};

function App() {
	const [data, setData] = useState<PriceData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPrice = async () => {
		try {
			setLoading(true);

			const res = await fetch("http://localhost:3000/api/price");

			if (!res.ok) {
				throw new Error("Failed to fetch price");
			}

			const json: PriceData = await res.json();
			setData(json);
			setError(null);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Unknown error");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPrice();
	}, []);

	return (
		<div style={{ fontFamily: "sans-serif", padding: 20 }}>
			<h1>Electricity App Dashboard ⚡</h1>

			{loading && <p>Loading...</p>}

			{error && <p style={{ color: "red" }}>Error: {error}</p>}

			{data && (
				<div style={{ marginTop: 20 }}>
					<p>
						<strong>Price:</strong> {data.price} {data.currency}
					</p>
					<p>
						<strong>Updated:</strong> {data.updated}
					</p>
				</div>
			)}

			<button onClick={fetchPrice} style={{ marginTop: 20 }}>
				Refresh
			</button>
		</div>
	);
}

export default App;
