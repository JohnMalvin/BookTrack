import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "Hello from API" });
}

export async function POST(req: Request) {
	const data = await req.json();
	const message = data.message;
	return NextResponse.json({ message: `hello ${message}, from API` });
}