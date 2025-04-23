import React, { useEffect, useState } from 'react';

const Speedometer = ({ value, maxValue = 100, unit = 'Mbps', color = '#3b82f6' }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Calculate the rotation angle (225 degrees is the start position, 315 degrees is the range)
  const getRotationAngle = (val) => {
    const percentage = Math.min(val / maxValue, 1);
    return 225 + (percentage * 315);
  };
  
  // Determine color based on percentage
  const getColor = (val) => {
    if (color) return color;
    
    const percentage = Math.min(val / maxValue, 1);
    if (percentage < 0.3) return '#ef4444'; // Red for slow
    if (percentage < 0.7) return '#f59e0b'; // Yellow/Orange for medium
    return '#10b981'; // Green for fast
  };
  
  // Animate the value change
  useEffect(() => {
    const step = Math.max(value, 0.1) / 30; // Divide animation into 30 steps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        clearInterval(timer);
        setAnimatedValue(value);
      } else {
        setAnimatedValue(current);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [value]);
  
  // Get evaluation text based on speed
  const getEvaluationText = () => {
    const percentage = Math.min(value / maxValue, 1);
    
    if (percentage < 0.1) return 'Very Slow';
    if (percentage < 0.3) return 'Slow';
    if (percentage < 0.6) return 'Average';
    if (percentage < 0.8) return 'Fast';
    return 'Very Fast';
  };
  
  const rotationAngle = getRotationAngle(animatedValue);
  const speedometerColor = getColor(animatedValue);
  
  return (
    <div className="speedometer">
      {/* Background gauge */}
      <div className="gauge-bg"></div>
      
      {/* Colored fill */}
      <div 
        className="gauge-fill" 
        style={{ 
          background: speedometerColor,
          transform: `rotate(${rotationAngle}deg)`
        }}
      ></div>
      
      {/* Center with value */}
      <div className="gauge-center">
        <div className="text-3xl font-bold">{animatedValue.toFixed(1)}</div>
        <div className="text-gray-500">{unit}</div>
        <div 
          className="text-sm font-medium mt-2" 
          style={{ color: speedometerColor }}
        >
          {getEvaluationText()}
        </div>
      </div>
      
      {/* Tick marks */}
      <svg viewBox="0 0 200 100" className="absolute top-0 left-0 w-full">
        {[...Array(11)].map((_, i) => {
          const percentage = i / 10;
          const angle = -45 + (percentage * 270); // Convert to SVG coordinates
          const radian = (angle * Math.PI) / 180;
          const x1 = 100 + 80 * Math.cos(radian);
          const y1 = 100 + 80 * Math.sin(radian);
          const x2 = 100 + 90 * Math.cos(radian);
          const y2 = 100 + 90 * Math.sin(radian);
          
          const isMajor = i % 5 === 0;
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#cbd5e1"
              strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Speedometer; 