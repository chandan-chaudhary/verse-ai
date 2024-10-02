"use client"
import { contentTemplate, FORM, TemplateProps } from "@/templates/template"
// import { useState } from "react"
import ContentForm from "../_components/ContentForm";
import OutputGenerated from "../_components/OutputGenerated";
import { chatSession } from "@/templates/aiModel";
import { useState } from "react";

interface PROPS {
    params: {
        'template-slug': string
    }
}
export default function ContentSlug(props: PROPS) {
    const [aiGenerateResult, setAIGeneratedResult] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const template: TemplateProps | undefined = contentTemplate.find((template) => template.slug === props.params["template-slug"])

    // GENERATE AI CONTENT
    const generateAiContent = async (value: FORM) => {
        setLoading(true);
        const selectedPrompt = template?.aiPrompt;
        const finalPrompt = JSON.stringify(value) + ' ' + selectedPrompt;
        const result = await chatSession.sendMessage(finalPrompt);
        if (result.response.text()) {
            // console.log(result.response.text());
            setAIGeneratedResult(result.response.text());
        }
        setLoading(false);
    }


    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-200 h-screen p-5">
            <ContentForm template={template} userFormInput={(value: FORM) => generateAiContent(value)} loading={loading} />
            <OutputGenerated aiGeneratedResult={aiGenerateResult} />
        </main>
    )
}