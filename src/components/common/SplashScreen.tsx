import React, { useState, useEffect } from 'react';

/**
 * A 5-second splash/blessing screen featuring Guru Raghavendra Swamy,
 * shown once per session when the website first loads.
 */
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Begin fade-out at 4.2 s, then unmount at 5 s
    const fadeTimer = setTimeout(() => setFadeOut(true), 4200);
    const doneTimer = setTimeout(onComplete, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      id="splash-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at center, #3a2215 0%, #1e110a 55%, #0f0804 100%)',
      }}
    >
      {/* Outer glow ring */}
      <div className="relative flex items-center justify-center">
        {/* Animated pulsing halo */}
        <div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            background:
              'radial-gradient(circle, rgba(234,183,99,0.35) 0%, rgba(234,183,99,0) 70%)',
            animation: 'splashPulse 2s ease-in-out infinite',
          }}
        />

        {/* Image container */}
        <div
          className="relative rounded-full overflow-hidden border-4 shadow-2xl"
          style={{
            width: 200,
            height: 200,
            borderColor: 'rgba(234,183,99,0.6)',
            boxShadow: '0 0 60px rgba(234,183,99,0.3), 0 0 120px rgba(234,183,99,0.1)',
            animation: 'splashFadeUp 1.2s ease-out forwards',
          }}
        >
          <img
            src="/images/raghavendra-swamy.jpg"
            alt="Guru Raghavendra Swamy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Blessing text */}
      <p
        className="mt-8 text-center font-heritage text-lg sm:text-xl md:text-2xl tracking-wide"
        style={{
          color: '#EAB763',
          textShadow: '0 2px 12px rgba(234,183,99,0.4)',
          animation: 'splashFadeUp 1.4s ease-out 0.3s forwards',
          opacity: 0,
        }}
      >
        ॥ ಶ್ರೀ ರಾಘವೇಂದ್ರ ಸ್ವಾಮಿ ॥
      </p>
      <p
        className="mt-2 text-center text-sm sm:text-base tracking-widest uppercase font-semibold"
        style={{
          color: 'rgba(234,183,99,0.65)',
          animation: 'splashFadeUp 1.4s ease-out 0.6s forwards',
          opacity: 0,
        }}
      >
        Sri Raghavendra Swamy's Blessings
      </p>

      {/* "Skip" button — subtle, bottom right */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-xs tracking-widest uppercase font-semibold px-4 py-2 rounded-full border transition-colors"
        style={{
          color: 'rgba(234,183,99,0.5)',
          borderColor: 'rgba(234,183,99,0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'rgba(234,183,99,0.9)';
          e.currentTarget.style.borderColor = 'rgba(234,183,99,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(234,183,99,0.5)';
          e.currentTarget.style.borderColor = 'rgba(234,183,99,0.2)';
        }}
      >
        Skip
      </button>

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes splashPulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%      { transform: scale(1.15); opacity: 1;   }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
