import React, { useState, useEffect } from "react";

/**
 * A 5-second splash/blessing screen featuring Guru Raghavendra Swamy,
 * shown once per session when the website first loads.
 */
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Begin fade-out at 1.6 s, then unmount at 2 s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const doneTimer = setTimeout(onComplete, 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      id="splash-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at top, rgba(255, 240, 205, 0.15), transparent 40%), radial-gradient(ellipse at center, #2f1810 0%, #100904 60%, #090402 100%)",
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
              "radial-gradient(circle, rgba(234,183,99,0.35) 0%, rgba(234,183,99,0) 70%)",
            animation: "splashPulse 2s ease-in-out infinite",
          }}
        />

        {/* Image container */}
        <div
          className="relative rounded-full overflow-hidden border-4 shadow-2xl"
          style={{
            width: 210,
            height: 210,
            borderColor: "rgba(255,230,165,0.65)",
            boxShadow:
              "0 0 80px rgba(255,230,165,0.25), 0 0 140px rgba(255,230,165,0.08)",
            animation:
              "splashSlideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
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
        className="mt-6 text-center font-heritage text-lg sm:text-xl md:text-2xl tracking-wide"
        style={{
          color: "#FFD88E",
          textShadow: "0 3px 16px rgba(255,216,142,0.35)",
          animation: "splashFloatUp 0.9s ease-out 0.2s forwards",
          opacity: 0,
        }}
      >
        ॥ ಶ್ರೀ ರಾಘವೇಂದ್ರ ಸ್ವಾಮಿ ॥
      </p>
      <p
        className="mt-2 text-center text-sm sm:text-base tracking-widest uppercase font-semibold"
        style={{
          color: "rgba(255,216,142,0.75)",
          animation: "splashFloatUp 0.9s ease-out 0.35s forwards",
          opacity: 0,
        }}
      >
        Blessings in a New Light
      </p>

      {/* "Skip" button — subtle, bottom right */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-xs tracking-widest uppercase font-semibold px-4 py-2 rounded-full border transition-colors"
        style={{
          color: "rgba(234,183,99,0.5)",
          borderColor: "rgba(234,183,99,0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(234,183,99,0.9)";
          e.currentTarget.style.borderColor = "rgba(234,183,99,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(234,183,99,0.5)";
          e.currentTarget.style.borderColor = "rgba(234,183,99,0.2)";
        }}
      >
        Skip
      </button>

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes splashPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(1.2); opacity: 1;   }
        }
        @keyframes splashSlideIn {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1);    }
        }
        @keyframes splashFloatUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
