/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  useRef, useState } from "react";
import axios from 'axios';

export default function WebScraping() {
    const [searchPrompt, setSearchPrompt] = useState<string>('');
    const [scrapedData, setScrapedData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [lines, setLines] = useState(['Welcome to scraping world']);
    const inputRef = useRef(null);
    console.log(loading);
    
    // useEffect(() => {
    //     inputRef.current && inputRef?.current?.focus();
    // }, []);

    async function scrapeData(url: string, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (searchPrompt.trim()) {
            setLines([...lines, `${searchPrompt}`]);
            setSearchPrompt('');
        }
        setLoading(true);
        try {
            if (!url) return alert('Please enter url');
            const res = await axios.get(`/api/scrapeData?url=${encodeURIComponent(url)}`);
            console.log(res);
            if (!res) return alert('no data found');
            if (res.status === 200 && res.data) {
                setScrapedData(res.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    // https://www.bbc.com/news
    return (
        <main className="flex flex-col items-center pt-10 gap-5 font-mono">
            <div onClick={() =>''} className="flex flex-col  gap-5 border-2 border-white text-green-400 w-7/12 h-[600px] p-8 text-xl rounded-lg overflow-y-auto shadow-inner">
                {
                    lines.map((line, idx) =>
                        <div key={idx}>{line}</div>
                    )
                }
                <form onSubmit={(event) => scrapeData(searchPrompt, event)} className="flex flex-col">
                    <div>
                        {/* <h4 className="w-32">Enter URL $</h4> */}
                        <span className="mr-1">&gt;</span>
                        <Input type="text" ref={inputRef} value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} placeholder="Enter URI..." className="border-none outline-none bg-inherit focus-visible:ring-0" />
                    </div>
                    {
                        scrapedData.map((data, idx) =>
                            <h1 key={idx} className="font-semibold ">{data}</h1>
                        )
                    }
                </form>

                {/* <span className="ml-1 w-[10px] animate-blink">|</span> */}

                {/* <Button onClick={() => scrapeData(searchPrompt)} variant={'default'} className="w-fit">{loading ? 'Loading...' : 'Scrap'}</Button> */}
            </div>
            {/* <div className="flex flex-col  gap-1 border-2 border-white text-green-400 w-7/12 h-96 p-8 text-xl rounded-lg overflow-scroll">
               
            </div> */}
        </main>
    )
}