'use client'
import { useState } from "react";
import SearchTemplates from "./_components/SearchTemplates";
import Templates from "./_components/Templates";

export default function Dashboard(){
    const [searchValue, setSearchValue] = useState<string>('');
    return(
        <main>
            <SearchTemplates searchInput={(value:string) => setSearchValue(value)}/>
            <Templates searchValue={searchValue} />
        </main>
    )

}