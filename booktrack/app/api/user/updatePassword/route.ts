import { apiValidator } from "@/lib/helper";
import { updateUserPassword } from "@/lib/UserFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { userID, currentPassword, newPassword } = await request.json();
	const sessionID = request.headers.get("sessionID");

	try {
		await apiValidator(sessionID, userID);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unauthorized";

		const status =
			message === "Session ID missing" ||
			message === "User ID missing"
			? 401
			: 500;

		return NextResponse.json({ error: message }, { status });
	}

	try {
		const result = await updateUserPassword(
			userID,
			currentPassword,
			newPassword
		);

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to update password" },
			{ status: 400 }
		);
	}

}
