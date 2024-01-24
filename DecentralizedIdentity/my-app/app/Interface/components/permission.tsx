'use client';
import React from "react";

interface PermissionPros {
    privateKey: string,
    publicKey: string
}

const Permission: React.FC<PermissionPros> = ({privateKey, publicKey}) => {
    return (
        <div>
            <p>Permission component</p>
            <p>{privateKey}</p>
            <p>{publicKey}</p>
        </div>
    )
}

export default Permission;