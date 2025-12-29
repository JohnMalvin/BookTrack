import { createUser } from '@/lib/dbFunctions';
import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json({ message: 'Hell worldddd' });
}

export async function POST(request: Request) {
	const { name } = await request.json();
	await createUser();
  	return NextResponse.json({ message: `Hello ${name}` });
}

// export async function POST() {
// 	console.log("🔥 ROUTE EXECUTED FROM CORRECT ROOT");
// 	return Response.json({ ok: true });
// }
