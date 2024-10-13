import { TemplateProps } from "@/model/template";
import Image from "next/image";
import Link from "next/link";


export default function TemplateCard(template: TemplateProps) {
    return (
        <Link href={`/dashboard/content/${template.slug}`}>
            <div className=" flex flex-col gap-y-5 border-2  bg-blue-50  h-72 drop-shadow-2xl rounded-lg p-5 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
                <Image src={template.icon} alt='' width={70} height={50} />
                <div className="flex flex-col gap-y-3 ">
                    <h4 className="text-2xl font-semibold">{template.name}</h4>
                    <p className="text-lg">{template.description}</p>
                </div>
            </div>
        </Link>
    )
}