import React from 'react';
import './Character.css';

interface CharacterProps {
    isEating: boolean;
}

export const Character: React.FC<CharacterProps> = ({ isEating }) => {
    return (
        <div className={`character ${isEating ? 'eating' : ''}`}>
            <div className="pixel-art">
                <div className="body">
                    <div className="eye"></div>
                    <div className="blush"></div>
                    <div className="mouth"></div>
                </div>
            </div>
        </div>
    );
};
