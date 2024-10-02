'use client'
import { TemplateProps, contentTemplate } from "@/templates/template"
import TemplateCard from "./TemplateCard"
import { useEffect, useState } from "react"

interface PROPS {
    searchValue:string
}
export default function Templates({ searchValue }: PROPS) {

    const [searchedTemplates, setSearchTemplates] = useState<TemplateProps[]>([]);

    useEffect(() => {
        if (searchValue) {
            const filteredTemplate = contentTemplate.filter((template) => template.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            setSearchTemplates(filteredTemplate);
        } else {
            setSearchTemplates(contentTemplate);
        }
    }, [searchValue])
    return (
        <main className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 p-5">
            {
                searchedTemplates.map((template: TemplateProps, idx: number) =>
                    <TemplateCard key={idx} {...template} />
                )
            }
        </main>
    )
}