import { validateUserSession } from '@/lib/helper';
import { getUserDetails } from '@/lib/UserFunctions';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const sessionID = request.headers.get("sessionID");

	if (!sessionID) {
		return NextResponse.json(
			{ error: "Session ID missing" },
			{ status: 401 }
		);
	}

	try {
		const user = await validateUserSession(sessionID);
		const result = await getUserDetails(user.userID, sessionID);

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Unauthorized" },
			{ status: 401 }
		);
	}
}

