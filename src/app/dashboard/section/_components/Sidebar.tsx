'use client'
import Image from "next/image";
import logo from '@/public/logo.svg'
import { CreditCard, History, Home, LogOutIcon, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Sidebar() {

    // const { user } = useUser();
    // const { signOut } = useClerk();
    const path = usePathname();
    const router = useRouter();
    // const handleLogout = async () => {
    //     await signOut();
    // }

    const menu = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard',
        },
        {
            name: 'History',
            icon: History,
            path: '/dashboard/history',
        },
        {
            name: 'Billing',
            icon: CreditCard,
            path: '/dashboard/billing',
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings',
        },
    ]

    function handleMenuNavigation(selectedPath: string) {
        if (path === selectedPath) return router.push(selectedPath);
    };

    return (
        <main className="h-screen p-5 bg-zinc-800 rounded-lg">
            <div className="flex justify-center">
                <Image src={logo} alt="LOGO" width={80} height={100} />
            </div>
            <div className="flex flex-col gap-y-5 mt-8">
                {
                    menu.map((menu, idx) =>
                        <div onClick={() => handleMenuNavigation(menu.path)} key={idx} className={`flex gap-x-5 items-center hover:bg-zinc-700 hover:text-white text-xl font-semibold  p-2 rounded-lg cursor-pointer ${path === menu.path && 'bg-zinc-800 text-white'} `}>
                            <menu.icon />
                            <h5 >{menu.name}</h5>
                        </div>
                    )
                }
            </div>

            <div className="flex items-center justify-between gap-5 p-3 rounded-lg mt-52 bg-zinc-700">
                <div className="flex items-center gap-x-5 ">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {/* <Image src={user?.imageUrl!} alt={`${user?.firstName}`} width={60} height={100} className="rounded-full" /> */}
                    <h2 className="text-2xl font-semibold">Dev</h2>
                </div>
                {/* <div className="flex gap-4"> */}
                <LogOutIcon />
                {/* <Button onClick={() => handleLogout()} variant={'default'} className=""> <LogOutIcon /> </Button> */}
                {/* </div> */}
            </div>
        </main>
    )
}