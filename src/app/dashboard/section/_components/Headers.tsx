import { Search } from "lucide-react";


export default function Headers() {
    return (
        <main className="p-5 border-b flex  justify-between">
            <div className="flex items-center gap-2 bg-inherit border-gray-300 border p-2 rounded-lg max-w-xl ">
                <Search />
                <input type="text" name="" placeholder='search...' className=" outline-none " />
            </div>
            <div>
                <p className="bg-black text-white rounded-xl p-3 font-semibold ">get Subscribe at $10.80</p>
            </div>
        </main>
    )
}