export const runtime = "nodejs";

import { createUser } from '@/lib/UserFunctions';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const { name } = await request.json();
	await createUser();
	return NextResponse.json({ message: `Hello ${name}` });
}

