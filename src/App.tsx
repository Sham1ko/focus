import { useEffect, useState } from "react";
import "./App.css";

const INITIAL_SECONDS = 25;
const buttonClass =
  "rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function App() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((currentSeconds) =>
        currentSeconds > 0 ? currentSeconds - 1 : 0,
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft !== 0 || !isRunning) {
      return;
    }

    setIsRunning(false);
    setIsFinished(true);
  }, [isRunning, secondsLeft]);

  function handleStart() {
    setHasStarted(true);
    setIsFinished(false);
    setIsRunning(true);
  }

  function handlePauseResume() {
    setIsRunning((currentValue) => !currentValue);
  }

  function handleReset() {
    setSecondsLeft(INITIAL_SECONDS);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fff7ed_0%,#ffedd5_35%,#fed7aa_100%)] px-6 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-stone-900">
      <section className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_24px_60px_rgba(120,53,15,0.16)] backdrop-blur-md sm:p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.14em] text-orange-700">
          simple timer
        </p>
        <h1 className="m-0 text-[clamp(3rem,12vw,4.8rem)] leading-none text-orange-950">
          {formatTime(secondsLeft)}
        </h1>
        {isFinished ? (
          <p className="mt-3 text-base text-green-700">finished</p>
        ) : null}

        <div className="mt-7 grid gap-3">
          <button
            type="button"
            onClick={handleStart}
            disabled={hasStarted || isFinished}
            className={`${buttonClass} bg-orange-600 text-white hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-orange-700`}
          >
            Start
          </button>

          <button
            type="button"
            onClick={handlePauseResume}
            disabled={!hasStarted || isFinished}
            className={`${buttonClass} bg-stone-700 text-white hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-stone-800`}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={`${buttonClass} bg-white text-stone-700 ring-1 ring-black/10 hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-stone-100`}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
