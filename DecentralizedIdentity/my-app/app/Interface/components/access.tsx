import React from "react";
import { useInputData } from "@/app/InputDataContext";
interface IdentityProps {
    privateKey: string;
    publicKey: string;
}

const Access:  React.FC<IdentityProps> = ({publicKey, privateKey}) => {
    const { inputData, setInputData } = useInputData();
    return (
        <div>
            <p>Access</p>
            <p>Email is: {inputData}</p>
        </div>
    )
}

export default Access;