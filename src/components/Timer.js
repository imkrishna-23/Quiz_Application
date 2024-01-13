// src/components/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimerComplete }) => {
  // State to track the time remaining
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    // Set up an interval to update the timer every second
    const interval = setInterval(() => {
      // Check if time is remaining
      if (timeRemaining > 0) {
        // Decrease the time remaining by 1 second
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        // Timer reached 0, handle timer completion logic here
        clearInterval(interval); // Stop the interval
        onTimerComplete(); // Call the callback when the timer completes
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining, onTimerComplete]);

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='text-bold text-center mt-2'>
      {/* Display the formatted time remaining */}
      <p className='text-lg'>Time Remaining: {formatTime(timeRemaining)}</p>
    </div>
  );
};

export default Timer;
