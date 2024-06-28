import React, { useState, useEffect } from 'react';

const CountUpTimer = ({ startDate }) => {
  const calculateTimeElapsed = () => {
    const difference = +new Date() - +new Date(startDate);
    let timeElapsed = {};

    if (difference > 0) {
      timeElapsed = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeElapsed;
  };

  const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-row items-center min-h-full  p-4">
      <h1 className="text-2xl font-bold mr-[640px]">TIME ELAPSED</h1>
      <div className="flex justify-center space-x-4">
        {Object.keys(timeElapsed).length ? (
          Object.keys(timeElapsed).map((interval) => (
            <div key={interval} className="flex flex-col items-center p-2 bg-white shadow-md rounded-lg">
              <span className="text-4xl font-bold">{timeElapsed[interval]}</span>
              <span className="text-md">{interval.charAt(0).toUpperCase() + interval.slice(1)}</span>
            </div>
          ))
        ) : (
          <span className="text-4xl">Not started yet!</span>
        )}
      </div>
    </div>
  );
};

export default CountUpTimer;
