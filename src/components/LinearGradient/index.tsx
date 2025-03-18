import React from 'react';

export const LinearGradient = ({ id, offsetPoint }: { id: string, offsetPoint: string }) => {
    return (
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="green"/>
            <stop offset={offsetPoint} stopColor="green"/>
            <stop offset={offsetPoint} stopColor="red"/>
            <stop offset="100%" stopColor="red"/>
        </linearGradient>
    );
};

