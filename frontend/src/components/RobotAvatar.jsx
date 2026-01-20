import { useState, useEffect } from 'react';

/**
 * Robot Avatar Component
 * 
 * Animated robot head with blinking eyes and speaking animation
 * Used in the AI Tutor chatbot page
 */
const RobotAvatar = ({ isSpeaking = false }) => {
  const [eyeBlink, setEyeBlink] = useState(false);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Robot Head */}
      <div className="relative">
        {/* Main Head */}
        <div
          className={`w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-2xl 
                     flex items-center justify-center transition-all duration-300 ${
                       isSpeaking ? 'animate-pulse-slow scale-110' : ''
                     }`}
        >
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-6 bg-blue-600 rounded-t-full">
              <div className="w-3 h-3 bg-yellow-400 rounded-full -mt-1 mx-auto shadow-lg animate-pulse" />
            </div>
          </div>

          {/* Eyes Container */}
          <div className="flex space-x-4 mt-2">
            {/* Left Eye */}
            <div className="relative">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div
                  className={`w-4 h-4 bg-blue-600 rounded-full transition-all duration-150 ${
                    eyeBlink ? 'h-1' : ''
                  }`}
                />
              </div>
              {/* Eye Shine */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
            </div>

            {/* Right Eye */}
            <div className="relative">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div
                  className={`w-4 h-4 bg-blue-600 rounded-full transition-all duration-150 ${
                    eyeBlink ? 'h-1' : ''
                  }`}
                />
              </div>
              {/* Eye Shine */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
            </div>
          </div>

          {/* Mouth */}
          <div className="mt-3 flex justify-center">
            <div
              className={`w-12 h-4 bg-white rounded-full transition-all duration-300 ${
                isSpeaking ? 'animate-pulse' : ''
              }`}
            />
          </div>
        </div>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="absolute -right-4 top-8">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Robot Name */}
      <p className="mt-4 text-lg font-semibold text-gray-700">Robo Tutor</p>
    </div>
  );
};

export default RobotAvatar;
