import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

import Image from "next/image";
// import landingAi from "@/public/ai_landing.jpg";
import { tools, ToolsProps } from "./tools";

export default function Tools() {
    return (
        <div className=" flex flex-col gap-y-8 py-24">
            <h5 className="text-center text-6xl font-bold underline decoration-wavy">Tools & Features</h5>
            <div className="grid grid-cols-2 gap-8  ">
                {
                    tools.map((tool: ToolsProps, idx: number) =>
                    (<Card key={idx} className="shadow-2xl">
                        <CardContent className="flex items-center gap-x-5">
                            <Image src={tool.image || "/path/to/your/image.jpg"} width={100} height={100} alt="Landing" className="w-fit h-fit object-cover rounded-lg" />
                            <CardHeader className="text-4xl">
                                <CardTitle>{tool.title}</CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                                <Link href={`/dashboard/${tool.path}`} className="w-fit self-center mt-8">
                                    <Button variant={'default'} className="py-4">Get started</Button>
                                </Link>
                            </CardHeader>
                        </CardContent>
                    </Card>)
                    )
                }
            </div>
        </div>
    )
}