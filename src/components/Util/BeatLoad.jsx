

import  BeatLoader from "react-spinners/BeatLoader";
import "./loader.scss"

export default function BeatLoad({loading,size}){
    return (
        <div className="loader">
            <BeatLoader
                color="#ddd"
                size={size}
                loading ={loading}
                aria-label="Loading Spinner"

            />
        </div>
    )
}