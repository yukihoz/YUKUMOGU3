import React from 'react';
import { Character } from './Character';

interface FoodProps {
    state: 'uneaten' | 'eaten' | 'active';
    emoji: string;
    showCharacter: boolean;
    isPlaying: boolean;
}

export const Food: React.FC<FoodProps> = ({ state, emoji, showCharacter, isPlaying }) => {
    return (
        <div
            className={`food-item ${state}`}
            style={{
                fontSize: '2rem',
                opacity: state === 'eaten' ? 0.3 : 1,
                filter: state === 'eaten' ? 'grayscale(100%)' : 'none',
                transform: state === 'active' ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px',
                width: '60px',
                height: '60px',
                position: 'relative'
            }}
        >
            {emoji}
            {showCharacter && (
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '-20px',
                    transform: 'scale(0.5)',
                    zIndex: 10,
                    pointerEvents: 'none'
                }}>
                    <Character isEating={isPlaying} />
                </div>
            )}
        </div>
    );
};
