
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Code2Icon, Earth, Edit2Icon, Instagram, PictureInPicture2, Text, TextCursorIcon, TicketCheckIcon, X } from "lucide-react"
import Link from "next/link"
import Headers from "./_components/Headers"

export default function Dashboard() {
    return (
        <main className=" h-screen items-center justify-center  pt-12 bg-gray-900 ">
            {/* <div className=""> */}
                <Headers />

            {/* </div> */}

            <div className="grid grid-cols-2 gap-x-8 pt-24 place-items-center justify-items-center">
                <Card className="shadow-2xl w-8/12">
                    <CardHeader>
                        <CardTitle>Generate AI Content</CardTitle>
                        <CardDescription>Create Content based on Your ideas, ask question, generate content for your purpose</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                        <div className="grid grid-cols-3 place-items-center gap-4 text-red-500 text-4xl">
                            <Code2Icon />
                            <X />
                            <PictureInPicture2 />
                            <Edit2Icon />
                            <Earth />
                            <TextCursorIcon />
                            <TicketCheckIcon />
                            <Instagram />
                            <Text />
                        </div>
                        <Link href={'/dashboard/content'} className="w-fit self-center mt-8">
                            <Button variant={'default'}>Get started</Button>
                        </Link>
                    </CardContent>
                    {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
                </Card>
                <Card className="shadow-2xl w-8/12">
                    <CardHeader>
                        <CardTitle>Prepare for InterView</CardTitle>
                        <CardDescription>Practice and prepare for interview, it generate mock interview based on role and description you are applying for. </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                        <div className="grid grid-cols-3 place-items-center gap-4 text-red-500 text-4xl">
                            <Code2Icon />
                            <X />
                            <PictureInPicture2 />
                            <Edit2Icon />
                            <Earth />
                            <TextCursorIcon />
                            <TicketCheckIcon />
                            <Instagram />
                            <Text />
                        </div>
                        <Link href={'/dashboard/interview'} className="w-fit self-center mt-8">
                            <Button variant={'default'} >Get started</Button>
                        </Link>
                    </CardContent>
                    {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
                </Card>
            </div>

        </main>
    )
}