import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password)
    return NextResponse.json("Credentials missing", { status: 404 });
  try {
    const user = await prisma.user.create({ data: { email, password } });

    if (!user)
      return NextResponse.json("cannot register user", { status: 404 });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return NextResponse.json(`Internal server error ${err}`, { status: 500 });
  }
}
