"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useUser } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
// import Image from "next/image";

export default function Headers() {
    const { user } = useUser();

    const headers = [
        'Home', 'About', 'Billings', 'Credits', 'History',
    ]
    return (
        <main className="  w-full items-center justify-center ">
            {/* <div className="w-full items-center justify-center"> */}
            <Menubar className="py-8 rounded-full mx-96 bg-gray-300 text-black">
                <MenubarMenu>
                    <div className="flex items-center gap-8">
                        {
                            headers.map((header, idx) =>
                                <MenubarTrigger key={idx} className="hover:bg-black hover:text-white text-xl font-semibold">{header}</MenubarTrigger>
                            )
                        }
                        <div className="flex ">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            {/* <Image src={user?.imageUrl} alt="" width={40} height={100} className="rounded-full" /> */}
                            <MenubarTrigger className="flex gap-5 font-semibold text-2xl"> {user?.firstName}</MenubarTrigger>
                            <MenubarTrigger > <LogOut className="size-8" /></MenubarTrigger>
                        </div>
                    </div>
                    {/* <MenubarTrigger>Docs</MenubarTrigger>
                    <MenubarTrigger>Usage</MenubarTrigger>
                    <MenubarTrigger>History</MenubarTrigger> */}
                    {/* <MenubarContent>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent> */}
                </MenubarMenu>
            </Menubar>
            {/* </div> */}


        </main>
    )
}