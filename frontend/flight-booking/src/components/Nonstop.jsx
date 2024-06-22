import { useState,useEffect } from "react";

function Nonstop({setNonstop}){
    const [nonstop,setnonstop] = useState(true);
    
    const handleClickYes = () =>{
        setnonstop(true);
    }

    const handleClickNo = () =>{
        setnonstop(false);
    }

    useEffect(()=> {
        setNonstop(nonstop);
        console.log(nonstop);
    },[nonstop])

    return(
        <div className="flex space-x-2 p-2 pb-0 rounded-md">
            <div>
                <p className="mb-2 font-medium">NonStop:</p>
            </div>
            <div className="space-x-2">
                <button type="button" className={`px-6 py-1 bg-slate-300 rounded-md text-white ${nonstop ? 'bg-gray-950' : null }`} onClick={handleClickYes}>Yes</button>
                <button type="button" className={`px-6 py-1 bg-slate-300 rounded-md text-white ${nonstop ? null : 'bg-gray-950' }`} onClick={handleClickNo}>No</button>
            </div>

        </div>
    )
}

export default Nonstop