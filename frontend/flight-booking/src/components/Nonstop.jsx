import { useState, useEffect } from "react";

function Nonstop({ setNonstop }) {
    const [nonstop, setNonstopState] = useState(true);
    
    const handleClickYes = () => {
        setNonstopState(true);
    }

    const handleClickNo = () => {
        setNonstopState(false);
    }

    useEffect(() => {
        setNonstop(nonstop);
        console.log(nonstop);
    }, [nonstop, setNonstop]);

    return (
        <div className="flex space-x-2 p-2 pb-0 rounded-md">
            <div>
                <p className="mb-2 font-medium">NonStop:</p>
            </div>
            <div className="space-x-2">
                <button
                    type="button"
                    className={`px-6 py-1 rounded-md text-white ${nonstop ? 'bg-gray-950' : 'bg-slate-300'}`}
                    onClick={handleClickYes}
                >
                    Yes
                </button>
                <button
                    type="button"
                    className={`px-6 py-1 rounded-md text-white ${nonstop ? 'bg-slate-300' : 'bg-gray-950'}`}
                    onClick={handleClickNo}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default Nonstop;
