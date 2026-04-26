import { useEffect, useState } from "react";

type HealthResponse = {
	status: string;
	timestamp: string;
};

function App() {
	const [data, setData] = useState<HealthResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchHealth = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/health");

				if (!res.ok) {
					throw new Error("Network response was not ok");
				}

				const json: HealthResponse = await res.json();
				setData(json);
			} catch (err: any) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchHealth();
	}, []);

	if (loading) return <div>Loading backend status...</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div style={{ padding: "20px", fontFamily: "sans-serif" }}>
			<h1>Electricity App Dashboard ⚡</h1>

			<h2>Backend status:</h2>
			<p>Status: {data?.status}</p>
			<p>Timestamp: {data?.timestamp}</p>
		</div>
	);
}

export default App;
