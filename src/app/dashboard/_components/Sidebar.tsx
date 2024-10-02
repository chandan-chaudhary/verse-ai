'use client'
import Image from "next/image";
import logo from '@/public/logo.svg'
import { CreditCard, History, Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
export default function Sidebar() {


    const path = usePathname();

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
        </main>
    )
}