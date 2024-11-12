import React from 'react';
import './avatar.css'

function Avatar({ name, available }: { name: string, available: boolean }) {
    const text = React.useMemo(() => {
        return name.split(" ").map((item: string) => item[0]).join("");
    }, [name]);

    return (
        <div className='avatar-container'>
            <div className='avatar-text'>{text}</div>
            <div className={`user-status ${available && "available"}`}></div>
        </div>
    );
}

export default Avatar;
