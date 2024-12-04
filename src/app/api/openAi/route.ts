import { NextResponse } from "next/server";


export async function GET(request:Request){
    const prompt = await request.json();
    if(!prompt)
        return new NextResponse('No prompt, please enter prompt', {status:400});
    try{

    }catch(err){
        return new NextResponse('Cannot generate response'+err);
    }
}