import Headers from "./_components/Headers";


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className=" items-center justify-center pt-12 h-screen bg-zinc-900 text-white ">
            <Headers />
            {children}
        </div>
    )
}