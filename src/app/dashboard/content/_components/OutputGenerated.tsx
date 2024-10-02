"use client"
import { Button } from '@/components/ui/button';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { useEffect, useRef } from 'react';


interface PROPS{
    aiGeneratedResult: string;
}
export default function OutputGenerated({ aiGeneratedResult }: PROPS) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef: any = useRef(null);

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(aiGeneratedResult);
    }, [aiGeneratedResult])
    return (
        <main className='bg-white rounded-lg border-2 drop-shadow-2xl'>
            <div className='flex justify-between items-center py-6 px-12'>
                <h4 className='text-xl font-semibold'>Your Result</h4>
                <Button className='uppercase font-semibold'><Copy />&nbsp;&nbsp; copy</Button>
            </div>
            <Editor
                ref={editorRef}
                initialValue="Result will be displayed here"
                // previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"  //WYSIWYG  & markdown
                useCommandShortcut={true}
                onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
            />
        </main>
    )
}