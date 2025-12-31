import { validateUserSession } from "@/lib/helper";
import { updateUserDetails } from "@/lib/UserFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { details } = await request.json();
	const sessionID = request.headers.get("sessionID");

	if (!sessionID) {
		return NextResponse.json(
			{ error: "Invalid SessionID" },
			{ status: 401 }
		);
	}

	try {
		const user = await validateUserSession(sessionID);
		
		const result = await updateUserDetails(
			user.userID,
			details
		);
	
		return NextResponse.json(result);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unauthorized";

		return NextResponse.json({ error: message }, { status: 401 });
	}
}