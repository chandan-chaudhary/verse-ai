import connect from "@/db/db";
import Template from "@/db/modals/templateSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//GET TEMPLATE
export const GET = async (request: Request) => {
  try {
    // get userid from query
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    // check id nad its valid
    if (!user || !Types.ObjectId.isValid(user))
      return new NextResponse("User id not found", { status: 400 });

    // try nad check database connection
    await connect();
    // get content by user
    const template = await Template.find({ user: user });
    // if no content return error
    if (!template)
      return new NextResponse("Template not found", { status: 400 });
    // return content
    return new NextResponse(JSON.stringify({ template }), { status: 200 });
  } catch (err) {
    return new NextResponse("Error" + err, { status: 400 });
  }
};

//CREATE TEMPLATE
export const POST = async (request: Request) => {
  try {
    // get userid from query
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    if (!user || !Types.ObjectId.isValid(user))
      return new NextResponse("User id not found", { status: 400 });

    // GET TITLE NAD DESCRIPTION
    const { title, templateDescription } = await request.json();
    if (!title || !templateDescription)
      return new NextResponse("Please provide all fileds");
    // try and check database connection
    await connect();
    // create new template for specific user
    const newTemplate = await new Template({
      title: title,
      templateDescription: templateDescription,
      user: user,
    });
    // if error while creating template
    if (!newTemplate)
      return new NextResponse("Cannot create template", { status: 400 });
    // return template created
    return new NextResponse(JSON.stringify(newTemplate), { status: 201 });
  } catch (err) {
    return new NextResponse("Error" + err, { status: 400 });
  }
};


//UPDATE TEMPLATE
export const PATCH = async (request:Request) => {
 // get userid from query
 const { searchParams } = new URL(request.url);
 const user = searchParams.get("user");
 if (!user || !Types.ObjectId.isValid(user))
   return new NextResponse("User id not found", { status: 400 });
 
  try {
  } catch (err) {
    return new NextResponse("Error" + err, { status: 400 });
  }
};
