import { useState, useCallback, useEffect } from 'react';
import { Timer } from './components/Timer';
import { Food } from './components/Food';
import './App.css';

const FOOD_ITEMS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🍍', '🥝', '🍔', '🍕', '🌭', '🥪', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🍡', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯'];

function App() {
    const [duration, setDuration] = useState(600); // Default 10 minutes
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFoodIndex, setCurrentFoodIndex] = useState(-1);

    // Initialize with a random food item once
    const [currentFoodEmoji, setCurrentFoodEmoji] = useState(() => FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)]);

    const EATING_INTERVAL = 10; // Eat every 10 seconds
    const totalFoodItems = Math.ceil(duration / EATING_INTERVAL);

    const handleStart = () => {
        setIsPlaying(true);
        setCurrentFoodIndex(0); // Start with the first item
    };

    const handleStop = () => {
        setIsPlaying(false);
    };

    const handleTick = useCallback((timeLeft: number) => {
        const timeElapsed = duration - timeLeft;
        const newIndex = Math.floor(timeElapsed / EATING_INTERVAL);

        if (newIndex !== currentFoodIndex && newIndex < totalFoodItems) {
            setCurrentFoodIndex(newIndex);
        }
    }, [duration, currentFoodIndex, totalFoodItems]);

    const handleComplete = () => {
        setIsPlaying(false);
        setCurrentFoodIndex(totalFoodItems); // All eaten
        alert('Time is up! Great job maintaining your rhythm.');
    };

    // Reset when duration changes
    useEffect(() => {
        if (!isPlaying) {
            setCurrentFoodIndex(-1);
        }
    }, [duration, isPlaying]);

    const handleShuffle = () => {
        const randomFood = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
        setCurrentFoodEmoji(randomFood);
    };

    return (
        <div className="app-container">
            <h1>Slow Eating Rhythm</h1>

            <button
                onClick={handleShuffle}
                disabled={isPlaying}
                className="shuffle-button"
                style={{
                    marginBottom: '20px',
                    backgroundColor: isPlaying ? '#E0E0E0' : '#B2CEFE', /* Pastel Blue */
                }}
            >
                Shuffle Food 🔀
            </button>

            {/* Game area removed, character is now part of the food list */}

            <div className="food-container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '800px',
                margin: '20px auto',
                padding: '20px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: '15px',
                minHeight: '200px'
            }}>
                {Array.from({ length: totalFoodItems }).map((_, index) => (
                    <Food
                        key={index}
                        emoji={currentFoodEmoji}
                        showCharacter={index === currentFoodIndex}
                        isPlaying={isPlaying}
                        state={
                            index < currentFoodIndex ? 'eaten' :
                                index === currentFoodIndex && isPlaying ? 'active' :
                                    'uneaten'
                        }
                    />
                ))}
            </div>

            <Timer
                duration={duration}
                isPlaying={isPlaying}
                onComplete={handleComplete}
                onTick={handleTick}
            />

            <div className="controls">
                {!isPlaying ? (
                    <button onClick={handleStart}>Start Eating</button>
                ) : (
                    <button onClick={handleStop}>Pause</button>
                )}

                <div className="settings">
                    <label>
                        Duration (minutes):
                        <input
                            type="number"
                            value={duration / 60}
                            onChange={(e) => setDuration(Number(e.target.value) * 60)}
                            disabled={isPlaying}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default App;
