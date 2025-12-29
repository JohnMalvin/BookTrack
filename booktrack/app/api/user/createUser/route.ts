import { createUser } from '@/lib/UserFunctions';
import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json({ message: 'Hell worldddd' });
}

export async function POST(request: Request) {
	const { username, email, password, nationality, countryCode, number } = await request.json();
	const result = await createUser(
		username,
		email,
		password,
		nationality,
		countryCode,
		number
	);

  	return NextResponse.json({ message: `User Created: ${String(result)}` });
}