export const runtime = "nodejs";

import { createUser } from '@/lib/dbFunctions';
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hell worldddd' });
}

// export async function POST(request: Request) {
// 	const { name } = await request.json();
// 	await createUser();
// 	return NextResponse.json({ message: `Hello ${name}` });
// }

export async function POST(request: Request) {
	console.log("POST handler hit");

	const { name } = await request.json();

	console.log("about to call createUser");

	await createUser();

	console.log("returned from createUser");

	return NextResponse.json({ message: `Hello ${name}` });
}

