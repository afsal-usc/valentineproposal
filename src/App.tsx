"use client";
import { useState, useEffect } from "react";

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
  const [valentineName, setValentineName] = useState("");
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [nameInput, setNameInput] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  // No cap - let it grow infinitely!
  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    // Check if there's a 'to' parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get("to");
    
    if (nameFromUrl) {
      setValentineName(nameFromUrl);
      setShowLandingPage(false);
    }
  }, []);

  const handleGenerateLink = () => {
    if (!nameInput.trim()) return;
    
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?to=${encodeURIComponent(nameInput.trim())}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

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

  const noButtonText = noCount === 0 ? "No" : getNoButtonText();

  // Landing page for creating personalized link
  if (showLandingPage) {
    return (
      <div className="bg-valentine-gradient-soft relative min-h-screen overflow-y-auto py-8">
        <FloatingHearts />
        
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
          <div className="animate-fade-in-up glass-card flex flex-col items-center rounded-3xl px-8 py-10 shadow-xl sm:px-12 sm:py-14">
            <div className="mb-4 text-5xl" aria-hidden="true">💝</div>
            
            <h1 className="text-gradient-valentine font-romantic mb-3 text-center text-4xl font-bold leading-normal sm:text-5xl">
              Ask Your Valentine
            </h1>
            
            <p className="mb-6 text-center text-valentine-800 opacity-80">
              Create a personalized link to pop the question!
            </p>

            {!generatedLink ? (
              <div className="w-full max-w-md">
                <label htmlFor="valentine-name" className="mb-2 block text-center font-semibold text-valentine-900">
                  Your Valentine's Name
                </label>
                <input
                  id="valentine-name"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateLink()}
                  placeholder="e.g., Sarah"
                  className="mb-4 w-full rounded-full border-2 border-valentine-300 bg-white/80 px-6 py-3 text-center text-lg font-medium text-valentine-900 outline-none transition-all focus:border-valentine-500 focus:ring-2 focus:ring-valentine-200"
                  autoFocus
                />
                <button
                  onClick={handleGenerateLink}
                  disabled={!nameInput.trim()}
                  className="btn-yes w-full cursor-pointer rounded-full px-8 py-3 text-lg font-bold tracking-wide text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Generate Link 💖
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <div className="mb-4 rounded-2xl bg-white/90 p-4">
                  <p className="mb-2 text-center text-sm font-semibold text-valentine-900">
                    Your Shareable Link:
                  </p>
                  <p className="break-all rounded-lg bg-valentine-50 p-3 text-center text-sm text-valentine-800">
                    {generatedLink}
                  </p>
                </div>
                
                <button
                  onClick={handleCopyLink}
                  className="btn-yes relative w-full cursor-pointer rounded-full px-8 py-3 text-lg font-bold tracking-wide text-white transition-all"
                >
                  {showCopied ? "Copied! ✓" : "Copy Link 📋"}
                </button>
                
                <button
                  onClick={() => {
                    setGeneratedLink("");
                    setNameInput("");
                  }}
                  className="btn-no mt-3 w-full cursor-pointer rounded-full px-6 py-3 font-semibold"
                >
                  Create Another
                </button>
              </div>
            )}

            <p
              className="mt-6 font-romantic text-sm italic text-valentine-700 opacity-70"
              style={{ transform: "rotate(-2deg)" }}
            >
              psst... they won't be able to refuse 😏
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main valentine proposal page
  return (
    <div className="bg-valentine-gradient-soft relative min-h-screen overflow-y-auto py-8">
      <FloatingHearts />

      <div className={`relative z-10 flex flex-col items-center justify-center px-4 ${noCount >= 5 ? 'pb-28 sm:pb-4' : 'pb-4'}`}>
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
          <>
            {/* Card with GIF, heading, and buttons */}
            <div className="animate-fade-in-up glass-card flex flex-col items-center rounded-3xl px-8 py-10 shadow-xl sm:px-12 sm:py-14">
              <img
                className="mb-4 h-[180px] rounded-2xl sm:h-[220px]"
                src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                alt="Cute bear with roses"
              />
              <h1 className="text-gradient-valentine font-romantic mb-6 pb-2 text-center text-4xl font-bold leading-normal sm:text-5xl md:text-6xl">
                {valentineName ? `${valentineName}, will you be my Valentine?` : "Will you be my Valentine?"}
              </h1>

              {/* First 5 clicks (noCount 0-4): Show buttons side by side */}
              {noCount < 5 ? (
                <div className="flex flex-wrap items-center justify-center gap-4">
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
                    className="btn-no cursor-pointer rounded-full px-6 py-3 font-semibold"
                    aria-label="No, decline valentine request"
                    tabIndex={0}
                  >
                    {noButtonText}
                  </button>
                </div>
              ) : (
                <>
                  {/* After 5 No clicks: Just show Yes button in card on mobile */}
                  <button
                    className="btn-yes cursor-pointer rounded-full px-8 py-3 font-bold tracking-wide text-white transition-all"
                    style={{ fontSize: yesButtonSize }}
                    onClick={() => setYesPressed(true)}
                    aria-label="Yes, I will be your Valentine"
                    tabIndex={0}
                  >
                    Yes 💖
                  </button>

                  {/* No button — desktop only (inline in card) when noCount >= 5 */}
                  <div className="mt-4 hidden flex-col items-center sm:flex">
                    <button
                      onClick={handleNoClick}
                      className="btn-no cursor-pointer rounded-full px-6 py-3 font-semibold"
                      aria-label="No, decline valentine request"
                      tabIndex={0}
                    >
                      {noButtonText}
                    </button>
                    <p
                      className="mt-4 font-romantic text-sm italic text-valentine-700 opacity-80"
                      style={{ transform: "rotate(-2deg)" }}
                      aria-hidden="true"
                    >
                      psst... I dare you to say no 😏
                    </p>
                  </div>
                </>
              )}

              {/* "Dare" text for first 5 clicks */}
              {noCount < 5 && (
                <p
                  className="mt-4 font-romantic text-sm italic text-valentine-700 opacity-80"
                  style={{ transform: "rotate(-2deg)" }}
                  aria-hidden="true"
                >
                  psst... I dare you to say no 😏
                </p>
              )}
            </div>

            {/* No button — mobile only (fixed to bottom) ONLY after 5 No clicks */}
            {noCount >= 5 && (
              <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center bg-gradient-to-t from-[#fce4ec] via-[#fce4ec]/95 to-transparent pb-5 pt-8 sm:hidden">
                <button
                  onClick={handleNoClick}
                  className="btn-no cursor-pointer rounded-full px-6 py-3 font-semibold shadow-md"
                  aria-label="No, decline valentine request"
                  tabIndex={0}
                >
                  {noButtonText}
                </button>
                <p
                  className="mt-2 font-romantic text-sm italic text-valentine-700 opacity-80"
                  style={{ transform: "rotate(-2deg)" }}
                  aria-hidden="true"
                >
                  psst... I dare you to say no 😏
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
