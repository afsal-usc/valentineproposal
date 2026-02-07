"use client";
import { useState } from "react";

const FLOATING_HEARTS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  emoji: ["💕", "💗", "💖", "🩷", "❤️", "💘", "💝"][i % 7],
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 16 + 12}px`,
  duration: `${Math.random() * 8 + 8}s`,
  delay: `${Math.random() * 10}s`,
  opacity: Math.random() * 0.4 + 0.2,
}));

const FloatingHearts = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    {FLOATING_HEARTS.map((heart) => (
      <span
        key={heart.id}
        className="floating-heart"
        style={{
          left: heart.left,
          fontSize: heart.size,
          animationDuration: heart.duration,
          animationDelay: heart.delay,
          opacity: heart.opacity,
        }}
      >
        {heart.emoji}
      </span>
    ))}
  </div>
);

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  // No cap - let it grow infinitely!
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure? 🥺",
      "Like… really sure?",
      "What if I asked nicely?",
      "Pretty please? 💗",
      "With extra love on top?",
      "I can bring chocolates 🍫",
      "And maybe flowers too 🌹",
      "I’ll share my fries 🍟",
      "I’ll laugh at all your jokes 😌",
      "I’ll send you good morning texts ☀️",
      "You’re breaking a cute heart right now 🧸",
      "Last chance to make me very happy 👉👈",
      "Think again… carefully 😏",
      "This button is getting nervous",
      "The Yes button looks better though",
      "Are you trying to play hard to get?",
      "Okay but… we’d be really cute together",
      "Fine… I’ll wait right here 💕",
      "You know you want to press Yes 😌",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="bg-valentine-gradient-soft relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {yesPressed ? (
          <div className="animate-scale-in glass-card flex flex-col items-center rounded-3xl px-8 py-10 shadow-xl sm:px-12 sm:py-14">
            <div className="mb-2 text-4xl sm:text-5xl" aria-hidden="true">
              💖
            </div>
            <img
              className="mb-4 h-[180px] rounded-2xl sm:h-[220px]"
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              alt="Bears kissing celebration"
            />
            <div className="text-gradient-valentine font-romantic text-center text-3xl font-bold leading-snug sm:text-5xl">
              WOOOOOO!!!
            </div>
            <div className="text-gradient-valentine font-romantic mt-2 text-center text-2xl font-semibold sm:text-4xl">
              I love you pookie!! ;))
            </div>
            <div className="mt-4 flex gap-2 text-2xl" aria-hidden="true">
              <span className="animate-bounce-gentle">💗</span>
              <span className="animate-bounce-gentle" style={{ animationDelay: "0.2s" }}>💕</span>
              <span className="animate-bounce-gentle" style={{ animationDelay: "0.4s" }}>💖</span>
              <span className="animate-bounce-gentle" style={{ animationDelay: "0.6s" }}>💗</span>
              <span className="animate-bounce-gentle" style={{ animationDelay: "0.8s" }}>💕</span>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up glass-card relative flex flex-col items-center overflow-hidden rounded-3xl px-8 py-10 shadow-xl sm:px-12 sm:py-14">
            <div className="relative z-10 flex flex-col items-center">
              <img
                className="mb-4 h-[180px] rounded-2xl sm:h-[220px]"
                src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                alt="Cute bear with roses"
              />
              <h1 className="text-gradient-valentine font-romantic mb-6 pb-2 text-center text-4xl font-bold leading-normal sm:text-5xl md:text-6xl">
                Will you be my Valentine?
              </h1>
            </div>
            
            {/* Buttons container - Yes grows upward, No stays at bottom */}
            <div className="relative z-20 flex w-full flex-col items-center gap-4">
              <button
                className="btn-yes cursor-pointer rounded-full px-8 py-3 font-bold tracking-wide text-white transition-all"
                style={{ fontSize: yesButtonSize }}
                onClick={() => setYesPressed(true)}
                aria-label="Yes, I will be your Valentine"
                tabIndex={0}
              >
                Yes 💖
              </button>
              <button
                onClick={handleNoClick}
                className="btn-no relative z-30 cursor-pointer rounded-full px-6 py-3 font-semibold"
                aria-label="No, decline valentine request"
                tabIndex={0}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
            
            <p
              className="relative z-20 mt-4 font-romantic text-sm italic text-valentine-400 opacity-60"
              style={{ transform: "rotate(-2deg)" }}
              aria-hidden="true"
            >
              psst... I dare you to say no 😏
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
