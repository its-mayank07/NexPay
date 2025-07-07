import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, number, password, name } = body;

    if (!email || !number || !password || !name) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ number }, { email }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        number,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ message: "User created", userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
