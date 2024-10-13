import connect from "@/db/db";
import User from "@/db/modals/userSchema";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new NextResponse(`Error`+ err);
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log(body); 
    await connect();
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    return new NextResponse(`Error` , err!);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const body = await request.json();
    await connect();
    if (!userId || !body)
      return new NextResponse(
        JSON.stringify({ message: "No userID or data" }),
        { status: 400 }
      );

    if (!Types.ObjectId.isValid(userId))
      return new NextResponse(JSON.stringify({ message: "Invalid userID" }), {
        status: 400,
      });

    const updatedUser = await User.findByIdAndUpdate({_id: userId}, body, {
      new: true,
    });
    if (!updatedUser) return new NextResponse("Cannot updated user");
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Error" + err }), {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId)
    return new NextResponse(JSON.stringify({ message: "No userID or data" }), {
      status: 400,
    });

  if (!Types.ObjectId.isValid(userId))
    return new NextResponse(JSON.stringify({ message: "Invalid userID" }), {
      status: 400,
    });

  await connect();
  const deletedUser = await User.findByIdAndDelete({_id: new ObjectId(userId)});
  if(!deletedUser) return new NextResponse('Cannot delete user', {status:400});
  return new NextResponse('User Deleted successfully')
};
