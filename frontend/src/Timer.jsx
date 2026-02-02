import React, { useState, useEffect, useRef } from 'react';

// Base64 encoded beep sound (short, simple beep)
const beepSound = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA";

const Timer = ({ initialSeconds = 30 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef(null);

  // Create beep sound using Web Audio API
  const playBeep = () => {
    try {
      // Method 1: Using Web Audio API (most reliable)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
    } catch (error) {
      console.log('Web Audio API not supported, trying fallback...');
      // Fallback: Try to play using HTML5 Audio with base64
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          console.log('Audio play failed:', e);
        });
      }
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      clearInterval(interval);
      // Play sound when timer ends
      playBeep();
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(initialSeconds);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = ((initialSeconds - seconds) / initialSeconds) * 100;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Timer: {initialSeconds}s</h2>
      
      {/* Progress Circle */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBackground}>
          <div style={styles.progressText}>{formatTime(seconds)}</div>
        </div>
        <div 
          style={{
            ...styles.progressFill,
            background: `conic-gradient(#4CAF50 ${progress}%, #e0e0e0 ${progress}% 100%)`
          }}
        />
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        {!isActive ? (
          <button style={styles.button} onClick={startTimer}>
            Start
          </button>
        ) : (
          <>
            <button style={styles.button} onClick={pauseTimer}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button style={{...styles.button, ...styles.resetButton}} onClick={resetTimer}>
              Reset
            </button>
          </>
        )}
      </div>

      {/* Hidden audio element as fallback */}
      <audio 
        ref={audioRef} 
        preload="auto"
        src={beepSound}
      />

      <div style={styles.info}>
        <p>Status: {!isActive ? 'Not started' : isPaused ? 'Paused' : 'Running'}</p>
        {seconds === 0 && isActive && (
          <p style={styles.completeText}>Time's up! 🔔</p>
        )}
      </div>
    </div>
  );
};

// Styles (same as before)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: '#333',
    marginBottom: '2rem',
  },
  progressContainer: {
    position: 'relative',
    width: '200px',
    height: '200px',
    marginBottom: '2rem',
  },
  progressBackground: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    right: '10px',
    bottom: '10px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  progressText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    zIndex: 1,
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    minWidth: '80px',
    transition: 'background-color 0.3s',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  info: {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
  },
  completeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
};

export default Timer;