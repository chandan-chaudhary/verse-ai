"use client"
import { Button } from "@/components/ui/button";
// import { useUser } from "@clerk/nextjs";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";


export default function Home() {

  // const {isSignedIn } = useUser();
  //   const router = useRouter();
  //   console.log( isSignedIn);

  //   useEffect(()=>{
  //       if(!isSignedIn){ router.push('/');}
  //   },[isSignedIn, router]);

  return (
    <main className="flex flex-col items-center justify-center text-2xl gap-y-8 bg-gray-700 h-screen">
      <h1 className="font-bold text-5xl text-white">Hello, Welcome to AI Era.</h1>
      <div className="flex gap-5">
        <Link href={'/sign-up'}>
          <Button variant={"destructive"}>Sign up</Button>
        </Link>
        <Link href={'/sign-in'}>
          <Button variant={"destructive"}>Sign in</Button>
        </Link>
      </div>
    </main>
  );
}
