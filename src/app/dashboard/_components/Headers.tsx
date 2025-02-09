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
        <main className="pt-12 ">
            <Menubar className="py-6 rounded-full w-fit bg-gray-50 bg-opacity-25 border-none text-black backdrop-blur-3xl">
                <MenubarMenu>
                    <div className="flex items-center gap-8">
                        {
                            headers.map((header, idx) =>
                                <h1 key={idx} className="cursor-pointer hover:underline text-lg px-4 py-2 rounded-full">{header}</h1>
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