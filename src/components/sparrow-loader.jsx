export function SparrowLoader({ text, className }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 text-muted-foreground ${className || ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bob-head"
      >
        <title>Sparrow Loader</title>

        {/* Body */}
        <path d="M12.5 8.5C10.5 7 8 7 6 9c-2.5 2.5-2.5 6.5 0 9s6.5 2.5 9 0" />

        {/* Wing */}
        <path
          d="M13 8c0 0-2-2-4-2"
          className="origin-top-right animate-flutter-wing"
        />

        {/* Head */}
        <circle cx="16" cy="6" r="3" />

        {/* Beak */}
        <path
          d="m19 7-2-1"
          className="origin-center animate-chirp-beak"
        />

        {/* Eye */}
        <circle cx="16.5" cy="5.5" r="0.5" fill="currentColor" />

        {/* Tail */}
        <path d="M19 16c.5-1.5 1-3.5-1-5" />
      </svg>

      {text && (
        <p className="text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}





