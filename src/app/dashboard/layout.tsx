
import Sidebar from '@/app/dashboard/_components/Sidebar';
import Header from '@/app/dashboard/_components/Headers';



export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className=''>
            <div className='md:w-80 hidden md:block fixed'>
                <Sidebar />
            </div>
            <div className='md:ml-80'>
                <Header />
                {children}
            </div>
        </div>
    )
}