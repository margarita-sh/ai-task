// src/components/PerformanceGauge.tsx

import React from 'react';

interface PerformanceGaugeProps {
  score: number;
}

const PerformanceGauge: React.FC<PerformanceGaugeProps> = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const scoreColor = score >= 90 ? 'text-green-500' : score >= 50 ? 'text-green-400' : 'text-orange-400';
  const strokeColor = score >= 90 ? 'stroke-green-500' : score >= 50 ? 'stroke-green-400' : 'stroke-orange-400';

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background Circle */}
        <circle
          className="stroke-current text-green-800/50"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          fill="transparent"
        />
        {/* Foreground Circle */}
        <circle
          className={`transform -rotate-90 origin-center ${strokeColor}`}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute text-5xl font-light ${scoreColor}`}>
        {score}
      </span>
    </div>
  );
};

export default PerformanceGauge;