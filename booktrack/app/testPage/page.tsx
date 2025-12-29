"use client";

import { useRef, useState } from "react";

export default function TestPage() {
	const usernameRef = useRef<HTMLInputElement | null>(null);

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const createUser = async () => {
		setLoading(true);
		setMessage("");

		const res = await fetch("/api/user/createUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: usernameRef.current?.value,
				email: "example email",
				password: "example password",
				nationality: "PH",
				countryCode: "+63",
				number: "9123456789",
			}),
		});

		const data = await res.json();
		setMessage(data.message);
		setLoading(false);
	};

	return (
		<>
			<input ref={usernameRef} placeholder="Username" />

			<button onClick={createUser} disabled={loading}>
				{loading ? "Creating..." : "CREATE USER"}
			</button>

			{message && <p>{message}</p>}
		</>
	);
}
