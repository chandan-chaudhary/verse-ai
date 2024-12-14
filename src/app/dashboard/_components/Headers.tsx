"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Headers() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const headers = [
        'Home', 'About', 'Billings', 'Credits', 'History',
    ]
    if (status === 'unauthenticated')
         router.push('/sign-in');

    return (
        <main className="  w-full items-center justify-center pt-12 ">
            {/* <div className="w-full items-center justify-center"> */}
            <Menubar className="py-8 rounded-full mx-96 bg-zinc-600 border-none">
                <MenubarMenu>
                    <div className="flex items-center gap-8">
                        {
                            headers.map((header, idx) =>
                                <h1 key={idx} className="hover:bg-black hover:text-white text-xl font-semibold px-4 py-2 rounded-full">{header}</h1>
                            )
                        }
                        <div className="flex ">
                            <MenubarTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </MenubarTrigger>
                            <MenubarContent className="flex gap-4">
                                <MenubarItem className="flex gap-5 font-semibold text-2xl"> {session?.user?.email}</MenubarItem>
                                <MenubarItem onClick={()=> signOut()} > <LogOut className="size-8" /></MenubarItem>
                            </MenubarContent>
                        </div>
                    </div>
                </MenubarMenu>
            </Menubar>
        </main>
    )
}