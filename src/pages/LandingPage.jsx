import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
  const starsContainer = document.getElementById("stars");
  const MAX_STARS = 60;

  function createStar() {
    if (!starsContainer) return;

    // limit stars on screen
    if (starsContainer.children.length >= MAX_STARS) return;

    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 8 + 8;
    star.style.fontSize = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 15;
    star.style.animationDuration = `${duration}s`;

    star.style.animationDelay = `0s`;
    const drift = (Math.random() - 0.5) * 80;
    star.style.setProperty("--drift", `${drift}px`);

    starsContainer.appendChild(star);

    // remove star after animation ends
    setTimeout(() => {
      star.remove();
    }, duration * 1000);
  }

  // initial fill (no empty start)
  for (let i = 0; i < MAX_STARS; i++) {
    createStar();
  }

  // continuous balanced flow
  const interval = setInterval(createStar, 100);

  return () => clearInterval(interval);
}, []);


  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden">
      
      {/* Stars */}
      <div
        id="stars"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      />

      {/* Center Content */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-4">
        <div className="border border-white/20 rounded-2xl bg-black/50 max-w-5xl w-full text-center px-10 py-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent tracking-wide">
            Welcome to OPMS
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            "Simplifying campus placements by connecting students, training & placement officers, and recruiters on one smart platform — faster, transparent, and stress‑free"
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-bold px-12 py-4 rounded-full text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(255,165,0,0.6)] shadow-[0_4px_15px_rgba(255,165,0,0.4)]"
          >
            Discover More
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 text-center text-gray-400 text-sm py-4">
        © 2026 OPMS. All rights reserved.
      </footer>

      {/* Custom styles for stars */}
      <style>{`
        .star {
          position: absolute;
          opacity: 0;
          animation: fall linear infinite;
        }

        .star::before {
          content: '★';
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        @keyframes fall {
          0% {
            transform: translateY(-50px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
