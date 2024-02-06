'use client';
import React, {useState} from "react";
import Access from './access';
import Denied from './denied';
import styles from '../page.module.css';
interface PermissionPros {
    privateKey: string,
    publicKey: string
}

const Permission: React.FC<PermissionPros> = ({privateKey, publicKey}) => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const handleButtonClick = (component: string) => {
        setSelectedComponent(component);
        setSelectedButton(component);
    };
    return (
        <div>
            <p>Permission component</p>
            <p>{privateKey}</p>
            <p>{publicKey}</p>
            <div className={styles.navigationButtons}>
                <button onClick={() => handleButtonClick('Access')}
                className={selectedButton === 'Access' ? styles.selectedButton : ''}
                >Access</button>
                <button onClick={() => handleButtonClick('Denied')}
                 className={selectedButton === 'Denied' ? styles.selectedButton : ''}
                >Denied</button>
            </div>
            {/* Here i would show two component also one is allowed accesss and another is denied access */}
            <div>
                {/* here the choosen component would render up */}
                {selectedComponent === 'Access' && <Access publicKey={publicKey} privateKey={privateKey} />}
                {selectedComponent === 'Denied' && <Denied publicKey={publicKey} privateKey={privateKey} />}
            </div>
        </div>
    )
}

export default Permission;