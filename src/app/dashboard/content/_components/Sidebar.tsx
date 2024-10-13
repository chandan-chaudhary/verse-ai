'use client'
import Image from "next/image";
import logo from '@/public/logo.svg'
import { CreditCard, History, Home, LogOutIcon, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
export default function Sidebar() {

    const { user } = useUser();
    const { signOut } = useClerk();
    const path = usePathname();

    const handleLogout = async () => {
        await signOut();
    }

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
    return (
        <main className="h-screen p-5 border-2">
            <div className="flex justify-center">
                <Image src={logo} alt="LOGO" width={80} height={100} />
            </div>
            <div className="flex flex-col gap-y-5 mt-8">
                {
                    menu.map((menu, idx) =>
                        <div key={idx} className={`flex gap-x-5 items-center hover:bg-purple-500 hover:text-white text-xl font-semibold  p-2 rounded-lg cursor-pointer ${path === menu.path && 'bg-purple-500 text-white'} `}>
                            <menu.icon />
                            <h5 >{menu.name}</h5>
                        </div>
                    )
                }
            </div>

            <div className="flex flex-col gap-5  pt-52">
                <Image src={user?.imageUrl!} alt={`${user?.firstName}`} width={60} height={100} className="rounded-full" />
                <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
                {/* <div className="flex gap-4"> */}
                <Button onClick={() => handleLogout()} variant={'default'} className="flex gap-4"> Logout <LogOutIcon /> </Button>
                {/* </div> */}
            </div>
        </main>
    )
}