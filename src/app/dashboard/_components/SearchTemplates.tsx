
import { Search } from "lucide-react";


// interface PROPS{
//     searchInput: ()=> void
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchTemplates( searchInput :any) {

    return (
        <main>
            <div className=" flex flex-col gap-y-8 items-center justify-center bg-gradient-to-tr from-fuchsia-800 via-purple-400 to-purple-600 py-8">
                <div className="flex flex-col items-center gap-2 text-white">
                    <h5 className="text-5xl font-semibold">Browse all templates</h5>
                    <p className="">Get templates for your usage.</p>
                </div>
                <div className="flex items-center gap-2 bg-white border-gray-300 border p-2 rounded-lg w-96 ">
                    <Search />
                    <input type="text" name="" placeholder='search...' onChange={(e) => searchInput(e.target.value) } className=" outline-none w-full " />
                </div>

            </div>
        </main>
    )
} 