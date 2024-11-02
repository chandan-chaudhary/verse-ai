'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from 'axios';

export default function WebScraping() {
    const [searchPrompt, setSearchPrompt] = useState<string>('');
    const [scrapedData, setScrapedData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    async function scrapeData(url: string) {
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
        <main className="flex flex-col items-center pt-10 gap-5">
            <div className="flex flex-col  gap-5 border-2 border-white text-green-400 w-7/12 p-8 text-xl rounded-lg">
                <div className="flex items-center gap-3 ">
                    <h4 className="w-32">Enter URL $</h4>
                    <Input value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} placeholder="Enter URI..." className="border-none outline-none bg-inherit focus-visible:ring-0" />
                </div>
                <Button onClick={() => scrapeData(searchPrompt)} variant={'default'} className="w-fit">{loading ? 'Loading...' : 'Scrap'}</Button>
            </div>
            <div className="lex flex-col  gap-1 border-2 border-white text-green-400 w-7/12 h-96 p-8 text-xl rounded-lg overflow-scroll">
                {
                    scrapedData.map((data, idx) =>
                        <h1 key={idx} className="font-semibold ">{data}</h1>
                    )
                }
            </div>
        </main>
    )
}