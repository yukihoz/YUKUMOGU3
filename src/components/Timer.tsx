import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // in seconds
  isPlaying: boolean;
  onComplete: () => void;
  onTick: (timeLeft: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, isPlaying, onComplete, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTick(newTime);
        if (newTime <= 0) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, onComplete, onTick]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-display" style={{ fontSize: '4rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#333' }}>
      {formatTime(timeLeft)}
    </div>
  );
};
