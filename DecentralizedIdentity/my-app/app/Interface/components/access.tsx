'use client';
import React from "react";
import { useInputData } from "@/app/InputDataContext";
import axios from "axios";


interface IdentityProps {
    privateKey: string;
    publicKey: string;
}

const Access:  React.FC<IdentityProps> = ({publicKey, privateKey}) => {
    const { inputData, setInputData } = useInputData();
    // use the axios post method to send up the data
    
    return (
        <div>
            <p>Access</p>
            {/* let's provide the optios user can use for this  */}
            
        </div>
    )
}

export default Access;